'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
  	  
      $http.get('/fetchwords').then(function(resp){
          console.log('Succcess', resp)
          $scope.words = resp.data
        }, function(err){
          console.log(err)
        })
      
  	  $scope.addWord = function() {
        $http.post('/submit', {
          name: $scope.name
        })
        .then(function onSuccess(sailsResponse){
          console.log("Success!")
        })
        .catch(function onError(sailsResponse){
          console.log("Ruh-roh raggy!")
        })

  	  	if ($scope.name || $scope.name != '') {
  	  		$scope.words.push({
  	  			name: $scope.name,
  	  			isInBook: false,
  	  			score: 0
  	  		})
  	  		$scope.name=''
  	  	}
  	  }

  	  $scope.clickVote = function(word) {
        word.score += 1;
        $http.post('/vote', {
          name: word.name,
          vote: 1
        })
        .then(function onSuccess(sailsResponse){
          console.log("Success!")
        })
        .catch(function onError(sailsResponse){
          console.log("Ruh-roh raggy!")
        })
      }

    /* CLOCK */
    $scope.clock = "Loading Timer..."; // initialise the time variable
    $scope.tickInterval = 1000 //ms
    var tick = function() {
        $scope.clock = Date.now() // get the current time
        $timeout(tick, $scope.tickInterval); // reset the timer
    }
    // Start the timer
    $timeout(tick, $scope.tickInterval);

  }])
  
  .controller('MyCtrl2', [function($scope) {
  }])
;