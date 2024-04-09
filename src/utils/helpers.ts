export const classNames = (...classes: (string | number | boolean)[]) =>
  classes.filter(Boolean).join(" ");
