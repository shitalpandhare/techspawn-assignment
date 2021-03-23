import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  pure: false,
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    console.log('pipe' + searchText);
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();

    console.log(items);

    return items.filter((it) => {
      return it.productName.toLowerCase().includes(searchText);
    });
  }
}
