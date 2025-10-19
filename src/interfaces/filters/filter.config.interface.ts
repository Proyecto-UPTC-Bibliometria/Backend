export default interface FilterConfig {
  type: "regex" | "exact" | "range" | "boolean";
  field?: string;
}
