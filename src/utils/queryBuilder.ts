import FilterConfig from "../interfaces/filters/filter.config.interface.js";
import { FilterQuery } from "mongoose";

export function buildQuery<T>(
  filters: Record<string, any>,
  config: Record<string, FilterConfig>
): FilterQuery<T> {
  const query: FilterQuery<T> = {};

  Object.entries(filters).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;

    const filterConfig = config[key];
    if (!filterConfig) return;

    const fieldName = filterConfig.field || key;

    switch (filterConfig.type) {
      case "regex":
        (query as any)[fieldName] = {
          $regex: value.replaceAll("%20", " "),
          $options: "i",
        };
        break;
      case "exact":
        (query as any)[fieldName] = {
          $regex: `^${value.replaceAll("%20", " ")}$`,
          $options: "i",
        };
        break;
      case "boolean":
        (query as any)[fieldName] = value === true || value === "true";
        break;
      case "range":
        // Separated range manager.
        break;
    }
  });

  return query;
}
