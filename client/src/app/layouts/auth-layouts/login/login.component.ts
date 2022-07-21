import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { AuthService } from 'src/app/shared/service/auth.service';
import { TodoRequestService } from 'src/app/shared/service/todo-request.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(
    private auth: AuthService,
    private todoRequst: TodoRequestService,
    private router: Router,
    private route: ActivatedRoute,
    private errrorHanlder: MaterialService
  ) {}

  form: FormGroup = new FormGroup({});
  aSub?: Subscription;

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });

    if (this.auth.isAuthenticated()) {
      // Запит на сервер іде для перевірки точно чи ми авторизовані, по суті в любому випадку повинна бути ошибка,
      // але якщо людина на /login зайшла уже авторизована її перекине в /account.
      this.todoRequst.todoAll().subscribe(
        (res) => {
          this.router.navigate(['/account'], {
            queryParams: {
              auth: true,
            },
          });
        },
        (e) => {
          this.auth.logout();
        }
      );
    }

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        /* Користувач був зареєстрований. */
        this.errrorHanlder.toasts(
          'Ви зареєструвалися в системі, тепер можете увійти.'
        );
      } else if (params['accessDenied']) {
        /* Користувач перейшов по силці зразу на якусь сторінку на якій потрібно бути авторизованим. */
        this.errrorHanlder.toasts(
          'Для початку потрібно авторизуватися в системі.'
        );
      } else if (params['sessinField']) {
        /*  */
        this.errrorHanlder.toasts('Сесія була закінчена, перезайдіть.');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  onSubmit() {
    this.form.disable();

    this.aSub = this.auth.login(this.form.value).subscribe(
      (res) => {
        this.router.navigate(['/todo']);
      },
      (e) => {
        this.errrorHanlder.toasts(e.error.message);
        this.form.enable();
      }
    );
  }
}
