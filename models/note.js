class Note {
    constructor(person, date, jokesAmount) {
        this.person = person;
        this.date = date;
        this.jokesAmount = jokesAmount;
    }

    compare(a, b) {
        if (a.date < b.date) {
            return -1;
        }
        if (a.date > b.date) {
            return 1;
        }
        return 0;
    }
}