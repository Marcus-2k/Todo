import { Component, DoCheck } from '@angular/core';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { Category, Todo } from 'src/app/shared/interface/interfaces';
import { ErrorHandlerService } from 'src/app/shared/service/error-handler.service';
import { TodoRequestService } from 'src/app/shared/service/todo-request.service';

// Services
import { TodoService } from 'src/app/shared/service/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements DoCheck {
  constructor(
    private todoService: TodoService,
    private todoRequest: TodoRequestService,
    private errorHandler: MaterialService,
    private errorHandlerServer: ErrorHandlerService
  ) {}

  /* Loader */
  loader: boolean = this.todoService.loaderT;

  /* DoCheck визиваїця при будь яких змінах на сайті*/
  ngDoCheck() {
    this.categoryName = this.todoService.listCategoryName;
    this.activeCategory = this.todoService.activeCategoryList;
    this.inputBySearch = this.todoService.searchForPipe;
    this.todoTaskList = this.todoService.todoTask;
    this.loader = this.todoService.loaderT;
  }

  // Name Category
  categoryName: Category[] = this.todoService.listCategoryName;

  // Number Category
  activeCategory: number = this.todoService.activeCategoryList;

  // Search task by name
  inputBySearch: string = this.todoService.searchForPipe;

  // Todo List in DB
  todoTaskList: Todo[] = this.todoService.todoTask;

  // New name Task
  newNameTask: string = '';

  // Checkbox Task
  checkboxTodo(checked: any, todo: any) {
    if (checked === true) {
      todo.condition = true;
    } else if (checked === false) {
      todo.condition = false;
    }
    this.todoRequest.todoUpdate(todo).subscribe(
      (res) => {
        this.errorHandler.toasts('Успішно');
      },
      (e) => {
        this.errorHandler.toasts('Помилка');
        this.errorHandlerServer.checkedAuth(e);
      }
    );
  }

  // Edit Task
  editBtn(todo: Todo) {
    // console.log(this.categoryName);
    todo.update = true;
  }

  // Save (update) Task
  saveBtn(todo: Todo, newName: string, newCategory: string) {
    todo.update = false;
    todo.name = newName;
    todo.category = Number(newCategory);
    this.todoRequest.todoUpdate(todo).subscribe(
      (res) => {
        this.errorHandler.toasts('Успішно');
      },
      (e) => {
        this.errorHandler.toasts('Помилка');
        this.errorHandlerServer.checkedAuth(e);
      }
    );
  }

  // Delete Task
  deleteBtn(todo: any, i: number) {
    console.log(todo);
    console.log(i);
    this.todoRequest.todoDelete(todo).subscribe(
      (res) => {
        this.errorHandler.toasts('Успішно');
        this.errorHandler.toasts(res.message);
        this.todoService.todoTask.splice(i, 1);
      },
      (e) => {
        this.errorHandler.toasts('Помилка');
        this.errorHandlerServer.checkedAuth(e);
      }
    );
  }
}
