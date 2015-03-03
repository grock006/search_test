app.controller("searchController",function($scope, ImageResource, ReviewResource, YelpResource){

  $scope.options1 = {
      types: 'establishment'
    };

     $scope.options2 = {
      country: 'usa',
      types: '(cities)'
    };

   $scope.searchName = function(name, location){

    var images = ImageResource(name, location);

    $scope.imageresults = []
    $scope.imageresults = images.search();
    $scope.imageresults.$promise.then(function(data) {
    $scope.imageresults = data;
    });

    var reviews = ReviewResource(name, location);

    $scope.reviewresults = []
    $scope.reviewresults = reviews.search();
    $scope.reviewresults.$promise.then(function(data) {
    $scope.reviewresults = data;  
    $scope.totalAverage = parseInt(data[0]['docSentiment']['totalAverage']);
    console.log(data)     
    });

    var yelp = YelpResource(name, location);

    $scope.yelpresults = []
    $scope.yelpresults = yelp.search();
    $scope.yelpresults.$promise.then(function(data) {
    $scope.yelpresults = data;
    var latitude = data[0]["hash"].location.coordinate.latitude
    var longitude = data[0]["hash"].location.coordinate.longitude
    $scope.map = { center: 
      { latitude: latitude, 
        longitude: longitude }, 
        zoom: 16 };
     $scope.marker = { 
                id: 1,
                coords: {
                latitude: latitude, 
                longitude: longitude
                }
       }
    
    });

 };
   

});

    // $scope.map.center = {
    //     latitude: position.coords.latitude,
    //     longitude: position.coords.longitude
    //   };


   

