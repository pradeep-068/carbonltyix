import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { EQUIPMENT } from "../data";

export default defineTool({
  name: "list_equipment",
  title: "List substation equipment",
  description:
    "List all monitored UHV substation equipment (transformers, circuit breakers, surge arresters, capacitor banks) with status and health score.",
  inputSchema: {
    type: z
      .string()
      .optional()
      .describe("Optional filter on equipment type, e.g. 'Power Transformer' or 'Circuit Breaker'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ type }) => {
    const items = type
      ? EQUIPMENT.filter((e) => e.type.toLowerCase().includes(type.toLowerCase()))
      : EQUIPMENT;
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { items },
    };
  },
});
