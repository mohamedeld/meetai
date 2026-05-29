import * as z from "zod";

export const agentsInsertSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  instructions: z.string().min(1, { message: "Instructions is required" }),
});

export type IAgentOne = z.infer<typeof agentsInsertSchema>;

export const agentsUpdateSchema = agentsInsertSchema.extend({
  id: z.string().min(1, { message: "Id is required" }),
});

export type IUpdateAgent = z.infer<typeof agentsUpdateSchema>;
