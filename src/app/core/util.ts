export function getNestedElement(data: any, property: string) {
  const fields = property.split('.');

  let result = data[fields[0]];

  fields.slice(1).forEach( field => {
    result = result[field];
  });

  return result;
}

export function sortNestedProperty(sort, previous, current, property) {
  const first = getNestedElement(previous, property),
    second = getNestedElement(current, property);

  if (first > second) {
    return sort === 'desc' ? -1 : 1;
  }

  if (first < second) {
    return sort === 'asc' ? -1 : 1;
  }

  return 0;
}
