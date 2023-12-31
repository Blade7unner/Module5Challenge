// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // Function to get the current date and display it in the header
  function displayCurrentDate() {
    var currentDate = dayjs().format("dddd, MMMM D, YYYY");
    $("#currentDay").text(currentDate);
  }

  // Function to generate time blocks and apply past/present/future classes
  function generateTimeBlocks() {
    var currentHour = dayjs().hour();

     // Loop through hours from 9 to 17 (5 PM)
     for (var hour = 9; hour <= 17; hour++) {
      var timeBlock = $("<div>")
        .addClass("row time-block")
        .attr("id", "hour-" + hour);

        var hourDisplay = $("<div>")
        .addClass("col-2 col-md-1 hour text-center py-3")
        .text(dayjs().hour(hour).format("ha"));

        var textArea = $("<textarea>")
        .addClass("col-8 col-md-10 description")
        .attr("id", "text-" + hour);

        var saveButton = $("<button>")
        .addClass("btn saveBtn col-2 col-md-1")
        .attr("aria-label", "save");
      var saveIcon = $("<i>").addClass("fas fa-save").attr("aria-hidden", "true");
      saveButton.append(saveIcon);

      // Compare the current hour with the loop hour to determine the class
      if (hour < currentHour) {
        timeBlock.addClass("past");
      } else if (hour === currentHour) {
        timeBlock.addClass("present");
      } else {
        timeBlock.addClass("future");
      }

      timeBlock.append(hourDisplay, textArea, saveButton);

      $(".container-lg").append(timeBlock);
    }
  }

  // Function to load saved data from local storage
  function loadSavedData() {
    for (var hour = 9; hour <= 17; hour++) {
      var textArea = $("#text-" + hour);
      var savedData = localStorage.getItem("hour-" + hour);
      if (savedData) {
        textArea.val(savedData);
      }
    }
  }

  // Function to save user input to local storage
  $(".container-lg").on("click", ".saveBtn", function () {
    var hour = $(this).parent().attr("id");
    var userText = $(this).siblings(".description").val();
    localStorage.setItem(hour, userText);
  
    // Display a message after saving
    $("#message").text("Event saved successfully.").addClass("alert-success").show();
  
    // Hide the message after 3 seconds (adjust the duration as needed)
    setTimeout(function () {
      $("#message").hide();
    }, 3000);
  });

  // Call functions to display the current date, generate time blocks, and load saved data
  displayCurrentDate();
  generateTimeBlocks();
  loadSavedData();

  
});








  

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.

