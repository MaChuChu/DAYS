const test = document.getElementById('test');

var table = document.getElementById("myTable");

const dateInput = document.querySelector('input[type="date"]');
const topicInput = document.getElementById('topic')
// console.log(dateInput.value); // prints "2017-06-01"
// console.log(dateInput.valueAsNumber); // prints 1496275200000, a JavaScript timestamp (ms)

function submitForm() {
    let date = dateInput.value;
    let dateArray = date.split('-')
    let newFormat = `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`

    let row = table.insertRow();

    let dateCell = row.insertCell(0);
    let topicCell = row.insertCell(1);
    let daysCell = row.insertCell(2);

    dateCell.innerHTML = newFormat;
    topicCell.innerHTML = topicInput.value;
    daysCell.innerHTML = daysBetween(date);

    addData(date, topicInput.value);

}

function daysBetween(date1) {
    let timeElapsed = Date.now();
    let today = new Date(timeElapsed);

    const diffTime = new Date(date1) - new Date();
    const diffDays = parseInt(diffTime / (1000 * 60 * 60 * 24)) + 1;

    return diffDays;
}


const filterBtn = document.getElementsByClassName('filter');

function filterClick() {
    console.log('Filter Clicked')

    var rows, switching, i, x, y, shouldSwitch;
    switching = true;
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[2];
            y = rows[i + 1].getElementsByTagName("TD")[2];
            //check if the two rows should switch place:
            if (parseInt(x.innerHTML) > parseInt(y.innerHTML)) {
                //if so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

function addData(date, name) {
    if (checkStorage() === true) {
        var oldData = JSON.parse(localStorage.getItem('items'));

        let object = {
            date: date,
            name: name
        }

        oldData.push(object)

        var itemsJSON = JSON.stringify(oldData);
        localStorage.setItem('items', itemsJSON)
    }

}

function loadItems() {
    if (localStorage.getItem('items') !== null) {
        var oldData = JSON.parse(localStorage.getItem('items'));
        console.log('Items loaded');
        console.log(oldData);

        for (let i = 0; i < oldData.length; i++) {
            let date = oldData[i].date;
            let name = oldData[i].name;

            let row = table.insertRow();

            let dateCell = row.insertCell(0);
            let topicCell = row.insertCell(1);
            let daysCell = row.insertCell(2);

            let dateArray = date.split('-')
            let newFormat = `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`

            dateCell.innerHTML = newFormat;
            topicCell.innerHTML = name;
            daysCell.innerHTML = daysBetween(date);
        }
    } else {
        console.log('no data to load')
    }
}

function checkStorage() {
    let check = false;
    if (localStorage.getItem('items') !== null) {
        check = true;
    } else {
        createStorage();
        check = true;
    }
    return check;
}

function createStorage() {
    var object = [];
    var dataJSON = JSON.stringify(object);
    localStorage.setItem("items", dataJSON);
}