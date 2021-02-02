import '@babel/polyfill';
import '../styles/main.scss';
import { Calendar } from './calendar.js';
import { Users } from './users.js';
import {CreateEvent} from './create-event';

onInit();

function onInit() {
    const calendar = new Calendar();
    const users = new Users();
    const createEvent = new CreateEvent();

    calendar.onInit();
    users.onInit();
    createEvent.onInit();
}
