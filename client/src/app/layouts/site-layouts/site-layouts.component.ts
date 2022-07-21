import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';
import { CategoryRequestService } from 'src/app/shared/service/category-request.service';
import { ErrorHandlerService } from 'src/app/shared/service/error-handler.service';
import { TodoRequestService } from 'src/app/shared/service/todo-request.service';
import { TodoService } from 'src/app/shared/service/todo.service';

@Component({
  selector: 'app-site-layouts',
  templateUrl: './site-layouts.component.html',
  styleUrls: ['./site-layouts.component.scss'],
})
export class SiteLayoutsComponent implements OnInit, DoCheck {
  constructor(
    private auth: AuthService,
    private todoRequest: TodoRequestService,
    private todoService: TodoService,
    private categoryRequest: CategoryRequestService,
    private router: Router,
    private errorHandlerS: ErrorHandlerService
  ) {}

  /* Button Exit */
  logout(): void {
    this.auth.logout();
  }

  ngOnInit(): void {
    /* Getting in DB TodoList */
    this.todoRequest.todoAll().subscribe(
      (todo) => {
        console.log('Получили всі Todo з серверу');
        console.log(todo);
        setInterval(() => {
          this.todoService.todoTask = todo;
          this.todoService.loaderT = false;
        }, 400);
      },
      (e) => {
        this.errorHandlerS.checkedAuth(e);
      }
    );
    /* Getting in DB CategoryList */
    this.categoryRequest.categoryAll().subscribe(
      (category) => {
        console.log('Получили всі категорії з серверу');
        console.log(category);
        this.todoService.listCategoryName = [{ name: 'Всі задачі' }];
        category.forEach((item) => {
          this.todoService.listCategoryName.push(item);
        });
        this.todoService.loaderC = false;
      },
      (e) => {
        this.errorHandlerS.checkedAuth(e);
      }
    );
  }

  ngDoCheck(): void {
    /* Буде виконана перевіка чи користувач, має токен, якщо ні його викине на /login  */
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login'], {
        queryParams: {
          sessinField: true,
        },
      });
    }
  }
}
