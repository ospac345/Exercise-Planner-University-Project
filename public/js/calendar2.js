document.addEventListener('DOMContentLoaded', function() {
    var username = document.getElementById('username-hide');
    var user = username.textContent;
    $.ajax({ 
        type: 'GET', 
        url: "http://localhost:3000/"+user+"/showActivities", 
        dataType: 'json',
        success: function (data) { 
          var completeActivities =[];
          var incompleteActivities = [];

          for(var i=0;i<data.length;i++){
            if(data[i].completed=="false"){
              incompleteActivities.push(data[i]);
            }
            else{
              completeActivities.push(data[i]);
            }
      };

    var calendarEl = document.getElementById('calendar2');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'timeGridWeek',
        editable: false,
        selectable: false,
        timeZone: 'local',
        themeSystem: 'bootstrap',
        headerToolbar: {
          left: 'prev,next',
          center: 'title',
          right: 'timeGridWeek,dayGridMonth,timeGridDay'},
          eventSources:[
                    {
                        events: completeActivities,
                        color:'green'
                    },
                    {
                        events: incompleteActivities,
                        color:'red'
                    }
            
                  ]
        }


      );
     
      calendar.render();
    }

});


});