//create all the elements
let date = $("#date");
let saveBtn = $(".save-Btn");
let event = $(".event");
let timeBlock = $(".time-block");

// Funtion to set the current date, time and get the saved events from the local storage
function setPlanner() {
  let timerInterval = setInterval(function () {
    let currentDateTime = moment().format('dddd, MMMM Do YYYY, h:mm:ss a');
    date.text(currentDateTime);
  }, 1000);
//display the saved events from the local storage in the event taskbar
  $.each(Object.entries(localStorage), function (x) {
    time = Object.entries(localStorage)[x][0];
    eventInfo = Object.entries(localStorage)[x][1];
    let eventDetails = $(`#eventDetails-${JSON.parse(time)}`);
    if (eventInfo !== null) {
      eventDetails.val(JSON.parse(eventInfo));
    }
  });
}
setPlanner();
//Add an eventlistener click function to save button, to store the time and user input to the local storage
saveBtn.click(function (event) {
  let time = $(this).parent().attr("id");
  let eventDetails = $(this).siblings(".event").val();
  localStorage.setItem(JSON.stringify(time), JSON.stringify(eventDetails));
});

// Funtion to set the status on the events retrieved from the local storage
function setStatus() {
  hour = moment().hours();
  timeBlock.each(function () {
    let thisHour = parseInt($(this).attr("id"));
    if (thisHour > hour) {
      $((this).children[1]).addClass("future")
    }
    else if (thisHour === hour) {
      $((this).children[1]).addClass("present");
    }
    else {
      $((this).children[1]).addClass("past");
    }
  })
}
setStatus();



