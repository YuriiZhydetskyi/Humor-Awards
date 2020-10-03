class Note {
    constructor(person, date, jokesAmount) {
        this.person = person;
        this.date = date;
        this.jokesAmount = parseInt(jokesAmount); //why it's not a Number but a string?
    }

    static compare(a, b) {
        if (a.date < b.date) {
            return -1;
        }
        if (a.date > b.date) {
            return 1;
        }
        return 0;
    }
}    
