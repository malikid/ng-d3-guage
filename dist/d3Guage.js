(function() {
  angular.module("d3Guage", []).directive("d3Guage", [
    "$document", "needle", "guageService", function($document, needle, guageService) {
      return {
        restrict: "E",
        scope: {
          guageOption: "="
        },
        template: "<div ng-show=\"guageOption.show\" class=\"chart-gauge\"></div>",
        link: function(scope, element, attrs) {
          var arc, arcEndRad, arcStartRad, chart, chartInset, el, endPadRad, height, margin, radius, section, sectionIndex, startPadRad, startPercent, svg, width, _i, _ref;
          chartInset = 10;
          el = d3.select('.chart-gauge');
          margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 20
          };
          width = el[0][0].offsetWidth - margin.left - margin.right;
          height = width;
          radius = Math.min(width, height) / 2;
          svg = el.append('svg').attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom);
          chart = svg.append('g').attr('transform', "translate(" + ((width + margin.left) / 2) + ", " + ((height + margin.top) / 2) + ")");
          startPercent = scope.guageOption.startPercent;
          for (sectionIndex = _i = 0, _ref = scope.guageOption.sections.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; sectionIndex = 0 <= _ref ? ++_i : --_i) {
            section = scope.guageOption.sections[sectionIndex];
            arcStartRad = guageService.percToRad(startPercent);
            arcEndRad = arcStartRad + guageService.percToRad(section.percent / 2);
            startPercent += section.percent / 2;
            startPadRad = sectionIndex === 0 ? 0 : scope.guageOption.paddingRadius / 2;
            endPadRad = sectionIndex === (scope.guageOption.sections.length - 1) ? 0 : scope.guageOption.paddingRadius / 2;
            arc = d3.svg.arc().outerRadius(radius - chartInset).innerRadius(radius - chartInset - scope.guageOption.barWidth).startAngle(arcStartRad + startPadRad).endAngle(arcEndRad - endPadRad);
            chart.append('path').attr('class', "arc " + section.className).attr('d', arc);
          }
          needle.construct(scope.guageOption.pointer);
          needle.drawOn(chart, 0);
          needle.animateOn(chart, scope.guageOption.pointer.percent);
          return scope.$watch("guageOption.pointer.percent", function(newValue, oldValue) {
            console.log("newValue", newValue, "oldValue", oldValue);
            if (newValue === oldValue) {
              return;
            }
            return needle.animateOn(chart, newValue);
          }, true);
        }
      };
    }
  ]);

}).call(this);
