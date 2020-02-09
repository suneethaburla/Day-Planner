//create all the elements
let date = $("#date");

startTimer();
function startTimer() {
    let timerInterval = setInterval(function () {
        let currentDateTime = moment().format('dddd, MMMM Do YYYY, h:mm:ss a');

        date.text(currentDateTime);

    }, 1000);
}