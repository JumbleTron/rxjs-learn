import { Observable, Subscription } from "rxjs";
import { clearMessages, logMessage } from "../../index";

const helloButton = document.querySelector('button#hello');
const startButton1 = document.querySelector('button#start1');
const startButton2 = document.querySelector('button#start2');
const stopButton1 = document.querySelector('button#stop1');
const stopButton2 = document.querySelector('button#stop2');
const clearButton = document.querySelector('button#clear');

clearButton?.addEventListener('click', (event) => {
  clearMessages()
});

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

let sub1: Subscription|null = null;
let sub2: Subscription|null = null;

startButton1?.addEventListener('click', (event) => {
  sub1 = coldObservable$.subscribe(counter => logMessage(`Counter 1: ${counter}`))
});
startButton2?.addEventListener('click', (event) => {
  sub2 = coldObservable$.subscribe(counter => logMessage(`Counter 2: ${counter}`))
})

stopButton1?.addEventListener('click', (event) => {
 if (sub1 !== null) {
   sub1.unsubscribe();
   sub1 = null;
 }
});
stopButton2?.addEventListener('click', (event) => {
 if (sub2 !== null) {
   sub2.unsubscribe();
   sub2 = null;
 }
})

