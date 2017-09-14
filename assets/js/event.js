var queryURL = 'https://api.datausa.io/api?show=geo&year=latest&sumlevel=county&required=pop';
var d3URL = 'https://d3js.org/us-10m.v1.json';

var data;


var svg = d3.select("svg");
var path = d3.geoPath();

$(document).ready(function(){

    //////////////
    // DATAUSA TESTS
    //////////////


    // $.ajax({
    //     url: queryURL,
    //     method: 'GET'
    // }).done(function(response){
    //     console.log(response);
    // });

    d3.json(queryURL, function(json) {
        var data = json.data.map(function(data){
            return json.headers.reduce(function(obj, header, i){
            obj[header] = data[i];
            return obj;
            }, {});
        });
        console.log(data);
    });

    ///////////////
    // D3 TESTS
    //////////////

    
    // var color = d3.scale.threshold()
    // .domain([10000, 35000, 65000, 90000, 105000])
    // .range(["#f2f0f7", "#dadaeb", "#bcbddc", "#9e9ac8", "#756bb1", "#54278f"]);

    d3.queue()
    .defer(d3.json, queryURL)
    .defer(d3.json, d3URL)
    .awaitAll(ready);

    function ready (error, queryURL, d3URL){
        if(error) throw error;

        d3.json(d3URL, function (error, us) {
            if (error) throw error;
      
            //console.log(topojson.feature(us, us.objects.counties).features);
      
            svg.append("g")
              .selectAll("path")
              .data(topojson.feature(us, us.objects.counties).features)
              .enter()
              .append("path")
                .attr("d", path)
                .classed("county", true)
              .append("title")
                .text(function(d) { return d.id; });
      
              // svg.append("g")
              //     .selectAll("path")
              //     .data(data)
              //     .enter()
              // .append("path")
              //     .style("fill", function(d) { return color(rateById[d.id]); });
       
            svg.append("path")
                .attr("stroke", "#000")
                .attr("stroke-width", 0.5)
                .attr("d", path(topojson.mesh(us, us.objects.counties, function(a, b) { 
                  return a !== b;
            })));
        });
    }

    function border(id0, id1) {
      return function(a, b) {
        return a.id === id0 && b.id === id1
            || a.id === id1 && b.id === id0;
      };
    }

});