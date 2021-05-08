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

      var completed = document.querySelector("#completed");
      completed.textContent = (completeActivities.length).toString();

      var missed = document.querySelector("#missed");
      missed.textContent = (incompleteActivities.length).toString();

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
   // cache dom
   var $shareBtn = $('.share-btn');
   var $shareUrl = $('.share-url');
   var $shareContainer = $('.share-container');
   var $notificationButton = $('.notification-button');
   
   // set data
   var $url = "http://localhost:3000/shareActivity/user="+user+"";
   var $shared = false;
   
   /**
    *
    */
   function shareLink(e){
   
       // set active class
       $shareBtn.toggleClass('active');
       $shareUrl.toggleClass('active');
       $shareContainer.toggleClass('active');
   
       if ($shared === false) {
   
           // trigger notification alert
           $notificationButton.toggleClass('active');
           $shared = true;
           $shareBtn.text('Unshare');
           $shareUrl.text($url);
   
           var range = document.createRange();
           range.selectNode($(this).next()[0]);
           window.getSelection().addRange(range);
   
           try {
               // Now that we've selected the anchor text, execute the copy command
               var successful = document.execCommand('copy');
               var msg = successful ? 'successful' : 'unsuccessful';
               console.log('Copy email command was ' + msg);
   
           } catch(err) {
   
               console.log('Oops, unable to copy');
   
           }
   
           // Remove the selections - NOTE: Should use
           // removeRange(range) when it is supported
           window.getSelection().removeAllRanges();
   
   
       } else {
           $shared = false;
           $shareBtn.text('Share');
       }
   }
   
   /**
    * removes the active class after a set period of time
    */
   function fadeOutNotification(){
       setTimeout(function(){
           $notificationButton.removeClass('active');
       }, 2000);
   }
   
   // bind events
   $shareBtn.on('click', shareLink);
   $notificationButton.on('transitionend', fadeOutNotification);


});