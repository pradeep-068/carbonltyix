import { defineTool } from "@lovable.dev/mcp-js";
import { GRID_STATUS } from "../data";

export default defineTool({
  name: "get_grid_status",
  title: "Get grid status",
  description:
    "Get the live command-overview grid status: voltage, frequency, load, transmission efficiency, sensor counts and equipment faults.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(GRID_STATUS, null, 2) }],
    structuredContent: GRID_STATUS,
  }),
});
