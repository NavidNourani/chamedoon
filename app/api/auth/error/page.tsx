"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const ErrorPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    console.log(`/error?${searchParams.toString()}`);
    router.push(`/error?${searchParams.toString()}`);
  }, [router, searchParams]);

  return null;
};

export default ErrorPage;
