import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({});
  constructor(
    private auth: AuthService,
    private router: Router,
    private errorHandler: MaterialService
  ) {}
  aSub?: Subscription;
  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/account'], {
        queryParams: {
          authRegister: true,
        },
      });
    }
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  onSubmit() {
    this.form.disable();
    this.aSub = this.auth.register(this.form.value).subscribe(
      () => {
        this.router.navigate(['/login'], {
          queryParams: {
            registered: true,
          },
        });
      },
      (e) => {
        this.errorHandler.toasts(e.error.message);
        this.form.enable();
      }
    );
  }
}
