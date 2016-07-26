$(document).ready(function() {
  $.getJSON("http://quotes.stormconsultancy.co.uk/quotes/1.json?callback=?", function(obj){
            $(".box-quote").append("<p>"+obj.quote+"</p>");

});
});
