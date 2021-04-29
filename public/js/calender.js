document.addEventListener('DOMContentLoaded', function() {

    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'timeGridWeek',
      editable: true,
      selectable: true,
      timeZone: 'local',
      themeSystem: 'bootstrap',
      select: function(start, end) {
        newEvent(start);
        date(start);  
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

    var date = function datePicker(start) {
        $('input[name="datetimes"]').daterangepicker({
          startDate: moment(start.start).format("DD/MM/YYYY HH:mm"),
          singleDatePicker: true,
          timePicker: true,
          showDropdowns: true,
          locale: {
              format: 'DD/MM/YYYY HH:mm',
              separator : " - ",
              weekLabel: "W",
            }
        })
      };
      
      
  });

  
