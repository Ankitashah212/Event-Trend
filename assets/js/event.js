$(document).ready(function(){


    var svg = d3.select("svg");
    
    var path = d3.geoPath();
    
    d3.json("https://d3js.org/us-10m.v1.json", function(error, us) {
      if (error) throw error;
    
      svg.append("g")
          .attr("fill", "cyan")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .enter().append("path")
          .attr("d", path)
        .append("title")
          .text(function(d) { return d.id; });
    
      svg.append("path")
          .attr("stroke", "#000")
          .attr("stroke-width", 0.5)
          .attr("d", path(topojson.mesh(us, us.objects.counties, function(a, b) { return a !== b; })));
    });
    
    function border(id0, id1) {
      return function(a, b) {
        return a.id === id0 && b.id === id1
            || a.id === id1 && b.id === id0;
      };
    }
    
});