import { SORT_ORDER } from '../constans/index.js';

const parseSortBy = (valueSortBy) => {
  if (typeof valueSortBy !== 'string') {
    return '_id';
  }

  const keys = ['_id', 'name'];

  if (keys.includes(valueSortBy)) {
    return valueSortBy;
  }

  return '_id';
};

const parseSortOrder = (valueSortOrder) => {
  if (typeof valueSortOrder !== 'string') {
    return SORT_ORDER.ASC;
  }

  if ([SORT_ORDER.ASC, SORT_ORDER.DESC].includes(valueSortOrder)) {
    return valueSortOrder;
  }

  return SORT_ORDER.ASC;
};

export const parseSortParams = (query) => {
  const { sortBy, sortOrder } = query;

  const parsedSortBy = parseSortBy(sortBy);
  const parsedSortOrder = parseSortOrder(sortOrder);

  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
};
