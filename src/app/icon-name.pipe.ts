import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iconName'
})
export class IconNamePipe implements PipeTransform {

  transform(value: string, ...args: any[]): string {
    if(value === "") {
      value = "fa-question";
    }
    return value.replace("fa-", "");
  }

}
