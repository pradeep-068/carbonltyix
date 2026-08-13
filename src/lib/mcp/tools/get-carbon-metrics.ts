import { defineTool } from "@lovable.dev/mcp-js";
import { CARBON_METRICS } from "../data";

export default defineTool({
  name: "get_carbon_metrics",
  title: "Get carbon metrics",
  description:
    "Get carbon-neutrality metrics for the substation: real-time CO2 output rate, renewable share, carbon score and reduction versus baseline.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(CARBON_METRICS, null, 2) }],
    structuredContent: CARBON_METRICS,
  }),
});
