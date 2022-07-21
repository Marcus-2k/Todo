import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'todoSearch',
  // pure: false,
})
export class TodoSearchPipe implements PipeTransform {
  constructor() {}
  transform(todoTask: any, inputSearch: any) {
    if (todoTask.length === 0 || inputSearch === '') {
      return todoTask;
    }

    const newTodoTask = todoTask.filter(function (e: any) {
      return e.name.toLowerCase().indexOf(inputSearch.toLowerCase(), 0) !== -1;
    });

    return newTodoTask;
  }
}
