import { clearMessages, logMessage } from "../../index";
import { from, fromEvent, interval, of, timer } from "rxjs";

const button = document.querySelector('button#clickMe')
const clearButton = document.querySelector('button#clear')

clearButton?.addEventListener('click', (event) => {
  clearMessages()
});

//Will send complete event after last value has been emitted
of('Alice', 'Ben', 'Charli').subscribe({
  next: value => logMessage(`of value: ${value}`),
  complete: () => logMessage('Completed of function'),
});

// works the same way as the above of function
from(['Alice', 'Ben', 'Charli']).subscribe({
  next: value => logMessage(`from value: ${value}`),
  complete: () => logMessage('Completed from function'),
});

const examplePromise = new Promise<string>((resolve, reject) => {
  //resolve('Resolved');
  reject('Rejected promise');
});

const observablePromise$ = from(examplePromise);

observablePromise$.subscribe({
  next: value => logMessage(`observablePromise from value: ${value}`),
  complete: () => logMessage('Completed observablePromise$ from function'),
  error: () => logMessage('Error observablePromise$ from function'),
})

if (button) {
  const onClickObservable$ = fromEvent<MouseEvent>(button, 'click');
  const subscriber = onClickObservable$.subscribe({
    next: event => logMessage(`fromEvent value: ${event.type} ${event.x} ${event.y}`),
    complete: () => logMessage('Completed fromEvent'),
    error: () => logMessage('Error fromEvent'),
  })
  logMessage('Waiting 5 sec...');
  setTimeout(() => {
    subscriber.unsubscribe();
    logMessage('unsubscribed');
  }, 5000)
}
logMessage('Waiting 2 sec...');
timer(2000).subscribe({
  next: value => logMessage(`timer value: ${value}`),
  complete: () => logMessage('Completed timer'),
})


interval(1000).subscribe({
  next: value => logMessage(`interval value: ${value}`),
  complete: () => logMessage('Completed timer'),
})