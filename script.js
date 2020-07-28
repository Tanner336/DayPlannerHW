$(document).ready(function() {
  // listen for save button clicks
  

  $(".saveBtn").on("click", function() {
    // get nearby values
    var value = $(this).siblings(".description").val();
    var time = $(this).parent().attr("id");

    console.log('value:', value);
    console.log('time:', time);

    // save the value in localStorage as time
    localStorage.setItem(time, value);

    
  });

  
  hourUpdater();

  // set up interval to check if current time needs to be updated
  // which means execute hourUpdater function every 15 seconds
  setInterval(function(){hourUpdater()}, 15000);

  // load any saved data from localStorage
  // localStorage.getItem(value);
 
  for(var i=0; i<localStorage.length; i++){
    var key = localStorage.key(i);
    var description = localStorage.getItem(key);

    console.log(key + "=[" + description + "]");
    $("#" + key).children(".description").val(description);
  }
  

  // display current day on page
  $("#currentDay").text(moment().format("dddd, MMMM Do"));
  
  
  function hourUpdater() {
    // get current number of hours
    var currentHour = moment().hours();
    console.log('current hour:', currentHour);

    // loop over time blocks
    $(".time-block").each(function() {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);
      var textArea = $("textarea");

      console.log("block hour:", blockHour);
      

      // check if we've moved past this time
      if (currentHour > blockHour) {
        $(this).addClass("past");
      } else if (currentHour === blockHour) {
        $(this).remove("past")
        $(this).addClass("present"); 
      } else {
        $(this).remove("past")
        $(this).remove("present")
        $(this).addClass("future");
      }
      // if the current hour is greater than the block hour
      // then add class "past"

      // if they are equal
      // then remove class "past" and add class "present"

      // else
      // remove class "past", remove class "present", add class "future"
    });
  }

 
});
