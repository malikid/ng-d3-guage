(function() {
  angular.module("d3Guage").factory('needle', [
    "guageService", function(guageService) {
      var self;
      self = {};
      self.construct = function(needle) {
        self = this;
        self.length = needle.length;
        self.radius = needle.radius;
        return self;
      };
      self.drawOn = function(el, perc) {
        el.append('circle').attr('class', 'needle-center').attr('cx', 0).attr('cy', 0).attr('r', this.radius);
        return el.append('path').attr('class', 'needle').attr('d', this.mkCmd(perc));
      };
      self.animateOn = function(el, perc) {
        self = this;
        return el.transition().delay(500).ease('elastic').duration(3000).selectAll('.needle').tween('progress', function() {
          return function(percentOfPercent) {
            var progress;
            progress = percentOfPercent * perc;
            return d3.select(this).attr('d', self.mkCmd(progress));
          };
        });
      };
      self.mkCmd = function(perc) {
        var centerX, centerY, leftX, leftY, rightX, rightY, thetaRad, topX, topY;
        thetaRad = guageService.percToRad(perc / 2);
        centerX = 0;
        centerY = 0;
        topX = centerX - this.length * Math.cos(thetaRad);
        topY = centerY - this.length * Math.sin(thetaRad);
        leftX = centerX - this.radius * Math.cos(thetaRad - Math.PI / 2);
        leftY = centerY - this.radius * Math.sin(thetaRad - Math.PI / 2);
        rightX = centerX - this.radius * Math.cos(thetaRad + Math.PI / 2);
        rightY = centerY - this.radius * Math.sin(thetaRad + Math.PI / 2);
        return "M " + leftX + " " + leftY + " L " + topX + " " + topY + " L " + rightX + " " + rightY;
      };
      return self;
    }
  ]);

}).call(this);
