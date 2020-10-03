let notes = [];
let persons = [];

//just for local using
let dataJSON = '{    "notes" : [        {            "person": "YZ",            "date": "09/28/2020",            "jokesAmount": "5"        },        {            "person": "NZ",            "date": "09/28/2020",            "jokesAmount": "5"        },        {            "person": "RK",            "date": "09/28/2020",            "jokesAmount": "1"        },        {            "person": "YZ",            "date": "09/29/2020",            "jokesAmount": "5"        },        {            "person": "NZ",            "date": "09/29/2020",            "jokesAmount": "3"        }    ]}';

main();

function main() {    

    loadJSON(function (response) {
        notes = JSON.parse(response).notes;
    });
    //loadJSONOnlyForLocalUsing();

    notes.sort(Note.compare);
    initPersons();
    printPersons();
}

function initPersons() {
    persons.push(new Person("Юрій-Стефан Жидецький", "YZ", notes));
    persons.push(new Person("Назар Заплатинський", "NZ", notes));
    persons.push(new Person("Роман Колтун", "RK", notes));
}

function loadJSONOnlyForLocalUsing(){
    notes = JSON.parse(dataJSON).notes;
}

function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'data.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

function printPersons() {
    persons.forEach(person => {
        let personCard = document.getElementById(person.id);
        let daysAmount = personCard.getElementsByClassName("days-amount")[0];
        daysAmount.getElementsByClassName("result")[0].innerHTML = person.daysAmount();

        let jokesAmount = personCard.getElementsByClassName("jokes-amount")[0];
        jokesAmount.getElementsByClassName("result")[0].innerHTML = person.jokesAmount();

        let longestStick = personCard.getElementsByClassName("longest-stick")[0];
        longestStick.getElementsByClassName("result")[0].innerHTML = person.longestStick();

        let curentStick = personCard.getElementsByClassName("current-stick")[0];
        curentStick.getElementsByClassName("result")[0].innerHTML = person.curentStick();
    });
}
