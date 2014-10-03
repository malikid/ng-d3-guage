# (->

  # service fo ad create
  angular.module("d3Guage").factory 'needle', ["guageService", (guageService) ->
    
    self = {}

    self.construct = (needle) ->

      self = this
      self.length = needle.length
      self.radius = needle.radius

      return self

    self.drawOn = (el, perc) ->

      el.append('circle')
        .attr('class', 'needle-center')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', @radius)

      el.append('path')
        .attr('class', 'needle')
        .attr('d', @mkCmd(perc))

    self.animateOn = (el, perc) ->

      self = this
      el
        .transition()
        .delay(500)
        .ease('elastic')
        .duration(3000)
        .selectAll('.needle')
        .tween('progress', ->
          (percentOfPercent) ->
            progress = percentOfPercent * perc
            d3
              .select(this)
              .attr('d', self.mkCmd progress)
        )

    self.mkCmd = (perc) ->

      thetaRad = guageService.percToRad perc / 2 # half circle

      centerX = 0
      centerY = 0

      topX = centerX - @length * Math.cos(thetaRad)
      topY = centerY - @length * Math.sin(thetaRad)

      leftX = centerX - @radius * Math.cos(thetaRad - Math.PI / 2)
      leftY = centerY - @radius * Math.sin(thetaRad - Math.PI / 2)

      rightX = centerX - @radius * Math.cos(thetaRad + Math.PI / 2)
      rightY = centerY - @radius * Math.sin(thetaRad + Math.PI / 2)

      "M #{leftX} #{leftY} L #{topX} #{topY} L #{rightX} #{rightY}"

    # self.reset = () ->
    #   return construct(self)

    return self
  ]
# )()
