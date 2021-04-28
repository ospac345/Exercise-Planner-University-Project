// $(function() {
//     getCalendars();
//     initializeCalendar();
    
//   });

//   var getCalendars = function() {
//     $cal = $('.cal');
//   }  
//      /* --------------------------initialize calendar-------------------------- */
//      var initializeCalendar = function() {
//         $('.cal').fullCalendar({
//             editable: true,
//             eventLimit: true, // allow "more" link when too many events
//             // create events
//             defaultTimedEventDuration: '00:30:00',
//             forceEventDuration: true,
//             eventBackgroundColor: '#337ab7',
//             editable: false,
//             height: screen.height - 160,
//             timezone: 'America/Chicago',
//           });
//       }
  

document.addEventListener('DOMContentLoaded', function() {

    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'timeGridWeek',
      editable: true,
      selectable: true,
      timeZone: 'local',
      select: function(start, end) {
        newEvent(start);
    }    
    });

    var newEvent = function(start) {
        $('input#title').val("");
        $('input#date-picker').val(moment(start.start).format("DD/MM/YYYY HH:mm"));
        $('#newEvent').modal('show');
        $('#submit').unbind();
        $('#submit').on('click', function() {    
        var title = $('input#title').val();
        var startDate = start.start;
        var endCal = moment(start.start).add($('#duration-select').children("option:selected").val(), 'minutes'); 
        var endDate = endCal._d;
        console.log(startDate);
        console.log(endDate);
        if (title) {
          var eventData = {
              title: title,
              start: startDate,
              end: endDate,
              allDay: false
          };
          console.log(eventData);
          calendar.addEvent(eventData);
          $('#newEvent').modal('hide');
          }
        else {
          alert("Title can't be blank. Please try again.")
        }
        });
      }
      calendar.render();

    $(function() {
        $('input[name="datetimes"]').daterangepicker({
          singleDatePicker: true,
          timePicker: true,
          showDropdowns: true,
          locale: {
              format: 'DD/MM hh:mm A',
              separator : " - ",
              weekLabel: "W",
            }
        })
      });
      
      
  });

  
