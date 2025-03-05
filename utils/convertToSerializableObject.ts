export const convertToSerializableObject = (leanDocument: any) => {
  for (const key of Object.keys(leanDocument)) {
    if (leanDocument[key] && typeof leanDocument[key] === "object") {
      if (typeof leanDocument[key].toJSON === "function") {
        leanDocument[key] = leanDocument[key].toJSON();
      } else if (typeof leanDocument[key].toString === "function") {
        leanDocument[key] = leanDocument[key].toString();
      } else {
        leanDocument[key] = convertToSerializableObject(leanDocument[key]);
      }
    }
  }

  return leanDocument;
};
