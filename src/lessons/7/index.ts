import { clearMessages, LOG_LEVEL_ERROR, logMessage } from "../../index";
import {
  catchError,
  concatMap,
  EMPTY,
  fromEvent,
  interval,
  map,
  mergeMap,
  switchMap,
  take,
} from "rxjs";
import { ajax } from "rxjs/internal/ajax/ajax";

const clearButton = document.querySelector('button#clear')
const fetchButton = document.querySelector('button#fetch')
const startSwitchMap = document.querySelector('button#startSwitchMap')
const startMergeMap = document.querySelector('button#startMergeMap')
const fetchInput: HTMLInputElement|null = document.querySelector('input#fetchInput')

clearButton?.addEventListener('click', () => {
  clearMessages()
});
if (fetchButton) {
  fromEvent(fetchButton, 'click').pipe(
    map(
      () => { logMessage('Button clicked'); return fetchInput?.value}
    ),
    // wait for current notification will be processed before send new one
    concatMap(
      value => ajax(`https://random-data-api.com/api/${value}/random_${value}`
    ).pipe(
      catchError(() => EMPTY))
    )
  ).subscribe({
    next: value => logMessage(JSON.stringify(value.response, null, 2)),
    error: err => logMessage(err, LOG_LEVEL_ERROR),
    complete: () => logMessage('Completed')
  });
} else {
  logMessage('Not found button element', LOG_LEVEL_ERROR)
}


if (startSwitchMap) {
  fromEvent(startSwitchMap, 'click')
    .pipe(
      // if a new event arrives, current one will be stopped and new one will execute
      // Restart an interval on every click event
      switchMap(() => interval(500).pipe(take(5)))
    )
    .subscribe({
      next: value => logMessage(value.toString()),
      error: err => logMessage(err, LOG_LEVEL_ERROR),
      complete: () => logMessage('Completed')
    });
} else {
  logMessage('Not found startSwitchMap button element', LOG_LEVEL_ERROR)
}

// mergeMap is more dangerous tha 2 previous because of concurrent, possibly memory leaks and no guarantee of order
if (startMergeMap) {
  fromEvent(startMergeMap, 'click')
    .pipe(
      // if a new event arrives, current one will continue and new one will execute
      // each click start new interval but all will be ended
      // order of execution may be randomly
      mergeMap(() => interval(500).pipe(take(5)))
    )
    .subscribe({
      next: value => logMessage(value.toString()),
      error: err => logMessage(err, LOG_LEVEL_ERROR),
      complete: () => logMessage('Completed')
    });
} else {
  logMessage('Not found startMergeMap button element', LOG_LEVEL_ERROR)
}