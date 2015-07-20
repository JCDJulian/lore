'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', ['$scope', '$http', function($scope, $http) {
  	  $scope.words = [
  	  	{name:'belght', isInBook:false, score: 2},
  	  	{name:'Once', isInBook:true, score: 1},
  	  	{name:'upon', isInBook:true, score: 100},
  	  	{name:'a', isInBook:true, score: 12}
  	  ];
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
  }])
  .controller('MyCtrl2', [function($scope) {
  }]);