import { Injectable } from '@angular/core';
import {SettingsService} from "../settings/settings.service";

@Injectable({
  providedIn: 'root'
})
export class AlphabetService {

  constructor() { }

  public static getAlphabet(): string {
    return JSON.parse(localStorage.getItem(SettingsService.STORAGE_KEY))._alphabet._value;
  }
}
