import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Ensure this is a POST request
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Extract the path to revalidate from the request body
    const { path } = req.body;

    if (!path) {
      return res.status(400).json({ message: "Path is required" });
    }

    // Revalidate the specified path
    await res.revalidate(path);

    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).json({ message: "Error revalidating" });
  }
}
