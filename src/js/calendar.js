export class Calendar {
    constructor() {
        this.calendarBody = document.querySelector('#calendarBody');
        this.tableEl = document.querySelector('#calendar');
        this.arrCalendar = [
            ['10:00', '', '', '', '', ''],
            ['11:00', '', '', '', '', ''],
            ['12:00', '', '', '', '', ''],
            ['13:00', '', '', '', '', ''],
            ['14:00', '', '', '', '', ''],
            ['15:00', '', '', '', '', ''],
            ['16:00', '', '', '', '', ''],
            ['17:00', '', '', '', '', ''],
            ['18:00', '', '', '', '', ''],
        ];
    }

    onInit() {
        this.fillCalendar();
    }

    fillCalendar() {
       if(this.calendarBody) {
           this.arrCalendar.forEach((row, r) => {
               const tr = document.createElement('tr');

               row.forEach((value, x) => {
                   const td = document.createElement('td');
                   td.innerHTML = value;
                   tr.appendChild(td);
                   const div = document.createElement('div');
                   td.appendChild(div);

                   if (value === '') {
                       div.classList.add('block-event');
                   }

                   this.setTimeAttribute(r, div, value);
                   this.setDayAttribute(x, div);
               });

               this.tableEl.appendChild(tr);
           });
       }
    }

    setTimeAttribute(r, div, value) {
        switch (true) {
            case r === 0 && value === '':
                div.setAttribute('data-time', '10');
                break;
            case r === 1 && value === '':
                div.setAttribute('data-time', '11');
                break;
            case r === 2 && value === '':
                div.setAttribute('data-time', '12');
                break;
            case r === 3 && value === '':
                div.setAttribute('data-time', '13');
                break;
            case r === 4 && value === '':
                div.setAttribute('data-time', '14');
                break;
            case r === 5 && value === '':
                div.setAttribute('data-time', '15');
                break;
            case r === 6 && value === '':
                div.setAttribute('data-time', '16');
                break;
            case r === 7 && value === '':
                div.setAttribute('data-time', '17');
                break;
            case r === 8 && value === '':
                div.setAttribute('data-time', '18');
                break;
        }
    }

    setDayAttribute(x, div) {
        switch (true) {
            case x === 1:
                div.setAttribute('data-day', 'mon');
                break;
            case x === 2:
                div.setAttribute('data-day', 'tue');
                break;
            case x === 3:
                div.setAttribute('data-day', 'wed');
                break;
            case x === 4:
                div.setAttribute('data-day', 'thu');
                break;
            case x === 5:
                div.setAttribute('data-day', 'fri');
                break;
        }
    }
}
