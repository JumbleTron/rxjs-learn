import { Observable } from "rxjs";
import { logMessage } from "../../index";

const observable$ = new Observable<string>(subscriber => {
  logMessage('Observable executed')
  subscriber.next('Alice');
  setTimeout(() => subscriber.next('Ben'), 2000);
  setTimeout(() => subscriber.next('Charli'), 4000);
})

const observer = {
  next: (value: string) => logMessage(`Subscription 1: ${value}`)
};
logMessage('Subscription 1 started')
const subscription = observable$.subscribe(observer);

setTimeout(() => {
  logMessage('Unsubscribe subscription 1')
  subscription.unsubscribe()
}, 3000)

setTimeout(() => {
  logMessage('Subscription 2 started')
  observable$.subscribe(value => logMessage(`Subscription 2: ${value}`))
}, 1000)