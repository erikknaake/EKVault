import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditPasswordService {
  public username: string;
  public domain: string;
  public password: string;
  constructor() { }
}
