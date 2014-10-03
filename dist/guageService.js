(function() {
  angular.module("d3Guage").service('guageService', function() {
    var self;
    self = {
      percToDeg: function(perc) {
        return perc * 360;
      },
      percToRad: function(perc) {
        return this.degToRad(this.percToDeg(perc));
      },
      degToRad: function(deg) {
        return deg * Math.PI / 180;
      }
    };
    return self;
  });

}).call(this);
