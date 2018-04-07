console.log('this is the controller');

angular.module('scrapeApp')
 .controller('scrapeController', scrapeController);
     
     scrapeController.$inject = ['scrapeService', '$scope'];
      function scrapeController (scrapeService, $scope){
        

        const vm = this;
          
           vm.headings = {
              mheading:"Marina's data scraper",
              subheading: "Checking the number of my photo downloads"
            };

          
         $scope.loadData = function() {
             scrapeService.getScrapeInfo()
             .then(function (scrapeData){
             
              console.log("scrapeData.data:", scrapeData.data)
              let notes = scrapeData.data;
     
              vm.downloads = notes.downloads;
              vm.picNumber = notes.picnumber;
              vm.date = notes.date;
              // vm.time = vm.notes.time; 

                    const todayDate = new Date()                   
                    const day = todayDate.getDate();

                    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                    const month = months[todayDate.getMonth()];

                    const year = todayDate.getFullYear();
                    vm.date = day + " " + month + " " + year;
                    console.log("vm.date:", vm.date);

                    const timeToday = new Date();
                    const hour = timeToday.getHours() + " h";
                    const min = timeToday.getMinutes() + " min";
                    const sec = timeToday.getSeconds() + "s";
                    vm.time = hour + " " + min + " " + sec;
                    console.log("vm.time: ", vm.time);        

 
     });//end of call to service
  } //end of refresh
  $scope.loadData(); 
         
}//end of controller