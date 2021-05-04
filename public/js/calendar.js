

document.addEventListener('DOMContentLoaded', function() {
 var username = document.getElementById('username-hide');
 var user = username.textContent;
  console.log(user);
    $.ajax({ 
        type: 'GET', 
        url: "http://localhost:3000/"+user+"/showActivities", 
        dataType: 'json',
        success: function (data) { 
          var incompleteActivities = [];

          for(var i=0;i<data.length;i++){
            if(data[i].completed=="false"){
              incompleteActivities.push(data[i]);
            }
      };
      var totalActivities = document.querySelector("#total-activities");
      totalActivities.textContent = (incompleteActivities.length).toString();

      var calendarEl = document.getElementById('calendar');
       var calendar = new FullCalendar.Calendar(calendarEl, {
          initialView: 'timeGridWeek',
          editable: true,
          selectable: true,
          timeZone: 'local',
          events: incompleteActivities,
          themeSystem: 'bootstrap',
          headerToolbar: {
            left: 'prev,next',
            center: 'title',
            right: 'timeGridWeek,dayGridMonth,timeGridDay'
          },
          dayHeaderContent: (args) => {
            return moment(args.date).format('ddd D')
        },
          
          select: function(start, end) {
            console.log(start);
            newEvent(start);
            date(start.start);  
          }, 
          eventClick: function(event, jsEvent, view) {
          var editStart = event.event.start;
          editEvent(event.event);
          date(editStart);
          },
          
        });        
 
        var newEvent = function(start) {
            $('input#title').val("");
            $('input#date-picker').val(moment(start.start).format("DD/MM/YYYY HH:mm"));
            $('#newEvent').modal('show');
            $('#submit').unbind();
            $('#submit').on('click', function() {    
            var title = $('input#title').val();
            var startDate = moment(start.start).format();
            var endCal = moment(start.start).add($('#duration-select').children("option:selected").val(), 'minutes'); 
            var endDate = moment(endCal._d).format();
            if (title) {
              var eventData = {
                  title: title,
                  start: startDate,
                  end: endDate,
                  allDay: false
              };
              calendar.addEvent(eventData);
              $('#newEvent').modal('hide');

              $.ajax({
                type: 'POST',
                url: "http://localhost:3000/"+user+"/addActivity",
                dataType: "text",
                data: (eventData),
                 error: function(e) {
                  console.log(e);
                },
              },calendar.render());
              
              }
            else {
              alert("Title can't be blank. Please try again.")
            }
            });
          }

          var editEvent = function(event) {
            $('input#editTitle').val(event.title);
            $('input#edit-date-picker').val(event.start);
            var endDate = moment(event.end).format();
            var startDate = moment(event.start).format();
            var difference = moment(endDate).diff(startDate, 'minutes');
            $('#edit-duration-select').val(difference);

            $('#editEvent').modal('show');
            $('#update').unbind();
            $('#update').on('click', function() {
              var title = $('input#editTitle').val();
              var dateString = $('#edit-date-picker').val().toString();
              console.log(dateString);
              var newDate = moment(dateString, "DD/MM/YYYY HH:mm")
              var newStart = moment(newDate).format();
              var newEnd = moment(newDate).add($('#edit-duration-select').children("option:selected").val(), 'minutes');
              newEndFormatted = moment(newEnd).format();
              $('#editEvent').modal('hide');
              if (title) {
                event.title = title
                event.setProp('title', title);
                 event.start = newStart
                 event.end = newEndFormatted
                event.setDates(newStart, newEndFormatted);
                var updatedActivity = {
                id: event._def.extendedProps._id,
                newTitle: event.title,
                newStart: newStart,
                newEnd: newEndFormatted
                };
                $.ajax({
                  type: 'POST',
                  url: "http://localhost:3000/"+user+"/updateActivity",
                  dataType: "text/plain",
                  data: (updatedActivity),
                   error: function(e) {
                    console.log(e);
                  },
                }, calendar.render());
              } else {
              alert("Title can't be blank. Please try again.")
              }
            });
            $('#delete').on('click', function() {
              $('#delete').unbind();
              event.remove();
              $('#editEvent').modal('hide');
              var eventId = {
                id: event._def.extendedProps._id
              };
              //console.log(eventId);
                $.ajax({
                type: 'POST',
                url: "http://localhost:3000/"+user+"/removeActivity",
                dataType: "text/plain",
                data: (eventId),
                 error: function(e) {
                  console.log(e);
                }, 
              },calendar.render());
            });

            $('#complete').on('click', function() {
              $('#complete').unbind();
              event.remove();
              $('#editEvent').modal('hide');
              var eventId = {
                id: event._def.extendedProps._id
              };
              $.ajax({
                type: 'POST',
                url: "http://localhost:3000/"+user+"/completeActivity",
                dataType: "text/plain",
                data: (eventId),
                 error: function(e) {
                  console.log(e);
                },
              }, calendar.render());
            });
          }
          calendar.render();
    
        var date = function datePicker(start) {
            $('input[name="datetimes"]').daterangepicker({
              startDate: moment(start).format("DD/MM/YYYY HH:mm"),
              singleDatePicker: true,
              timePicker: true,
              showDropdowns: true,
              locale: {
                  format: 'DD/MM/YYYY HH:mm',
                  separator : " - ",
                  weekLabel: "W",
                }
            })
        }

      }
    });
    
    });

