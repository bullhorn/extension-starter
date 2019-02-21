export interface DataService<T> {

  getData(request: QueryRequest): Promise<QueryResult<T>>;

}

export interface QueryResult<T> {
  data: Array<T>;
  total: number;

}

export interface QueryRequest {

  start: number;
  count: number;
  sort: string;
  sortDirection: 'DESC' | 'ASC';
  filters: { [key: string]:  any};

}
