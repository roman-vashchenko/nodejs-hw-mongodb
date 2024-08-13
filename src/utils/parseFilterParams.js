const parseContactType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;
  const isContactType = (type) => ['work', 'home', 'personal'].includes(type);

  return isContactType(type) ? type : 'personal';
};

export const parseFilterParams = (query) => {
  const { contactType } = query;
  const parsedContactType = parseContactType(contactType);
  return {
    contactType: parsedContactType,
  };
};
