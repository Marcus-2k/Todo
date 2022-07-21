import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/service/auth.service';
import { ErrorHandlerService } from './shared/service/error-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private callHandlerS: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    const potentialToken = localStorage.getItem('auth-token');
    if (potentialToken !== null) {
      this.auth.setToken(potentialToken);
    }
  }
}
