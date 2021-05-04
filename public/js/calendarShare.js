document.addEventListener('DOMContentLoaded', function() {
    var username = document.getElementById('usern');
    var user = username.textContent;
    $.ajax({ 
        type: 'GET', 
        url: "http://localhost:3000/post/shareActivity/user=simam202", 
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

    //   var completed = document.querySelector("#completed");
    //   completed.textContent = (completeActivities.length).toString();

    //   var missed = document.querySelector("#missed");
    //   missed.textContent = (incompleteActivities.length).toString();

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