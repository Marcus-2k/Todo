import { Injectable } from '@angular/core';

declare var M: any;
@Injectable({
  providedIn: 'root',
})
export class MaterialService {
  toasts(message: string) {
    M.toast({ html: message });
  }
}
