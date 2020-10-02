function submit(element) {

    debugger;
    let person = element.closest(".person-name");
    let date = element.closest(".date");
    let jokesAmount = element.closest(".jokes-amount");

    let newNote = new Note(person, date, jokesAmount);
    notes.push(newNote);
}

let notes;
loadJSON(function(response) {
    notes = JSON.parse(response).notes;
});


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
