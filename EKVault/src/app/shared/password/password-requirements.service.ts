import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordRequirementsService {
  public static readonly MAX_PASSWORD_LENGTH = 128;
  public static readonly MIN_PASSWORD_LENGTH = 8;
  constructor() { }
}
