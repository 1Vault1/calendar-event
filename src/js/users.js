export class Users {
    constructor() {
        this.calendarBody = document.querySelector('#calendarBody');
        this.tableEl = document.querySelector('#calendar');
        this.selectUsers = document.querySelector('#users');
        this.users = [];
    }

    onInit() {
        this.restoreData();
        this.renderUsers();

        if(this.calendarBody) {
            this.selectUsers.addEventListener('click', () => { this.onSelectUsers() });
            this.tableEl.addEventListener('click', (e) => { this.onTableClick(e) });
        }
    }

    renderUsers() {
        this.users.forEach((user) => this.renderUser(user));
    }

    renderUser(obj) {
        const blockEl = document.querySelectorAll('.block-event');
        const arrBlock = Array.from(blockEl);

        let template = `<div class='user'>
                            <p>
                                ${obj.description}
                                <br>
                                ${obj.name}
                            </p>
                            <button class="btn">X</button>
                        </div>`

        arrBlock.forEach((block) => {
            if (obj.time === block.dataset.time && obj.day === block.dataset.day) {
                block.setAttribute('data-lock', 'true');
                block.setAttribute('data-name', obj.name);
                block.insertAdjacentHTML('beforeEnd', template);
            }
        })
    }

    onSelectUsers() {
        const blockEl = document.querySelectorAll('.block-event');
        const arrBlock = Array.from(blockEl);

        arrBlock.forEach((block) => {
            block.classList.remove('hidden');

            if (block.dataset.name !== undefined) {
                let usersArr = block.dataset.name.split(',');

                if (usersArr.length > 1) {
                    usersArr.forEach((name) => {
                        if(this.selectUsers.value === name) {
                            block.classList.remove('hidden');
                        }
                    });
                } else {
                    usersArr = usersArr.toString();

                    if (this.selectUsers.value === 'all') {
                        block.classList.remove('hidden');
                    } else if(this.selectUsers.value !== usersArr) {
                        block.classList.add('hidden');
                    }
                }
            }
        });
    }

    onTableClick(e) {
        this.removeUser(e);
    }

    removeUser(e) {
        e.stopPropagation();

        if(e.target.classList.contains('btn')) {
            this.users = this.users.filter((obj) => {
                return !(obj.time === e.target.closest('.block-event').dataset.time &&
                         obj.day === e.target.closest('.block-event').dataset.day)
            });

            e.target.closest('.block-event').remove();
        }

        this.saveDate();
    }

    saveDate() {
        localStorage.setItem('users', JSON.stringify(this.users));
    }

    restoreData() {
        const data = localStorage.getItem('users');
        this.users = data ? JSON.parse(data) : [];
    }
}

