import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestedFileExtensionService {
  public extension: string;
  public label: string;
  constructor() { }
}
