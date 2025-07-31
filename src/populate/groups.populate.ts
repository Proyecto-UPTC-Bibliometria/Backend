export const groupsPopulate = [
  {
    path: "members",
    select: "-_id -group name state dedicatedHours cvUrl",
  },
];
