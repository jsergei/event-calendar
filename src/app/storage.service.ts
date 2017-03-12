import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  readObject<T>(path: string): T {
    let text = this.getFromStorage(path);
    if (!text) return null;

    let data: T;
    try {
      data = <T>JSON.parse(text);
    } catch (error) {
      console.error("StorageService::readObject: can't convert string from local storage to object using JSON.parse(). Error: " + error);
      data = null;
    }

    return data;
  }

  writeObject(path: string, data: any): void {
    let text = JSON.stringify(data);
    this.setToStorage(path, text);
  }

  remove(path: string): void {
    this.removeFromStorage(path);
  }

  private getFromStorage: (s: string) => string = localStorage && localStorage.getItem
  ? (key) => {
    let res: string = undefined;
    try {
      res = localStorage.getItem(key);
    } catch (error) {
      console.error("localStorage.getItem threw an error: " + error);
    }
    return res;
  }
  : () => { console.log('localStorage.getItem is not available'); return undefined; };

  private setToStorage: (s: string, v: string) => void = localStorage && localStorage.setItem
  ? (key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error("localStorage.setItem threw an error: " + error);
    }
  }
  : () => { console.log('localStorage.setItem is not available'); };

  private removeFromStorage: (s: string) => void = localStorage && localStorage.removeItem
  ? (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("localStorage.removeItem threw an error: " + error);
    }
  }
  : () => { console.log('localStorage.removeItem is not available'); };
}
