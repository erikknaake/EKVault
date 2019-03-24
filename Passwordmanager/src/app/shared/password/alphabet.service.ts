import {SettingsService} from "../../settings/settings.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AlphabetService {

  public invalid: boolean = false;

  public static getAlphabet(): string {
    return JSON.parse(localStorage.getItem(SettingsService.STORAGE_KEY)).alphabet;
  }
}
