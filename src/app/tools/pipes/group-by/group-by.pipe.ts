import { Pipe, PipeTransform } from '@angular/core';
import {getNestedElement} from '../../table/table.utils';

@Pipe({
  name: 'groupBy'
})
export class GroupByPipe implements PipeTransform {

  transform(collection: Array<any>, property: string): any {
    if(!collection) {
      return null;
    }

    const groupedCollection = collection.reduce((previous, current)=> {
      const key = getNestedElement(current, property) || '';

      if(!previous[key]) {
        previous[key] = [current];
      } else {
        previous[key].push(current);
      }

      return previous;
    }, {});

    return Object.keys(groupedCollection).map(key => ({ key, value: groupedCollection[key] }));
  }

}
