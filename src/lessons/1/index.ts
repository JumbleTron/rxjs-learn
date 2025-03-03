import {
  name$,
  storeDataOnServer,
  storeDataOnServerError
} from './external';

name$.subscribe(value => console.log(value));
storeDataOnServer('Some data').subscribe(value => console.log(value));
storeDataOnServerError('Some data').subscribe({
  next: value => console.log(value),
  error: err => console.log('Error when saving data: ', err.message),
});