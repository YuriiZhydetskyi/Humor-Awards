class Person {
    constructor(name, id, notesList) {
        this.person = person;
        this.id = id;
        this.notesList = getPersonNotes(notesList);
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

longestStick() {
    let max = 0;
    let amount = 0;
    let notes = onlyTrueDays(this.notesList);

    let date1;
    let date2;

    for (i = 0; i < notes.length - 1; ++i) {
        date1 = new Date(notes[i].date);
        date2 = new Date(notes[i + 1].date);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays <= 1) {
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
    let amount = 0;
    let notes = onlyTrueDays(this.notesList);

    let date1;
    let date2;

    for (i = notes.length - 1; i > 1; --i) {
        date1 = new Date(notes[i].date);
        date2 = new Date(notes[i - 1].date);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays <= 1) {
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

getPersonNotes(notesList){
  
    let personNotes = [];
    notesList.forEach(note => {
        if(note.person === this.id){
            personNotes.push(note);
        }
    });
    return personNotes;
  }


}