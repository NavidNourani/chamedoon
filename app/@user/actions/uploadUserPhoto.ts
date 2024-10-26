"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/helpers/db";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getServerSession } from "next-auth";

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function uploadUserPhoto(fileName: string, fileType: string) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    throw new Error("Not authenticated");
  }

  // Update the key to include the /public folder
  const key = `public/${fileName}`;
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: key,
    ContentType: fileType,
  });

  try {
    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    });

    // Update user's photo URL in the database
    const photoUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    await prisma.user.update({
      where: { id: session.user.id },
      data: { photo: photoUrl },
    });

    return { success: true, signedUrl, photoUrl };
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return { success: false, error: "Failed to generate upload URL" };
  }
}
