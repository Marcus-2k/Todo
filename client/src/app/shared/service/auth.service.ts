import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
// Interafece
import { User } from '../interface/interfaces';
import { UrlServerService } from './url-server.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private urlServer: UrlServerService) {}

  private token: string | null = null;

  url: string = this.urlServer.urlFull;

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}auth/register`, user);
  }

  login(user: User): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(`${this.url}auth/login`, user)
      .pipe(
        tap(({ token }) => {
          localStorage.setItem('auth-token', token);
          this.setToken(token);
        })
      );
  }

  setToken(token: string | null) {
    this.token = token;
  }

  getToken(): string | null | undefined {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  logout() {
    this.setToken(null);
    localStorage.clear();
  }
}
