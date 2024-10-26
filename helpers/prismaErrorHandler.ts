import { Prisma } from "@prisma/client";

type PrismaErrorResponse = {
  success: false;
  error: string | { [key: string]: string };
};

export function handlePrismaError(error: unknown): PrismaErrorResponse {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        const field = error.meta?.target as string;
        return {
          success: false,
          error: { [field]: "Unique constraint failed" },
        };
      case "P2003":
        return { success: false, error: "Foreign key constraint failed" };
      case "P2025":
        return { success: false, error: "Record not found" };
      default:
        console.error("Unhandled Prisma error:", error);
        return {
          success: false,
          error: "An unexpected database error occurred",
        };
    }
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    return { success: false, error: "Invalid data provided" };
  } else {
    console.error("Unknown error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}
