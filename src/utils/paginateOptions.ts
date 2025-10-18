import { customLabels } from "./customLabels.js";

export const paginateOptions = {
  limit: 20,
  select: "-_id",
  lean: true,
  leanWithId: false,
  customLabels,
};
