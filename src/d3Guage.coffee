# ( ->
  angular.module("d3Guage", []).directive "d3Guage", ["$document", "needle", "guageService", ($document, needle, guageService) ->

    return {
      restrict: "E"
      scope:
        guageOption: "="
      # templateUrl: 'd3Guage.html'
      template: """{html}"""

      link: (scope, element, attrs) ->

        # === Example ===
        # guageOption =
        #   show: true
        #   startPercent: .75
        #   barWidth: 40
        #   paddingRadius: .05
        #   pointer:
        #     percent: .65
        #     length: 90
        #     radius: 15
        #   sections: [
        #     {
        #       percent: .25
        #       className: "chart-color1"
        #     }
        #     {
        #       percent: .50
        #       className: "chart-color2"
        #     }
        #     {
        #       percent: .25
        #       className: "chart-color3"
        #     }
        #   ]

        chartInset = 10
        
        el = d3.select('.chart-gauge')

        margin = { top: 20, right: 20, bottom: 30, left: 20 }
        width = el[0][0].offsetWidth - margin.left - margin.right
        height = width
        radius = Math.min(width, height) / 2

        svg = el.append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)

        chart = svg.append('g')
            .attr('transform', "translate(#{(width + margin.left) / 2}, #{(height + margin.top) / 2})")

        # Start radius
        startPercent = scope.guageOption.startPercent

        # build gauge bg
        for sectionIndex in [0..scope.guageOption.sections.length-1]

          section = scope.guageOption.sections[sectionIndex]

          arcStartRad = guageService.percToRad startPercent
          arcEndRad = arcStartRad + guageService.percToRad (section.percent / 2)
          startPercent += section.percent / 2

          startPadRad = if sectionIndex is 0 then 0 else scope.guageOption.paddingRadius / 2
          endPadRad = if sectionIndex is (scope.guageOption.sections.length - 1) then 0 else scope.guageOption.paddingRadius / 2

          arc = d3.svg.arc()
            .outerRadius(radius - chartInset)
            .innerRadius(radius - chartInset - scope.guageOption.barWidth)
            .startAngle(arcStartRad + startPadRad)
            .endAngle(arcEndRad - endPadRad)

          chart.append('path')
            .attr('class', "arc #{section.className}")
            .attr('d', arc)

        needle.construct scope.guageOption.pointer
        needle.drawOn chart, 0
        needle.animateOn chart, scope.guageOption.pointer.percent

        scope.$watch "guageOption.pointer.percent", (newValue, oldValue) ->
          return if newValue is oldValue
          needle.animateOn chart, newValue
        , true

    }
  ]
# )()
