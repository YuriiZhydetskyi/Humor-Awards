class Note {
    constructor(noteObj) {
        this.person = noteObj.person;
        this.date = noteObj.date;
        this.jokesAmount = parseInt(noteObj.jokesAmount); //why it's not a Number but a string?
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
