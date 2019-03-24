import {Inject, Injectable} from '@angular/core';
import {urlParse} from "../shared/URL_parser";
@Injectable({
  providedIn: 'root'
})
export class DomainService {

  constructor(@Inject('tabs') private readonly tabs) { }

  public static URLToDomain(url: string): string {
    return urlParse(url).hostname;
  }

  public getDomain(): Promise<string> {
    return new Promise((resolve) => {
      this.tabs.query({currentWindow: true, active: true}, (tab) => {
        const result: string = DomainService.URLToDomain(tab[0].url);
        resolve(result);
      });
    });
  }
}
