import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class UrlServerService {
  constructor() {
    this.HOST = environment.HOST;
    this.PORT = environment.PORT;
  }

  private HOST?: string;
  private PORT?: string;

  url: string = `http://${this.HOST}${this.PORT}/api/`;
}
