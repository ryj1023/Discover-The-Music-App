
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
	var searchResults = showSearchResults(query.Similar.Results.length);
	$('.counter').append(searchResults);
	$.each(query.Similar.Results, function(i, item){
		var music = showMusicResults(item);
		$('.results').append(music);
	});	
}
var showSearchResults = function(resultNum){
	var results = resultNum + ' results for <strong> ' + $("input[name='query']").val(); + ' </strong>';
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
		var _url = $(this).attr('href'),
			description = $(this).attr('description');			
		// Prevent from opening iframe in new tab
		event.preventDefault();
		$('iframe, h1').css('display', 'block');
		$('band-info, h1').css('background-color', '#1976D2');
		$('.band-info iframe').attr("src", _url);
		$('.band-info h1').html(description);
		var newBand = $('.band-info').clone()
		return newBand;
});

/*Function that runs when keyword is entered and search button clicked.
The results and counter classes are cleared and the value typed by user is stored.
*/
$(function(){
	$('.band-name-input').submit(function(e) {
		e.preventDefault();
		//zero out results of a previous search
		$('.results').html('');
		$('.counter').html('');
		// get the value of the tags the user submitted
		var tags = $(this).find("input[name='query']").val();
		getMusic(tags);
	});

}) 


