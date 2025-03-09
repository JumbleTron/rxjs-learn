import { logMessage } from "../../index";
import { Observable } from "rxjs";

export const example = () => {
  const observable$ = new Observable<string>(subscriber => {
    logMessage('Observable executed');
    subscriber.next('Alice');
    subscriber.next('Ben');
    logMessage('Wating 2s...');
    setTimeout(
      () => {
        subscriber.next('Charli');
        //subscriber.complete() if completed all next message wil be ignored
        logMessage('Wating 2s...');
      }, 2000);

    setTimeout(() => {
      subscriber.error(new Error('Failure'));
      subscriber.next('Tom'); // will not emit, error close subscription
    }, 4000);

    return () => logMessage('Teardown');
  })

  logMessage('Before subscribe');
  observable$.subscribe({
    next: (value) => logMessage(value),
    complete: () => logMessage('Completed'),
    error: (e) => logMessage(`Error: ${e.message}`),
  })
  logMessage('After subscribe');
}

export const exercise = () => {
  const interval$ = new Observable<number>(subscriber => {
    let counter = 1;
    const interval = setInterval(() => {
      subscriber.next(counter++)
      logMessage('Wating 2s...')
    }, 2000);
    logMessage(`IntervalId: ${interval}`);

    return () => {
      clearInterval(interval);
      logMessage('Teardown')
    };
  })

  const firstSubscriber = interval$.subscribe({
    next: value => logMessage(`First: ${value}`),
    complete: () => logMessage('First completed'),
  })

  setTimeout(() => firstSubscriber.unsubscribe(), 7000);

// The second subscriber continues to count as they have their own interval and all values.
  const secondSubscriber = interval$.subscribe({
    next: value => logMessage(`Second: ${value}`),
    complete: () => logMessage('Second completed'),
  })

  setTimeout(() => secondSubscriber.unsubscribe(), 9000);
}
