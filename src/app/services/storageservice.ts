import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class StorageService {
  //   subjectNames: string[] = [];
  //   protected subjects: { [key: string]: BehaviorSubject<any> } = {};

  constructor() {}

  public removeItem(fileName) {
    return localStorage.removeItem(fileName);
  }

  select(key: string) {
  return (JSON.parse(window.localStorage.getItem(key)));
  }

  setVal(key: string, value: any): void {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}
