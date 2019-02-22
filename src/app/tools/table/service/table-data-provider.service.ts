import {EventEmitter} from '@angular/core';

import {CollectionEvent, PagedArrayCollection} from 'novo-elements';

import {DataService, QueryRequest, QueryResult} from '../table.types';
import {debounceTime} from 'rxjs/operators';

const HALF_SECOND = 500;

export class TableDataProvider<T> extends PagedArrayCollection<T> {

  totalResults = 0;
  initialTotalResults = 0;
  pagesLoaded = 0;
  _errored = false;
  _pageSize = 10;
  loading = true;
  resetting = false;
  forced = 0;
  refreshing: EventEmitter<any> = new EventEmitter<any>();
  gettingMore: EventEmitter<boolean> = new EventEmitter<boolean>();

  private lastFilter;
  private lastSort;

  private dataProvider: DataService<T>;

  constructor(dataProvider: DataService<T>) {
    super([]);
    this.dataProvider = dataProvider;
    this.refreshing.pipe(debounceTime(HALF_SECOND)).subscribe((event) => {
      this._errored = false;
      this.loading = true;
      this.gettingMore.emit(true);
      this.loadMore().then((results: T[]) => {
        this.loading = false;
        this.gettingMore.emit(false);
        this.onDataChange(new CollectionEvent(CollectionEvent.CHANGE, results));
      });
    });
  }

  get initialTotal(): number {
    return this.initialTotalResults;
  }

  get total(): number {
    return this.totalResults;
  }

  isLoading(): boolean {
    return this.loading;
  }

  hasErrors(): boolean {
    return this._errored;
  }

  get pageSize(): number {
    return this._pageSize;
  }

  set pageSize(value: number) {
    if (this._pageSize !== value) {
      this._pageSize = value;
      this.page = 1;
      this.pagesLoaded = 0;
      this.refresh();
    }
  }

  reset(): void {
    this.resetting = true;
    this.pagesLoaded = 0;
    this._page = 1;
    this._errored = false;
    this.forced++;
    this.refresh();
  }

  loadMore(): any {
    const start: number = (this.page - 1) * this.pageSize;

    if (this.needMore()) {
      this.loading = true;
      this.gettingMore.emit(true);
      this.pagesLoaded++;

      let count: number = this.pageSize;
      let start: number = (this.pagesLoaded - 1) * this.pageSize;

      return new Promise<QueryResult<T>>(resolve => {
        let request: QueryRequest = this.getRequest(start, count);

        this.dataProvider.getData(request).then( response => {
          this.loading = false;
          this.gettingMore.emit(false);
          this.addItems(response.data);
          this.totalResults = response.total;

          if (this.initialTotalResults === 0 || this.resetting) {
            this.resetting = false;
            this.initialTotalResults = this.totalResults;
          }

          return resolve(this.loadMore());
        }).catch(error => {
          console.error(`Error getting data: ${error}`);

          this.loading = false;
          this.gettingMore.emit(false);
          this._errored = true;
        });
      });
    }

    let end: number = start + this.pageSize;
    let result: any = this.source.slice(start, end);

    return Promise.resolve(result);
  }

  getRequest(start: number, count: number): QueryRequest {
    let sort: string = '';
    let sortDirection: 'DESC' | 'ASC' = 'ASC';

    if(this.sort && this.sort.length > 0 && this.sort[0].field) {
      sort = this.sort[0].field;
      sortDirection = this.sort[0].reverse ? 'DESC' : 'ASC';
    }

    return {
      count: count,
      start: start,
      sort: sort,
      sortDirection: sortDirection,
      filters: this.filter
    }
  }

  removeAll(): void {
    this.source = [];
    this.filterData = [];
  }

  needMore(): boolean {
    const sortChanged = this.sortChanged();
    const filterChanged = this.filterChanged();

    if (this.pagesLoaded === 0 || sortChanged || filterChanged) {
      this.removeAll();
      return true;
    }

    let recordsNeeded: number = this.page * this.pageSize;

    return !(this.source.length >= Math.min(this.totalResults, recordsNeeded));
  }

  filterChanged(): boolean {
    if(this.lastFilter != this.filter) {
      this.lastFilter = this.filter;
      this.page = 1;
      this.pagesLoaded = 0;
      return true;
    }

    return false;
  }

  sortChanged() {
    if(this.lastSort != this.sort) {
      this.lastSort = this.sort;
      this.page = 1;
      this.pagesLoaded = 0;
      return true;
    }

    return false;
  }

  refresh(): void {
    this.filterData = this.source.slice();

    let event: any = JSON.stringify({
      page: this.page,
      pageSize: this.pageSize,
      forced: this.forced,
    });

    this.refreshing.emit(event);
  }



}
