import { clearMessages, LOG_LEVEL_ERROR, logMessage } from "../../index";
import { BehaviorSubject, fromEvent, Subject } from "rxjs";

const clearButton = document.querySelector('button#clear')
const emitButton = document.querySelector('button#emit')
const subscribeButton = document.querySelector('button#subscribe')
const subscribeBButton = document.querySelector('button#subscribeB')
const emitInput: HTMLInputElement|null = document.querySelector('input#emitInput')

clearButton?.addEventListener('click', () => {
  clearMessages()
});

const exampleSubject$ = new Subject<string>();
// BehaviorSubject allow pass default value and emmit last value to all new subscriber
const exampleBehaviorSubject$ = new BehaviorSubject<string>('');

if (emitInput && emitButton && subscribeButton && subscribeBButton) {
  fromEvent(emitButton, 'click').subscribe(
    () => {
      exampleSubject$.next(emitInput.value)
      exampleBehaviorSubject$.next(emitInput.value)
    }
  )
  fromEvent(subscribeButton, 'click').pipe().subscribe(
    () => {
      const subscriberName = Math.random().toString(36).slice(2);
      logMessage(`New subscriber: ${subscriberName} joined`);
      exampleSubject$.subscribe(value => logMessage(`subscriber(${subscriberName}), value: ${value}`));
    }
  )
  fromEvent(subscribeBButton, 'click').pipe().subscribe(
    () => {
      const subscriberName = Math.random().toString(36).slice(2);
      logMessage(`New subscriber B: ${subscriberName} joined`);
      exampleBehaviorSubject$.subscribe(value => logMessage(`subscriber(${subscriberName}), value: ${value}`));
    }
  )
} else {
  logMessage('Not found emitInput and/or emitButton and/or subscribeButton and/or subscribeBButton', LOG_LEVEL_ERROR)
}