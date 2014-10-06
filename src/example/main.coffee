((ng) ->
  "use strict"
  app = ng.module("demo", ["d3Guage"])
  app.controller "demoCtrl", ($scope) ->
    
    $scope.guageOption =
      show: true
      startPercent: .75
      barWidth: 40
      paddingRadius: .05
      pointer:
        percent: .65
        length: 90
        radius: 15
      sections: [
        {
          percent: .25
          className: "chart-color1"
        }
        {
          percent: .50
          className: "chart-color2"
        }
        {
          percent: .25
          className: "chart-color3"
        }
      ]

    return

) angular
