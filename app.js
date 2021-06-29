var currentDayEl = $("#currentDay");
var containerEl = $(".container");

// Set the date
currentDayEl.text(moment().format("dddd, MMMM Do"));

// Create a row for each hour in the work day from 9AM - 5PM
var startHour = 9;
var endHour = 17;

for (var hour = startHour; hour <= endHour; hour++) {
    var timeForRow = moment().startOf('day').add(hour, 'hours');
    var rowEl = $("<div>");
    rowEl.addClass('time-block');
    rowEl.addClass('row');
    var timeEl = $("<span>");
    // Set the time and format like 9AM
    var timeText = timeForRow.format("hA");
    timeEl.text(timeText);
    timeEl.addClass('hour');
    rowEl.append(timeEl);

    // Add a text area for the event
    var eventEl = $("<textarea>");
    rowEl.append(eventEl);

    // Add a save button
    var buttonEl = $("<button>");
    buttonEl.attr("type", "button");
    buttonEl.addClass('saveBtn');
    rowEl.append(buttonEl);

    // Add the row to the container
    containerEl.append(rowEl);
}
