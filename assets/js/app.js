var currentDayEl = $("#currentDay");
var containerEl = $(".container");

// Set the date
currentDayEl.text(moment().format("dddd, MMMM Do"));

// Create a row for each hour in the work day from 9AM - 5PM
var startHour = 9;
var endHour = 17;
var currentTime = moment();

// Saved events
var savedEvents = {};

// Get save events from local storage
var fromLocalStorage = localStorage.getItem("savedEvents");

if (fromLocalStorage) {
    savedEvents = JSON.parse(fromLocalStorage);
}

for (var hour = startHour; hour <= endHour; hour++) {
    var timeForRow = moment().startOf('day').add(hour, 'hours');
    var rowEl = $("<div>");
    rowEl.addClass('time-block');
    rowEl.addClass('row');
    var timeEl = $("<span>");
    // Set the time and format like 9AM
    var timeText = timeForRow.format("hA");
    // Save the date for the row in the time element
    var timeStamp = timeForRow.format("dddd, MMMM Do hA");
    timeEl.attr('data-date', timeStamp);
    timeEl.text(timeText);
    timeEl.addClass('hour');
    // Use bootstrap class to make 1/6 of the row size
    timeEl.addClass('col-2');
    rowEl.append(timeEl);

    // Add a text area for the event
    var eventEl = $("<textarea>");

    // Set the color for the textarea based on the time
    if (currentTime.isBefore(timeForRow)) {
        // current time is before the start time for the row so it is in the future
        eventEl.addClass('future');
    } else if (moment().startOf('day').add(hour + 1, 'hours').isBefore(currentTime)) {
        // end time for the row is before the current time so it is in the past
        eventEl.addClass('past');
    } else {
        // row is in the present
        eventEl.addClass('present');
    }

    // Check if there is a saved entry for this time
    if (savedEvents.hasOwnProperty(timeStamp)) {
        eventEl.val(savedEvents[timeStamp]);
    }
    // Use bootstrap class to make 2/3 of the row size
    eventEl.addClass('col-8');

    rowEl.append(eventEl);

    // Add a save button
    var buttonEl = $("<button>");
    buttonEl.attr("type", "button");
    buttonEl.addClass('saveBtn');
    
    // Add the save icon
    // <span class="material-icons-outlined"> save </span>
    var saveIconEl = $("<span>");
    saveIconEl.addClass('material-icons');
    saveIconEl.text('save');
    buttonEl.append(saveIconEl);
    // Use bootstrap class to make 1/6 of the row size
    eventEl.addClass('col-2');

    rowEl.append(buttonEl);

    // Add the row to the container
    containerEl.append(rowEl);
}

// Event handler for the save buttons
containerEl.on('click', '.saveBtn', function (event) {
    var element = event.target;
    if (element.matches("span")) {
        // Clicked on the span so navigate from the button
        element = $(element).parent();
    }
    // Get the date and time from the row
    var dateForEvent = $(element).siblings().eq(0).attr('data-date');
    // Get the event for thr row
    var eventForRow = $(element).siblings().eq(1).val();
    savedEvents[dateForEvent] = eventForRow;
    // Save the event to local storage
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
});