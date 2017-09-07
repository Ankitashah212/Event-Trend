$(document).ready(function(){

    var queryURL = 'https://api.datausa.io/api?show=geo&sumlevel=nation&required=pop';

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(function(response){
        console.log(response);
    });
        

});