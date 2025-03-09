import { Observable } from "rxjs";
import { logMessage } from "../../index";

const helloButton = document.querySelector('button#hello');

// cold observer has all values separated
const coldObservable$ = new Observable<number>(subscriber => {
  let counter = 1;
  const interval = setInterval(() => {
    subscriber.next(counter++)
    logMessage('Wating 1s...')
  }, 1000);
  logMessage(`IntervalId: ${interval}`);

  return () => {
    clearInterval(interval);
    logMessage(`Teardown: ${interval}`);
  };
})

// hot observer has all values common
const hotObservable$ = new Observable<MouseEvent>(subscriber => {
  helloButton?.addEventListener('click', (event) => {
    subscriber.next(event as MouseEvent);
  })
})

hotObservable$.subscribe(event => logMessage(`Click 1: ${event.x} ${event.y}`))
hotObservable$.subscribe(event => logMessage(`Click 2: ${event.x} ${event.y}`))

//coldObservable$.subscribe(counter => logMessage(`Counter 1: ${counter}`))
//coldObservable$.subscribe(counter => logMessage(`Counter 2: ${counter}`))