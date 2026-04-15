import {
  AgCharts,
  AllCommunityModule,
  ModuleRegistry,
  NumberAxisModule,
} from "ag-charts-community";

ModuleRegistry.registerModules([AllCommunityModule, NumberAxisModule]);

export { AgCharts };
