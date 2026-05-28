"use client";

import { ErrorState } from "@/components/error-state";

const ErrorAgentsPage = () => {
  return (
    <ErrorState
      title="Error loading agents"
      description="Something went wrong"
    />
  );
};

export default ErrorAgentsPage;
