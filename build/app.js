
var artistName = "";
var markers = [];
$('.band-info a').hide();
$('.band-info h2').hide();
$('.loading').hide();
$('.no-tours').hide();
var getLocation = function() {
	    if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(showPosition);

	        alert('got location')

	    } else {
	          alert("Geolocation is not supported by this browser.");
	    }
	}
		function showPosition(position) {
			$('.loading').show();
		    var location = {latitude: position.coords.latitude,
		    		    	longitude: position.coords.longitude};
		    	var artistName = $('#artistName').val();
		    	getTourDates(artistName, location);
		}
var getTourDates = function(artistName, location){
	$.getJSON("http://api.bandsintown.com/artists/" + artistName + "/events.json?api_version=2.0&callback=?&app_id=ryjay&location=" + location.latitude + "," + location.longitude + "",
	 function(result) {
	 	if(result){
	   displayTourDates(location, result);
			}
	    });
};
var displayTourDates = function(location, result){
	if(result && result[0]){
	var tourDates = result[0].artists[0].facebook_tour_dates_url;
	$('.band-info a').attr('href', tourDates);
	$('.band-info a').attr('target', '_blank');
	$('.no-tours').hide();
	$('.get-tickets').show();
	initMap(location, result);
	}
	else{
		$('.loading').hide();
		$('.no-tours').show();
		$('.get-tickets').hide();
		$('.map').hide();
	}
}
	$( "#artist" ).on("input", function() {
		var input = this.value;
	});
	$(function() {
		$( "#artist" ).autocomplete({
	        minLength: 1,
			 source: function (request, response) {
	            $.ajax({
	                url: 'https://api.spotify.com/v1/search',
	                data: {
	                    q: $("#artist").val(),
	                    type: 'artist',
	                    limit: 10
	                },
	                success: function (data) { 
	                	response(data.artists.items)	    
	                }
	            });
	        }
	    }).data( "ui-autocomplete" )._renderItem = function( ul, item ) {       
             return $( "<li></li>" ).click(function(){
             		$('#artist').val(item.name);
             		$('.band-name-input').submit()
             })
                .data( "item.autocomplete", item )
                  .append( "<a class='artist-image'>" + item.name + "<br>" + '<img src=' + item.images[0].url + '>' + "</a>" )
                .appendTo( ul );
  };
	 });
//ajax data is obtained and returned from API.
var getMusic = function(tags){
	$.ajax({
		dataType: "jsonp",
		url: '//www.tastekid.com/api/similar?q=' + tags + '&callback=callBackMusic&k=227160-Discover-804XO5GB&verbose=1&type=music&info=1',
		type: "GET",
	})
	return tags;
};
//callback function for the API data thats finds the length of the data and diplays search result number in the counter div
	var callBackMusic = function(query){
		var tagName = query.Similar.Info[0].Name;
		var searchResults = showSearchResults(query.Similar.Results.length, tagName);
		$('.counter').append(searchResults);
		$.each(query.Similar.Results, function(i, item){
			var music = showMusicResults(item);
			$('.results').append(music);
	});	
}
var showSearchResults = function(resultNum, resultName){
	if($("input[name='query']").val() == ""){
		var results = resultNum + ' results for <strong> ' + resultName + ' </strong>';
	}
		else{
			var results = resultNum + ' results for <strong> ' + $("input[name='query']").val(); + ' </strong>';
		}
	return results;
};
// clones search results and results divs, adds attributes, and returns data.
var showMusicResults = function(music) {
	var result = $('.searchResults .result').clone();
	var bandName = result.find('.band-name a');	
	bandName.attr('name', music.Name);
	bandName.attr('href', music.yUrl);
	bandName.attr('description', music.wTeaser);
	bandName.text(music.Name);
	return result;
}
//displays iframe and discription when each link is clicked.
	$(document).on('click', '.band-name a', function(event) {
		$('.band-info').css('background-image', 'none')
		$('.band-info').css('background-color', '#B6B6B6');
		var _url = $(this).attr('href'),
		description = $(this).attr('description'),
		artistName = $(this).attr('name');
		$('#artistName').val(artistName);
		$('.loading').show();
		getLocation();
		// Prevent from opening iframe in new tab
		event.preventDefault();
		$('iframe, h1').css('display', 'block');
		$('band-info, h1').css('background-color', '#1976D2');
		$('.band-info iframe').attr("src", _url);
		$('.band-info h1').html(description);
		$('.band-info h2').html(artistName);
		$('.band-info h2').show();
		$('.band-info a').show();
		$('.band-info a').html("Get Tickets");
		var newBand = $('.band-info').clone()
		return newBand;
	});

/*Function that runs when keyword is entered and search button clicked.
The results and counter classes are cleared and the value typed by user is stored.
*/

	$('.band-name-input').submit(function(e) {
		e.preventDefault();
		//zero out results of a previous search
		$('.results').html('');
		$('.counter').html('');
		// get the value of the tags the user submitted
		var tags = $(this).find("input[name='query']").val();
		getMusic(tags);
		return false;
	}); 
var initMap = function(myLatLng, events) {
	$('.map').show();
	myLatLng = {lat: parseFloat(myLatLng.latitude), lng: parseFloat(myLatLng.longitude)};
    var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: myLatLng
  });
  	clearOverlays();
  for(var i = 0; i <= events.length; i++){
		var event = events[i];
		if(event && event.venue){
			  	var marker = new google.maps.Marker({
			    position: { lat: parseFloat(event.venue.latitude), lng: parseFloat(event.venue.longitude)},
			    map: map,
			    title: event.title
			  });
			  	markers.push(marker);
  		}
  	}		
  			$('.loading').hide();
  			$('.map').show();
}
	function clearOverlays() {
	  for (var i = 0; i < markers.length; i++ ){
	    markers[i].setMap(null);
	  }
	  markers.length = 0;
	}


