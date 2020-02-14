//create all the elements
let hour9 = $("#9");
let hour10 = $("#10");
let hour11 = $("#11");
let hour12 = $("#12");
let hour13 = $("#13");
let hour14 = $("#14");
let hour15 = $("#15");
let hour16 = $("#16");
let hour17 = $("#17");
let date = $("#date");
let saveBtn = $(".save-Btn");
let timeBlock = $(".time-block");


function setPlanner() {
  let timerInterval = setInterval(function () {
    let currentDateTime = moment().format('dddd, MMMM Do YYYY, h:mm:ss a');
    date.text(currentDateTime);
  }, 1000);
  
  $.each(Object.entries(localStorage), function (x) {
    time=Object.entries(localStorage)[x][0];
    
    eventInfo=Object.entries(localStorage)[x][1];
   
    let eventDetails = $(`#eventDetails-${JSON.parse(time)}`);
    if (eventInfo !== null) {
      eventDetails.val(JSON.parse(eventInfo));
    }
  });
}
setPlanner();

saveBtn.click(function (event) {
  let time = $(this).parent().attr("id");
  let eventDetails = $(this).siblings(".event").val();
  localStorage.setItem(JSON.stringify(time), JSON.stringify(eventDetails));
});



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



