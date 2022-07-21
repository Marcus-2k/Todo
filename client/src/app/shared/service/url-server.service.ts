import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UrlServerService {
  constructor() {}

  // private urlStart: string = 'http://';
  private HOST: string = 'localhost';
  private PORT: string = ':5000';
  // private urlAPI: string = '/api/';

  urlFull: string = `http://${this.HOST}${this.PORT}/api/`;
}
