import {SettingsService} from "../../settings/settings.service";

export class AlphabetService {
  public static getAlphabet(): string {
    return JSON.parse(localStorage.getItem(SettingsService.STORAGE_KEY)).alphabet;
  }
}
