"use client";
import { ErrorState } from "@/components/error-state";

const AgentDetaisError = () => {
  return (
    <ErrorState
      title="Error loading agent"
      description="Something went wrong"
    />
  );
};

export default AgentDetaisError;
