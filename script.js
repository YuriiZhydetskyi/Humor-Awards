let notes = [];
let persons = [];
let awards = [];
//just for local using
let dataJSON = '{    "notes" : [        {            "person": "YZ",            "date": "09/28/2020",            "jokesAmount": "5"        },        {            "person": "NZ",            "date": "09/28/2020",            "jokesAmount": "5"        },        {            "person": "RK",            "date": "09/28/2020",            "jokesAmount": "1"        },        {            "person": "YZ",            "date": "09/29/2020",            "jokesAmount": "5"        },        {            "person": "NZ",            "date": "09/29/2020",            "jokesAmount": "3"        }    ],    "awards" : [        {            "nameUk": "Я хоча б спробував",            "imgPath": "img/awards/RP Mcmurphy.jpg",            "imgAlt": "Макмерфі",            "neededLength": "1"        },        {            "nameUk": "Початківець",            "imgPath": "img/awards/fool cap.jpg",            "imgAlt": "Кепка дурня",            "neededLength": "2"        },        {            "nameUk": "Цілеспрямований",            "imgPath": "img/awards/Bushuev.jpeg",            "imgAlt": "Бушуєв",            "neededLength": "5"        }    ]    }';
//

let loadData = new Promise((resolve, reject) => {

    let localURL = "file://";
    if (window.location.href.substr(0, localURL.length).toUpperCase() == localURL.toUpperCase()) {
        loadJSONOnlyForLocalUsing();
        setTimeout(resolve(), 0);
    } else {

        loadJSON(function (response) {
            let parsedJson = JSON.parse(response);
            notes = parsedJson.notes;
            awards = parsedJson.awards;

            resolve();
        });
    }
})

main();

function main() {

    loadData.then(() => {

        notes.sort(Note.compare);
        initPersons();
        printPersons();
        printCalendar();
    })


}

function initPersons() {
    persons.push(new Person("Юрій-Стефан Жидецький", "YZ", notes));
    persons.push(new Person("Назар Заплатинський", "NZ", notes));
    persons.push(new Person("Роман Колтун", "RK", notes));
}

function loadJSONOnlyForLocalUsing() {
    let parsedJson = JSON.parse(dataJSON);
    parsedJson.notes.forEach(note => {
        notes.push(new Note(note));
    });

    parsedJson.awards.forEach(award => {
        awards.push(new Award(award));
    })
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
        longestStick.getElementsByClassName("result")[0].innerHTML = person.longestStick;

        let curentStick = personCard.getElementsByClassName("current-stick")[0];
        curentStick.getElementsByClassName("result")[0].innerHTML = person.curentStick();
        //finished filling data

        person.printAwards(personCard.getElementsByClassName("pictre-and-awards")[0], awards);
    });
}


function printCalendar() {

    let calendar = document.getElementById("calendar");

    persons.forEach(person => {

        let personElement = document.createElement('div');
        personElement.classList.add("prarticipant-month-calendar");
        personElement.id = person.id + "-calendar";

        let personNameElement = document.createElement("b");
        personNameElement.appendChild(document.createTextNode(person.name));
        personNameElement.classList.add("month-calendar-participant-name");
        personElement.appendChild(personNameElement);

        calendar.appendChild(personElement);

        for (let i = 0; i <= 30; ++i) {

            let dayBoxElement = document.createElement("div");
            dayBoxElement.classList.add("prarticipant-month-calendar-day-box");

            let now = new Date();
            let day = new Date(now.setDate(now.getDate() - i));
            let jokesAmount = person.jokesAmountInSpecificDay(day);

            let dayBoxInfo = document.createElement("div");
            dayBoxInfo.classList.add("day-box-info");
            dayBoxInfo.appendChild(document.createElement("p").appendChild(document.createTextNode(day.toJSON().slice(0, 10))));
            dayBoxInfo.appendChild(document.createTextNode("\n Жартів: " + jokesAmount));
            dayBoxElement.appendChild(dayBoxInfo);

            if (jokesAmount >= 5) {
                dayBoxElement.classList.add("compleated-day-aim");
            } else if (jokesAmount > 0) {
                dayBoxElement.classList.add("partially-compleated-day-aim");
            } else {
                dayBoxElement.classList.add("failed-day-aim");
            }

            personElement.appendChild(dayBoxElement);
        }

    });

}
