import { Injectable } from '@angular/core';
import { Todo } from '../interface/interfaces';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor() {}
  // Loader T = TodoComponent, C = CategoryComponent
  loaderT = true;
  loaderC = true;

  // Search task by name
  newSearchPipe(value: string) {
    this.searchForPipe = value;
  }
  searchForPipe: string = '';

  /* Upgrade Lits Task */
  upgrade(res: any) {
    this.todoTask.push(res);
  }

  /* Todo List Category Active */
  activeCategoryList: number = 0;

  /* List Category */
  listCategoryName = [{ name: 'Всі задачі' }];

  /* List Task*/
  // todoTask: Array<object> = [];
  todoTask: Todo[] = [];
}
