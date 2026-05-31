"use client";

import { ErrorState } from "@/components/error-state";

const ErrorMeetingsDetailPage = () => {
  return (
    <ErrorState
      title="Error loading meeting details"
      description="Something went wrong"
    />
  );
};

export default ErrorMeetingsDetailPage;
