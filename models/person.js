class Person {
    longestStick = 0;
    allSticks = [];

    constructor(name, id, notesList) {
        this.name = name;
        this.id = id;
        this.notesList = this.getPersonNotes(notesList);
        this.pureDays = this.getPureDays(this.notesList);
        this.setAllAndLongestSticks();
    }


    daysAmount() {
        let amount = 0;
        this.notesList.forEach(note => {
            if (note.jokesAmount >= 5) {
                ++amount;
            }
        });

        return amount;
    }

    jokesAmount() {
        let amount = 0;
        this.notesList.forEach(note => {
            amount += note.jokesAmount;
        });

        return amount;
    }

    curentStick() {
        let amount = 1;

        let date1;
        let date2;

        date1 = new Date(this.pureDays[this.pureDays.length - 1]?.date);
        if (this.pureDays.length === 0 || this.differenceInDays(date1, Date.now()) > 1) {
            return 0;
        }

        for (let i = this.pureDays.length - 1; i > 1; --i) {
            date1 = new Date(this.pureDays[i].date);
            date2 = new Date(this.pureDays[i - 1].date);

            if (this.differenceInDays(date1, date2) <= 1) {
                ++amount;
            } else {
                return amount;
            }
        }

        return amount;
    }

    getPureDays(notesList) {
        let trueDays = [];
        notesList.forEach(note => {
            if (note.jokesAmount >= 5) {
                trueDays.push(note);
            }
        });

        return trueDays;
    }

    getPersonNotes(notesList) {

        let personNotes = [];
        notesList.forEach(note => {
            if (note.person === this.id) {
                personNotes.push(note);
            }
        });
        return personNotes;
    }

    differenceInDays(date1, date2) {

        const diffTime = Math.abs(date2 - date1);
        return Math.floor(diffTime / (1000 * 60 * 60 * 24));
    }

    jokesAmountInSpecificDay(date){

        for(let note of this.notesList) {
            if(areTwoDateEqual(new Date(note.date), date)){

                return note.jokesAmount;
            }
        }

        return 0;
    }

    setAllAndLongestSticks(){

        if(this.pureDays.length === 0){
            this.longestStick = 0;
            this.allSticks = [];
            return;
        }

        let amount = 1;        
        let stick = [];

        let date1;
        let date2;

        stick.push(this.pureDays[0]);

        for (let i = 0; i < this.pureDays.length - 1; ++i) {
            date1 = new Date(this.pureDays[i].date);
            date2 = new Date(this.pureDays[i + 1].date);
            if (this.differenceInDays(date1, date2) <= 1) {
                ++amount;
                stick.push()
            } else {
                if (amount > this.longestStick) {
                    this.longestStick = amount;
                }
                amount = 0;
                this.allSticks.push(stick);
                stick = [];
            }
        }

        if (amount > this.longestStick) {
            this.longestStick = amount;
            this.allSticks.push(stick);
        }

        this.allSticks.sort((a, b) => (a.length - b.length));
    }

    printAwards(element, awards){

        awards.forEach(award => {

            let awardEement = award.getElement(this.longestStick >= award.neededLength);

            element.appendChild(awardEement);
        });
    }

}