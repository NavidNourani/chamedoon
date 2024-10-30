"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

const ErrorPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    console.log(`/error?${searchParams.toString()}`);
    router.push(`/error?${searchParams.toString()}`);
  }, [router, searchParams]);

  return null;
};

const ErrorPage = () => {
  return (
    <Suspense fallback={null}>
      <ErrorPageContent />
    </Suspense>
  );
};

export default ErrorPage;
