import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(private auth: AuthService, private router: Router) {}

  checkedAuth(e: any): void {
    if (e.error === 'Unauthorized' || e.error.message === 'Unauthorized') {
      this.auth.logout();
      this.router.navigate(['/login'], { queryParams: { sessinField: true } });
    }
  }
}
