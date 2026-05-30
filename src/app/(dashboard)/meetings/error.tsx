"use client";

import { ErrorState } from "@/components/error-state";

const ErrorMeetingsPage = () => {
  return (
    <ErrorState
      title="Error loading meetings"
      description="Something went wrong"
    />
  );
};

export default ErrorMeetingsPage;
