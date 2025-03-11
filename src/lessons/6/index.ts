import { clearMessages, LOG_LEVEL_ERROR, LOG_LEVEL_SPY, logMessage, randomNumber } from "../../index";
import { catchError, debounceTime, EMPTY, filter, fromEvent, map, Observable, of, tap } from "rxjs";
import { News, RandomNameResponse } from "./external";
import { ajax } from "rxjs/internal/ajax/ajax";

const clearButton = document.querySelector('button#clear')
const debounceInput = document.querySelector('input#debounceInput')

clearButton?.addEventListener('click', () => {
  clearMessages()
});

const newsFeed$ = new Observable<News>(subscriber => {
  for(let counter = 0; counter < 10; counter++) {
    setTimeout(() => {
      subscriber.next({ title: `Title ${counter}`, type: counter%2 == 0 ? 'business' : 'sport' })
    }, randomNumber())
  }
})

// pipe for filtering specific news based on type
newsFeed$
  .pipe(filter((item) => item.type === 'sport'))
  .subscribe(item => logMessage(`Sport only: ${JSON.stringify(item)}`))

// Above pipe not remove items and still can receive all data
newsFeed$
  .subscribe(item => logMessage(`All: ${JSON.stringify(item)}`))

const randomName$ = ajax<RandomNameResponse>('https://random-data-api.com/api/name/random_name');
randomName$
  .pipe(map(response => response.response))
  .subscribe(data => logMessage(data.first_name));

of (1,7,3,6,2).pipe(
  filter((value) => value > 5),
  map((value) => value * 2),
  // Tap it does not influence the Observable stream in any way and just passes all notifications through without modifying them
  tap(value => logMessage(value.toString(), LOG_LEVEL_SPY))
).subscribe(value => logMessage(value.toString()))

if (debounceInput) {
  fromEvent<InputEvent>(debounceInput, 'input').pipe(
    debounceTime(800),
    map(event => (event.target as HTMLInputElement).value,
  )).subscribe(value => logMessage(`Input value: ${value}`));
} else {
  logMessage('Not found input element', LOG_LEVEL_ERROR)
}

logMessage('Waiting 3 sec for error', LOG_LEVEL_SPY)
new Observable<string>(subscriber => {
  setTimeout(() => subscriber.error(new Error('Timeout!')), 3000)
})
  .pipe(
    catchError(err => of(`Fallback value: ${err.message}`))
    // below example not emit any value
    //catchError(() => EMPTY)
  )
  .subscribe({
    next: value => logMessage(value),
    complete: () => logMessage('Completed', LOG_LEVEL_SPY)
  })