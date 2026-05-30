"use client";

import { ErrorState } from "@/components/error-state";

const ErrorMeetingsDetailPage = () => {
  return (
    <ErrorState
      title="Error loading meetings details"
      description="Something went wrong"
    />
  );
};

export default ErrorMeetingsDetailPage;
