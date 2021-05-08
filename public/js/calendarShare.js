document.addEventListener('DOMContentLoaded', function() {
     var username = document.getElementById('usern');
     var user = username.textContent;
     console.log(user);
    $.ajax({ 
        type: 'GET', 
        url: "http://localhost:3000/retrieveActivities/user="+user+"/", 
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
      
    var calendarEl = document.getElementById('calendar3');
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
          dayHeaderContent: (args) => {
            return moment(args.date).format('ddd D')
        },
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