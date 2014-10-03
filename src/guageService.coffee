angular.module("d3Guage").service 'guageService', () ->
  
  self =
    percToDeg: (perc) ->
      perc * 360

    percToRad: (perc) ->
      @degToRad @percToDeg perc

    degToRad: (deg) ->
      deg * Math.PI / 180

  return self