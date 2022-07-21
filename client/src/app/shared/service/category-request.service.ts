import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../interface/interfaces';
import { UrlServerService } from './url-server.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryRequestService {
  constructor(private http: HttpClient, private urlServer: UrlServerService) {}

  url: string = this.urlServer.urlFull;

  /* Requst in DB for getting Category */
  categoryAll(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.url + 'category'}`);
  }

  /* Requst in DB for add CategoryItem */
  categoryAdd(name: string): Observable<any> {
    const categoryItem = {
      name,
    };
    return this.http.post(`${this.url + 'category'}`, categoryItem);
  }
  /* Requst in DB for delete CategoryItem */
  categoryDelete(category: any): Observable<any> {
    return this.http.delete<any>(
      `${this.url + `category` + `/` + `${category._id}`}`
    );
  }
}
