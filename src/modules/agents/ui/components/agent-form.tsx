"use client";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { GenerateAvatar } from "@/components/generate-avatar";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { agentsInsertSchema, IAgentOne } from "@/modules/agents/schemas";
import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";

interface IAgentForm {
  onSuccess?: () => void;
  onCancel?: () => void;
  agent?: IAgentOne & { id: string };
}
export const AgentForm = ({ agent, onCancel, onSuccess }: IAgentForm) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();
  const createAgent = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions());
        if (agent?.id) {
          await queryClient.invalidateQueries(
            trpc.agents.getOne.queryOptions({ id: agent?.id }),
          );
        }
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    }),
  );

  const form = useForm<IAgentOne>({
    resolver: zodResolver(agentsInsertSchema),
    defaultValues: {
      name: agent?.name ?? "",
      instructions: agent?.instructions ?? "",
    },
  });
  const isEdit = !!agent?.id;
  const isPending = createAgent?.isPending;

  const onSubmit = (values: IAgentOne) => {
    if (isEdit) {
    }
    createAgent.mutate(values);
  };
  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <GenerateAvatar
        seed={form.watch("name")}
        variant="botttsNeutral"
        className="border size-16"
      />
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                {...field}
                id={"name"}
                placeholder="Enter agent name"
                type="text"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="instructions"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="instructions">Instructions</FieldLabel>
              <Textarea
                {...field}
                id={"instructions"}
                placeholder="Enter agent instructions"
                rows={4}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <div className="flex justify-between gap-x-2">
        {onCancel && (
          <Button
            variant={"ghost"}
            disabled={isPending}
            type="button"
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
        <Button disabled={isPending} type="submit">
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : isEdit ? (
            "Update"
          ) : (
            "Create"
          )}
        </Button>
      </div>
    </form>
  );
};
