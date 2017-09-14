$(document).ready(function(){

    var queryURL = 'https://api.datausa.io/api?show=geo&year=latest&sumlevel=county&required=pop';


    var url = "http://api.datausa.io/api/?show=geo&sumlevel=state&required=avg_wage";
    
    d3.json(queryURL, function(json) {
    
        var data = json.data.map(function(data){
            return json.headers.reduce(function(obj, header, i){
                obj[header] = data[i];
                return obj;
            }, {});
        });
        
        console.log(data);

        var svg = d3.select("svg");
        var path = d3.geoPath();
    
        d3.json("https://d3js.org/us-10m.v1.json", function(error, us) {
        if (error) throw error;

        console.log(topojson.feature(us, us.objects.counties).features);

        svg.append("g")
            .selectAll("path")
            .data(topojson.feature(us, us.objects.counties).features)
            .enter()
        .append("path")
            .attr("d", path)
            .attr("fill", "cyan")
            .classed("county", true)
        .append("title")
            .text(function(d) { return d.id; });

        svg.append("path")
            .attr("stroke", "#000")
            .attr("stroke-width", 0.5)
            .attr("d", path(topojson.mesh(us, us.objects.counties, function(a, b) { 
                return a !== b;
            })));
        });

    });
});