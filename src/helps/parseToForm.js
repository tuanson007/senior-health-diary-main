export const parseToForm = (fields) => {
  const result = {};
  fields.map((field) => {
    result[field.name] = field.value;
  });
  return result;
};
