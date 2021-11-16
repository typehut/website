export const timestampToIso = (timestamp: string | number) => {
  const value = typeof timestamp === "string" ? parseInt(timestamp) : timestamp;
  return new Date(value).toISOString();
};
