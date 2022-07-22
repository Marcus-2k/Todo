import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Todo } from "../interface/interfaces";
import { UrlServerService } from "./url-server.service";

@Injectable({
  providedIn: "root",
})
export class TodoRequestService {
  constructor(private http: HttpClient, private urlServer: UrlServerService) {}

  url: string = this.urlServer.url;

  /* Requst in DB for getting Todo */
  todoAll(): Observable<any> {
    return this.http.get<any>(`${this.url + "position"}`);
  }

  /* Requst in DB for add TodoItem */
  todoAdd(name: string, categories: number): Observable<any> {
    const todoItem = {
      name,
      condition: false,
      update: false,
      category: categories,
    };
    return this.http.post<any>(`${this.url + "position"}`, todoItem);
  }

  /* Requst in DB for remove TodoItem */
  todoDelete(todo: any): Observable<any> {
    return this.http.delete<any>(
      `${this.url + `position` + `/` + `${todo._id}`}`
    );
  }

  /* Requst in DB for update TodoItem */
  todoUpdate(todo: Todo | any): Observable<Todo> {
    return this.http.patch<Todo>(
      `${this.url + `position` + `/` + `${todo._id}`}`,
      todo
    );
  }
  //
}
