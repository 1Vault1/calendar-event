export class CreateEvent {
    constructor() {
        this.createEventBody = document.querySelector('#createEventBody');
        this.nameEvent = document.querySelector('#nameEvent');
        this.createUsers = document.querySelector('#createUsers');
        this.addUserEl = document.querySelector('#addUser');
        this.selectDay = document.querySelector('#days');
        this.selectTime = document.querySelector('#time');
        this.createBtn = document.querySelector('#create');
        this.error = document.querySelector('#error');
        this.emptyInput = document.querySelector('#emptyInput');
        this.emptySelect = document.querySelector('#emptySelect');
        this.results = document.querySelector('.results');
        this.selectedUsersArray = [];
        this.users = [];
    }

    onInit() {
        this.getDataUsers();

        if (this.createEventBody) {
            this.addUserEl.addEventListener('click', () => {this.getUsers()});
            this.results.addEventListener('click', (e) => {this.removeUser(e)});
            this.createBtn.addEventListener('click', () => {this.createEvent()});
        }
    };

    getUsers() {
        const arr = Array.from(this.createUsers.options);

        arr.forEach((option) => {
            if (option.selected === true && option.value !== 'all') {
                this.selectedUsersArray.push(option.value);
                this.results.insertAdjacentHTML('beforeEnd', this.getTemlate(option.value));
            }
        });
    }

    getTemlate(userName) {
        return `<div class='user'>
                    <p class="name">${userName}</p>
                     <button class="btn">X</button>
                 </div>`;
    }

    createEvent() {
        switch(true) {
            case this.nameEvent.value === '':
                this.emptySelect.classList.remove('visible');
                this.emptyInput.classList.add('visible');
                break;
            case this.selectedUsersArray.length === 0:
                this.emptyInput.classList.remove('visible');
                this.emptySelect.classList.add('visible');
                break;
            default:
                this.emptyInput.classList.remove('visible');
                this.emptySelect.classList.remove('visible');

                this.checkNewUser();
        }
    }

    checkNewUser() {
        let newUsers = true;

        this.users.forEach((obj) => {
            newUsers = newUsers && !(obj.day === this.selectDay.value && obj.time === this.selectTime.value);
        });

        if (newUsers) {
            this.error.classList.remove('visible');
            let names = this.selectedUsersArray.toString();

            this.users.push({
                name: names,
                day: this.selectDay.value,
                time: this.selectTime.value,
                description: this.nameEvent.value,
            });

            this.saveDate();

            this.nameEvent.value = '';
            this.createBtn.href="index.html";

        } else {
            this.error.classList.add('visible');
        }
    }

    removeUser(e) {
        e.stopPropagation();

        if(e.target.classList.contains('btn')) {
            this.selectedUsersArray = this.selectedUsersArray.filter((name) => {
                return e.target.previousElementSibling.innerHTML !== name;
            });
        }

        e.target.closest('.user').remove();
    }

    saveDate() {
        localStorage.setItem('users', JSON.stringify(this.users));
    }

    getDataUsers() {
        const data = localStorage.getItem('users');
        this.users = data ? JSON.parse(data) : [];
    };
}
