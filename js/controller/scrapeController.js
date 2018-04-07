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

     });
  }
  $scope.loadData(); //end of refresh
         
}//end of controller