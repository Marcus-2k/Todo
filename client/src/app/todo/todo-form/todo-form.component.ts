import { Component, DoCheck } from '@angular/core';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { ErrorHandlerService } from 'src/app/shared/service/error-handler.service';
import { TodoRequestService } from 'src/app/shared/service/todo-request.service';
import { TodoService } from 'src/app/shared/service/todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent implements DoCheck {
  constructor(
    private todoService: TodoService,
    private errorHandelr: MaterialService,
    private todoRequest: TodoRequestService,
    private errorHandelrS: ErrorHandlerService
  ) {}

  ngDoCheck(): void {
    this.categoryName = this.todoService.listCategoryName;
  }

  // Category List
  categoryName = this.todoService.listCategoryName;

  // New Name Task
  todoNewName = '';

  // Add a Task to the in List in the service
  async addTaskTodoForm(category: string) {
    const categories = Number(category);
    if (categories === 0) {
      this.errorHandelr.toasts('Задача не була створина, виберіть категорію.');
    } else if (this.todoNewName.length <= 3) {
      this.errorHandelr.toasts(
        'Задача не була створина, мінімальні кількість символів 4.'
      );
    } else {
      if (categories === -1) {
        this.todoRequest.todoAdd(this.todoNewName, categories).subscribe(
          (res) => {
            this.todoService.upgrade(res);
            this.errorHandelr.toasts('Задача була додана у ваш список');
          },
          (e) => {
            this.errorHandelrS.checkedAuth(e);
          }
        );
      }
      if (categories >= 1) {
        this.todoRequest.todoAdd(this.todoNewName, categories).subscribe(
          (res) => {
            this.todoService.upgrade(res);
            this.errorHandelr.toasts(
              `Задача була додана у ваш список з категорією "${this.todoService.listCategoryName[categories].name}"`
            );
          },
          (e) => {
            this.errorHandelrS.checkedAuth(e);
          }
        );
      }
      this.todoNewName = await '';
    }
  }
}
