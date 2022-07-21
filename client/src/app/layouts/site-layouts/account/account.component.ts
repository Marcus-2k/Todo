import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MaterialService } from 'src/app/shared/classes/material.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private errrorHanlder: MaterialService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      /* Якщо було відкрито /login при умові що користувач був вже авторизований */
      if (params['auth']) {
        this.errrorHanlder.toasts('Ви вже авторизовані в системі.');
      }
      /* Якщо було відкрито /register при умові що користувач був вже авторизований */
      if (params['authRegister']) {
        this.errrorHanlder.toasts(
          'Щоб створити новий акаунт, потрібно завершити сесію.'
        );
      }
    });
  }
}
