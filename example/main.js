(function() {
  (function(ng) {
    "use strict";
    var app;
    app = ng.module("demo", ["d3Guage"]);
    return app.controller("demoCtrl", function($scope) {
      $scope.data = {
        guageOption: {
          show: true,
          startPercent: .75,
          barWidth: 40,
          paddingRadius: .05,
          pointer: {
            percent: .65,
            length: 90,
            radius: 15
          },
          sections: [
            {
              percent: .25,
              className: "chart-color1"
            }, {
              percent: .50,
              className: "chart-color2"
            }, {
              percent: .25,
              className: "chart-color3"
            }
          ]
        }
      };
      $scope.guageOptionKeys = Object.keys($scope.data.guageOption);
      $scope.isObject = function(value) {
        return angular.isObject(value);
      };
    });
  })(angular);

}).call(this);
