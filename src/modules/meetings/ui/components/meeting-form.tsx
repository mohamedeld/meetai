"use client";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { IMeetingOne, meetingsInsertSchema } from "../../schema";
import { MeetingSelect } from "./meeting-select";
import { MeetingCreateAgent } from "./meeting-create-agent";

interface IMeetingForm {
  onSuccess?: () => void;
  onCancel?: () => void;
  meeting?: IMeetingOne & { id: string };
}
export const MeetingForm = ({ meeting, onCancel, onSuccess }: IMeetingForm) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  const createMeeting = useMutation(
    trpc.meetings.create.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({}),
        );
        if (meeting?.id) {
          await queryClient.invalidateQueries(
            trpc.meetings.getOne.queryOptions({ id: meeting?.id }),
          );
        }
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    }),
  );
  const updateMeeting = useMutation(
    trpc.meetings.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({}),
        );
        if (meeting?.id) {
          await queryClient.invalidateQueries(
            trpc.meetings.getOne.queryOptions({ id: meeting?.id }),
          );
        }
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    }),
  );

  const form = useForm<IMeetingOne>({
    resolver: zodResolver(meetingsInsertSchema),
    defaultValues: {
      name: meeting?.name ?? "",
      agentId: meeting?.agentId ?? "",
    },
  });
  const isEdit = !!meeting?.id;
  const isPending = createMeeting?.isPending;

  const onSubmit = (values: IMeetingOne) => {
    if (isEdit) {
      updateMeeting.mutate({
        ...values,
        id: meeting?.id,
      });
    }
    createMeeting.mutate(values);
  };
  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
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
                placeholder="e,g, Math Consultations"
                type="text"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="agentId"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="instructions">Instructions</FieldLabel>
              <MeetingSelect field={field} />
              <MeetingCreateAgent />
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
