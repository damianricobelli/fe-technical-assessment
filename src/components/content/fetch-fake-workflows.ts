import { z } from "zod";

const AIROPS_URL = "https://api.airops.com/public_api/airops_apps/b10bd57c-4d72-4e42-a2c0-2570d6b345be/execute";

// Using this type of env exposes the value in the client bundle. 
// To resolve this, you would need to obtain the key and work with 
// this data on the server side, but as this is beyond the scope of 
// the challenge, I will leave it as a comment.
// Another option is to use a framework like Next JS, React Router, etc that 
// already handles this cases with route handlers/loaders/actions.
const API_KEY = import.meta.env.VITE_AIROPS_API_KEY;

const TagSchema = z.object({
  name: z.string(),
  color: z.string(),
});

const WorkflowItemSchema = z.object({
  type: z.string(),
  name: z.string(),
  tags: z.array(TagSchema),
  lastUpdated: z.string(),
  id: z.number(),
});

const WorkflowsResponseSchema = z.object({
  count: z.number(),
  data: z.array(WorkflowItemSchema),
});

export type WorkflowsResponse = z.infer<typeof WorkflowsResponseSchema>;

export const fetchFakeWorkflows = async () => {
  const res = await fetch(AIROPS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      inputs: {
        count: 10 // We could parametrize the count to get more or less workflows
      },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error ${res.status}: ${text}`);
  }

  const json = await res.json();

  if (!json?.result) {
    throw new Error("The API response does not contain 'result'");
  }

  const parsed = WorkflowsResponseSchema.safeParse(json.result);

  if (!parsed.success) {
    throw new Error("The API response does not match the expected schema");
  }

  return parsed.data;
};