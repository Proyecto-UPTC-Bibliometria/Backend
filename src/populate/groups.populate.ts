export const groupsPopulate = [
  {
    path: "members",
    select: "-_id -id",
  },
  {
    path: "articles",
    select: "-_id -id",
  },
  {
    path: "books",
    select: "-_id -id",
  },
  {
    path: "softwares",
    select: "-_id -id",
  },
  {
    path: "projects",
    select: "-_id -id",
  },
];
