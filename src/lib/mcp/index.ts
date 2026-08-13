import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listEquipmentTool from "./tools/list-equipment";
import getEquipmentTool from "./tools/get-equipment";
import getGridStatusTool from "./tools/get-grid-status";
import getCarbonMetricsTool from "./tools/get-carbon-metrics";
import listAlertsTool from "./tools/list-alerts";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "smart-carbon-grid",
  title: "Smart Carbon Grid",
  version: "0.1.0",
  instructions:
    "Tools for the Smart Carbon Neutral UHV monitoring system. Use `get_grid_status` for the live substation overview, `list_equipment` / `get_equipment` for digital-twin equipment telemetry, `list_alerts` for active alerts, and `get_carbon_metrics` for carbon-neutrality figures.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [getGridStatusTool, listEquipmentTool, getEquipmentTool, listAlertsTool, getCarbonMetricsTool],
});
