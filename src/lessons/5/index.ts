import {clearMessages, LOG_LEVEL_ERROR, logMessage} from "../../index";
import {combineLatest, forkJoin, from, fromEvent, interval, Observable, of, timer} from "rxjs";

const button = document.querySelector('button#clickMe')
const clearButton = document.querySelector('button#clear')

const temperatureInput = document.querySelector('input#temperatureInput')
const convertType = document.querySelector('select#convertType')

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
}  else {
  logMessage('Not found button element', LOG_LEVEL_ERROR)
}

logMessage('Waiting 2 sec...');
timer(2000).subscribe({
  next: value => logMessage(`timer value: ${value}`),
  complete: () => logMessage('Completed timer'),
})

const intervalSubscription$ =  interval(1000).subscribe({
  next: value => logMessage(`interval value: ${value}`),
  complete: () => logMessage('Completed timer'),
})

logMessage('Waiting 5 sec for stop interval');
setTimeout(() => {
  intervalSubscription$.unsubscribe();
  logMessage('Interval unsubscribed');
}, 5000);

logMessage('Waiting 5 sec for success')
const a$ = new Observable(subscriber => {
  setTimeout(() => {
    subscriber.next('A');
      subscriber.complete()
  }, 5000);
  return () => logMessage('A teardown')
})

logMessage('Waiting 3 sec for failure')
const b$ = new Observable(subscriber => {
  setTimeout(() => {
    subscriber.error('Failure')
  }, 3000);
  return () => logMessage('B teardown')
})

// All subscriptions will be completed if an error occurs
forkJoin([a$, b$]).subscribe({
  next: ([a, b]) => logMessage(`Value from A: ${a} Value from B: ${b}`),
  error: (error) => logMessage(error, LOG_LEVEL_ERROR)
})

if (temperatureInput && convertType) {
  const temperatureInputObservable$ = fromEvent<InputEvent>(temperatureInput, 'input');
  const convertTypeObservable$ = fromEvent(convertType, 'input');

  // Will run only if all observables emit value at least once
  combineLatest([temperatureInputObservable$, convertTypeObservable$]).subscribe({
    next: ([tempInput, typeInput]) => {
      logMessage(`Value: ${(tempInput.target as HTMLInputElement).value} Type: ${(typeInput.target as HTMLSelectElement).value}`)
    }
  })
} else {
  logMessage('Not found converted elements', LOG_LEVEL_ERROR)
}
