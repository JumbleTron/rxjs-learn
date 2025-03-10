import { Observable, of } from "rxjs";

export const name$ = of('Alice', 'Ben', 'Charlie');

export const storeDataOnServer = (data: string): Observable<string> => {
  return new Observable(subscriber => {
    setTimeout(() => {
      subscriber.next(`Saved successfully: ${data}`);
      subscriber.complete();
    }, 5000);
  });
}

export const storeDataOnServerError = (data: string): Observable<string> => {
  return new Observable(subscriber => {
    setTimeout(() => {
      subscriber.error(new Error('Failure!'));
    }, 5000);
  });
}