import { Component, DoCheck } from '@angular/core';
import { CategoryRequestService } from 'src/app/shared/service/category-request.service';
import { TodoService } from 'src/app/shared/service/todo.service';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { ErrorHandlerService } from 'src/app/shared/service/error-handler.service';
import { TodoRequestService } from 'src/app/shared/service/todo-request.service';

@Component({
  selector: 'app-todo-category',
  templateUrl: './todo-category.component.html',
  styleUrls: ['./todo-category.component.scss'],
})
export class TodoCategoryComponent implements DoCheck {
  constructor(
    private todoService: TodoService,
    private categoryRequest: CategoryRequestService,
    private errorHandelr: MaterialService,
    private errorHandelrServer: ErrorHandlerService,
    private todoRequest: TodoRequestService
  ) {}

  /* Loader */
  loader: boolean = true;

  /* DoCheck визиваїця при будь яких змінах на сайті*/
  ngDoCheck(): void {
    this.categoryName = this.todoService.listCategoryName;
    this.loader = this.todoService.loaderC;
  }

  /* Delete Category DB */
  async removeCategoryName(categoryItem: object, i: number) {
    let errorTask: number = 0;
    let taskDel: Array<object> = [];
    this.todoService.todoTask.forEach((element) => {
      // Було знайдено хоча б одну задач в якої є категорія, яку хочуть видали.
      if (element.category === i) {
        element.category = -1;
        errorTask++;

        taskDel.push(element);
      }
    });
    // Сategory replacement in task
    if (taskDel.length >= 1)
      taskDel.forEach((element) => {
        this.todoRequest.todoUpdate(element).subscribe(
          (res) => {
            console.log(res);
          },
          (e) => {
            console.log(e);
          }
        );
        this.errorHandelr.toasts(
          `В ${errorTask} задач змінена категорія на "не вибрану".`
        );
      });
    // Delete Category in DB
    this.categoryRequest.categoryDelete(categoryItem).subscribe(
      (res) => {
        this.todoService.listCategoryName.splice(i, 1);
        this.errorHandelr.toasts(res.message);
        if (
          this.todoService.activeCategoryList ===
          this.todoService.listCategoryName.length
        ) {
          this.todoService.activeCategoryList = 0;
        }
      },
      (e) => {
        this.errorHandelrServer.checkedAuth(e);
      }
    );
  }

  // List Category
  categoryName = this.todoService.listCategoryName;

  // Number Category Active
  activeCategory: number = 0;

  // Active Category by Number for Class
  onSelect(i: any) {
    this.activeCategory = i;
    this.todoService.activeCategoryList = i;
  }

  // Checking which category is carrently active
  checkCategory(i: number) {
    if (i == this.activeCategory) {
      return true;
    }
    return false;
  }
}
