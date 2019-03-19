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

  public getDomain(): Promise<any> {
    return new Promise((resolve) => {
      this.tabs.query({currentWindow: true, active: true}, (tab) => {
        resolve(DomainService.URLToDomain(tab[0]));
      });
    });
  }
}
