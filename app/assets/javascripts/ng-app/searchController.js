app.controller("searchController",function($scope, ImageResource, ReviewResource, YelpResource, usSpinnerService){

    $scope.image = "instagram"

    $scope.makeLarge = function(url){
        $scope.main_image_url = url
    }

  $scope.options1 = {
      types: 'establishment',
      watchEnter: false
    };

    $scope.details = ""

    $scope.startSpin = function(){
        usSpinnerService.spin('spinner-1');
    }
    $scope.stopSpin = function(){
        usSpinnerService.stop('spinner-1');
    }

   $scope.searchName = function(name, location){

    $scope.startSpin();

    $scope.main_keywords = [];
    $scope.detailsName = $scope.details.name

    name = $scope.details.name
    location = $scope.details.address_components[2].long_name + " " + $scope.details.address_components[3].short_name
    $scope.google = $scope.details

    var images = ImageResource(name, location);

    $scope.imageresults = []
    $scope.imageresults = images.search();
    $scope.imageresults.$promise.then(function(data) {
    $scope.imageresults = data;
    $scope.main_image_url = data[0].images.low_resolution.url
    });

    var reviews = ReviewResource(name, location);

    $scope.reviewresults = []
    $scope.reviewresults = reviews.search();
    $scope.reviewresults.$promise.then(function(data) {
    $scope.reviewresults = data;  
    $scope.totalAverage = parseInt(data[0]['docSentiment']['totalAverage']);
    $scope.positiveReviews = parseInt(data[0]['docSentiment']['pos_total']);
    $scope.negativeReviews = parseInt(data[0]['docSentiment']['neg_total']);
    $scope.totalReviews = parseInt(data[0]['docSentiment']['total_review']);
    $scope.main_keywords = [data[0]['docSentiment']["keywords"][2].text, 
                            data[1]['docSentiment']["keywords"][2].text,
                            data[2]['docSentiment']["keywords"][2].text
                            ];
    $scope.rating = (($scope.positiveReviews / $scope.totalReviews) * 100) / 20
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



   

