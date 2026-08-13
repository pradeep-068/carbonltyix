import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { ALERTS } from "../data";

export default defineTool({
  name: "list_alerts",
  title: "List active alerts",
  description: "List the active monitoring alerts for the substation, optionally filtered by severity.",
  inputSchema: {
    severity: z
      .enum(["critical", "warning", "info"])
      .optional()
      .describe("Optional severity filter."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ severity }) => {
    const items = severity ? ALERTS.filter((a) => a.severity === severity) : ALERTS;
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { items },
    };
  },
});
