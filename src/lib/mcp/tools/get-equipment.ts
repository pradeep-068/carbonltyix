import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { EQUIPMENT } from "../data";

export default defineTool({
  name: "get_equipment",
  title: "Get equipment details",
  description:
    "Get the full digital-twin parameter set for one piece of equipment by its ID (e.g. TR-01, CB-03, CAP-01).",
  inputSchema: { id: z.string().trim().min(1).describe("Equipment ID such as TR-01.") },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ id }) => {
    const item = EQUIPMENT.find((e) => e.id.toLowerCase() === id.toLowerCase());
    if (!item) throw new ToolError(`No equipment found with ID "${id}".`);
    return {
      content: [{ type: "text", text: JSON.stringify(item, null, 2) }],
      structuredContent: { item },
    };
  },
});
