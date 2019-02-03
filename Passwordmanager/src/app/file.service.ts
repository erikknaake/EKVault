import { Injectable } from '@angular/core';
import * as fs from "fs";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() { }

  public static write(filePath: string, data: string): void {
    fs.writeFileSync(filePath, data);
  }

  public static read(filePath: string): string {
    return fs.readFileSync(filePath).toString('utf-8');
  }

  public static clear(filePath: string): void {
    fs.truncateSync(filePath, 0);
  }
}
