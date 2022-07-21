// Module Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
// Service, Pipe, Guard ....
import { TodoSearchPipe } from './shared/pipe/todo-search.pipe';
import { AuthGuard } from './shared/classes/auth.guard';
import { TokenInterceptor } from './shared/classes/token.interceptor';
// Lead Component
import { AppComponent } from './app.component';
// Auth Layouts
import { AuthLayoutsComponent } from './layouts/auth-layouts/auth-layouts.component';
import { HomeComponent } from './layouts/auth-layouts/home/home.component';
import { LoginComponent } from './layouts/auth-layouts/login/login.component';
import { RegisterComponent } from './layouts/auth-layouts/register/register.component';
// Site Layouts
import { SiteLayoutsComponent } from './layouts/site-layouts/site-layouts.component';
// Site Layouts >> Settings
import { SettingsComponent } from './layouts/site-layouts/settings/settings.component';
// Site Layouts >> Account
import { AccountComponent } from './layouts/site-layouts/account/account.component';
// Site Layouts >> Todo
import { TodoComponent } from './todo/todo.component';
import { TodoFormComponent } from './todo/todo-form/todo-form.component';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { TodoSearchComponent } from './todo/todo-search/todo-search.component';
import { TodoCategoryComponent } from './todo/todo-category/todo-category.component';
import { TodoCategoryFormComponent } from './todo/todo-category/todo-category-form/todo-category-form.component';
// 404 Component
import { NotFoundComponent } from './not-found/not-found.component';

// Routing Link
const appRoutes: Routes = [
  {
    path: '',
    component: AuthLayoutsComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  {
    path: '',
    component: SiteLayoutsComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'todo', component: TodoComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'account', component: AccountComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    TodoFormComponent,
    TodoListComponent,
    TodoComponent,
    TodoSearchPipe,
    TodoCategoryComponent,
    TodoSearchComponent,
    TodoCategoryFormComponent,
    AuthLayoutsComponent,
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    NotFoundComponent,
    HomeComponent,
    SiteLayoutsComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
