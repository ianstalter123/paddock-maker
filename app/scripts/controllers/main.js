'use strict';

/**
 * @ngdoc function
 * @name pasturemapApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pasturemapApp
 */
angular.module('pasturemapApp')
  .controller('MainCtrl', function($scope) {

    var x = [];
    var y = [];
    $scope.currentInputs = [];
    var numPoints = 0;
    var curX = 0;
    var curY = 0;

    $scope.create = function() {
      drawShape();
    };

    $scope.reset = function() {
      var canvas = document.getElementById("myCanvas");
      var ctx = canvas.getContext("2d");
      numPoints = 0;
      $scope.area = 0;
      $scope.currentInputs = [];
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      curX = 0;
      curY = 0;
      $scope.x = [];
      $scope.y = [];
    }

    $scope.updateInputs = function(input, index) {
      //console.log(input, index + 1);
      console.log($scope.currentInputs);
      $scope.currentInputs[index] = input;
    };

    $scope.addCoordinate = function() {
      numPoints += 1;
      curX += 1;
      curY += 1;

      $scope.currentInputs.push(curX, curY);
      console.log('inputs', $scope.currentInputs);
    };


    var drawShape = function() {
      var canvas = document.getElementById("myCanvas");
      var ctx = canvas.getContext("2d");

      //var p = $scope.currentInputs;
      //$scope.currentInputs = [200, 280, 310, 120, 240, 50, 135, 90];
      var p = $scope.currentInputs;
      console.log('current', $scope.currentInputs);

      for (var i = 0; i < p.length; i += 2) {
        if (p[i + 3] > 0) {
          console.log('here');
          ctx.moveTo(p[i], p[i + 1]);
          ctx.lineTo(p[i + 2], p[i + 3]);
          ctx.stroke();
        } else {
          ctx.moveTo(p[i], p[i + 1]);
          ctx.lineTo(p[0], p[1]);
          ctx.stroke();
        }

      }

      for (var i = 0; i < $scope.currentInputs.length; i += 2) {
        x.push($scope.currentInputs[i]);
        y.push($scope.currentInputs[i + 1]);
      };
      console.log(x, y, numPoints);
      var shapeArea = polygonArea(x, y, numPoints);
      console.log('area', shapeArea);
      $scope.area = shapeArea;
    }

    var polygonArea = function(X, Y, numPoints) {
      var area = 0; // Accumulates area in the loop
      var j = numPoints - 1; // The last vertex is the 'previous' one to the first

      for (var i = 0; i < numPoints; i++) {
        area = area + (Number(X[j]) + Number(X[i])) * (Number(Y[j]) - Number(Y[i]));
        console.log(X[j])
        j = i; //j is previous vertex to i
        console.log(area, 'area');
      }
      return area / 2;
    }



    console.log('in the main controller');
  });
