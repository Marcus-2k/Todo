import { Component } from '@angular/core';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { CategoryRequestService } from 'src/app/shared/service/category-request.service';
import { ErrorHandlerService } from 'src/app/shared/service/error-handler.service';
import { TodoService } from 'src/app/shared/service/todo.service';
@Component({
  selector: 'app-todo-category-form',
  templateUrl: './todo-category-form.component.html',
  styleUrls: ['./todo-category-form.component.scss'],
})
export class TodoCategoryFormComponent {
  constructor(
    private todoService: TodoService,
    private categoryRequest: CategoryRequestService,
    private errorHandler: MaterialService,
    private errorHandlerServer: ErrorHandlerService
  ) {}

  addCategoryName(name: string) {
    if (name.length <= 2) {
      this.errorHandler.toasts(
        'Ім`я категорії повинно бути більше двух символів'
      );
      return;
    } else if (name.length > 2) {
      this.categoryRequest.categoryAdd(name).subscribe(
        (res) => {
          console.log(res);
          this.todoService.listCategoryName.push(res);
          this.errorHandler.toasts('Категорію було створено');
          this.addCategoryPopuap(0);
        },
        (e) => {
          console.log(e);
          this.errorHandler.toasts('Помилка: Категорія не була створена');
          this.errorHandlerServer.checkedAuth(e);
        }
      );
    }
  }

  // Popuap input category (block/none)
  categoryPopuap = false;

  // ON/OFF Popup
  addCategoryPopuap(i: number) {
    if (i === 1) {
      this.categoryPopuap = true;
    }
    if (i === 0) {
      this.categoryPopuap = false;
    }
  }
}
