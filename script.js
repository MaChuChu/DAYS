const test = document.getElementById('test');

var table = document.getElementById("myTable");

const dateInput = document.querySelector('input[type="date"]');
const topicInput = document.getElementById('topic')
console.log(dateInput.value); // prints "2017-06-01"
console.log(dateInput.valueAsNumber); // prints 1496275200000, a JavaScript timestamp (ms)

function submitForm() {
    let date = dateInput.value;
    console.log(date);
    let dateArray = date.split('-')
    let newFormat = `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`
    console.log(newFormat);

    let row = table.insertRow();
    let dateCell = row.insertCell(0);
    let topicCell = row.insertCell(1);
    let daysCell = row.insertCell(2);
    dateCell.innerHTML = newFormat;
    topicCell.innerHTML = topicInput.value;
    console.log(topicInput.value);
    daysCell.innerHTML = daysBetween(date);

    if (daysBetween(date) < 21) {
        daysCell.style.backgroundColor = 'green';
    }

    if (daysBetween(date) < 15) {
        daysCell.style.backgroundColor = 'yellow';
    }

    if (daysBetween(date) < 7) {
        daysCell.style.backgroundColor = 'red';
    }
}

function daysBetween(date1) {
    let timeElapsed = Date.now();
    let today = new Date(timeElapsed);

    const diffTime = new Date(date1) - new Date();
    const diffDays = parseInt(diffTime / (1000 * 60 * 60 * 24)) + 1;
    console.log(diffDays + " days");
    return diffDays;
}