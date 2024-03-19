const omitFields = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  fieldsToOmit: K[]
): Omit<T, K> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !fieldsToOmit.includes(key as K))
  ) as Omit<T, K>;
};

export default omitFields;
