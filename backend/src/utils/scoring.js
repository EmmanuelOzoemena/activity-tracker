exports.getScore = (status) => {
  if (status === "present") return 100;
  if (status === "absent") return 50;

  return 0;
};