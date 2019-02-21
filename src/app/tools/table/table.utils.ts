export function getNestedElement(data: any, property: string) {
  const fields = property.split('.');

  let result = data[fields[0]];

  fields.slice(1).forEach( field => {
    result = result[field];
  });

  return result;
}

export function joinNames(entities, nameProperty = 'name') {
  if (entities === undefined || !Array.isArray(entities)) {
    return '';
  }

  return entities.map( entity => entity[nameProperty]).join(', ');
}

export function sortNestedProperty(sort, previous, current, property) {
  const first = getNestedElement(previous, property),
    second = getNestedElement(current, property);

  return sortValue(sort, first, second);
}

export function sortBooleanProperty(sort, previous, current, property) {
  const first = getNestedElement(previous, property) ? 'Yes' : 'No',
    second = getNestedElement(current, property) ? 'Yes' : 'No';

  return sortValue(sort, first, second);
}

export function sortArrayProperty(sort, previous, current, property, nameProperty = 'name') {
  const previousEntities = getNestedElement(previous, property);
  const previousNames = joinNames(previousEntities, nameProperty);
  const currentEntities = getNestedElement(current, property);
  const currentNames = joinNames(currentEntities, nameProperty);

  return sortValue(sort, previousNames, currentNames);
}

export function filterNestedProperty(data, filter, property) {
  const value = getNestedElement(data, property);

  return filterProperty(value, filter);
}

export function filterBooleanProperty(data, filter, property) {
  const value = getNestedElement(data, property) ? 'Yes' : 'No';

  return filterProperty(value, filter);
}

export function filterArrayProperty(data, filter, property, nameProperty = 'name') {
  const value = getNestedElement(data, property);
  const valueNames = joinNames(value, nameProperty);

  return filterProperty(valueNames, filter);
}

export function filterProperty(value, filter) {
  return value === undefined || filter === undefined || filter.length === 0 ||
    value.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1;
}

export function sortValue(sort, first, second) {
  let firstToSort = first;
  let secondToSort = second;

  if (typeof first === 'string') {
    firstToSort = first.toString().toLowerCase();
    secondToSort = second.toString().toLowerCase();
  }

  if (firstToSort > secondToSort) {
    return sort === 'desc' ? -1 : 1;
  }

  if (firstToSort < secondToSort) {
    return sort === 'asc' ? -1 : 1;
  }

  return 0;
}
