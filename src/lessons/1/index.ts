import {name$, storeDataOnServer, storeDataOnServerError} from './external';
import { LOG_LEVEL_ERROR, logMessage } from "../../index";

name$.subscribe(value => logMessage(value));
storeDataOnServer('Some data').subscribe(value => logMessage(value));
storeDataOnServerError('Some data').subscribe({
  next: value => logMessage(value),
  error: err => logMessage(`Error when saving data: ${err.message}`, LOG_LEVEL_ERROR),
});