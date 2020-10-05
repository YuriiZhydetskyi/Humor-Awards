class Person {
    constructor(name, id, notesList) {
        this.name = name;
        this.id = id;
        this.notesList = this.getPersonNotes(notesList);
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
            amount += parseInt(note.jokesAmount);
        });

        return amount;
    }

    longestStick() {
        let notes = this.onlyTrueDays(this.notesList);
        let max = 0;
        let amount = notes.length > 0 ? 1 : 0;        

        let date1;
        let date2;

        for (let i = 0; i < notes.length - 1; ++i) {
            date1 = new Date(notes[i].date);
            date2 = new Date(notes[i + 1].date);
            if (this.differenceInDays(date1, date2) <= 1) {
                ++amount;
            } else {
                if (amount > max) {
                    max = amount;
                }
                amount = 0;
            }
        }

        if (amount > max) {
            max = amount;
        }

        return max;
    }

    curentStick() {
        let amount = 1;
        let notes = this.onlyTrueDays(this.notesList);

        let date1;
        let date2;

        date1 = new Date(notes[notes.length - 1]?.date);
        if (this.differenceInDays(date1, Date.now()) > 1) {
            return 0;
        }

        for (let i = notes.length - 1; i > 1; --i) {
            date1 = new Date(notes[i].date);
            date2 = new Date(notes[i - 1].date);

            if (this.differenceInDays(date1, date2) <= 1) {
                ++amount;
            } else {
                return amount;
            }
        }

        return amount;
    }

    onlyTrueDays(notesList) {
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

}