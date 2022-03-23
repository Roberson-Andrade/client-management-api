const allowFields = (allowedFields, updateFields) => {
  const updateFieldArray = Object.keys(updateFields);

  return updateFieldArray.every(item => allowedFields.includes(item));
};

module.exports = allowFields;