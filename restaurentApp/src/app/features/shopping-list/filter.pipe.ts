import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string): any {
    if (value.length === 0 || filterString === '') {
      return value;
    }
    if (filterString) {
      const resultArray = [];
      for (const item of value) {
        console.log(item[propName], filterString);
        if (item[propName] === filterString) {
          resultArray.push(item);
        }
        console.log(resultArray);
      }
      return resultArray;
    }
  }

}
