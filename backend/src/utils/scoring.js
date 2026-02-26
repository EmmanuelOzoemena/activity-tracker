exports.getScore = (status) => {
  if (status === "present") return 100;
  if (status === "excused") return 50;

  return 0;
};