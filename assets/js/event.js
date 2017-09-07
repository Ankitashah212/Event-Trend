$(document).ready(function(){


    // Example URL for 
    var queryURL = 'https://api.datausa.io/api?show=geo&sumlevel=nation&required=pop';

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(function(response){
        console.log(response);
    });

    // Mouse over event for every state that changes the color
    // Example of what to select for changing state color. 
    $('.state').on("mouseenter", function(){
        $(this).find("path").css("fill", "black");
        console.log("Changing Color", this > 'path');
    });

});