export const sanatizeID = (id: string) => {
  return id.replace(/[^a-fA-F0-9]/g, "");
};
