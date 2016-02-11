'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	$('#colorBtn').click(randomizeColors);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);

	$.get("/project/" + idNumber , projectCallback);

	console.log("User clicked on project " + idNumber);
}

function projectCallback( result ){
	var projectHTML =
	'<div class="thumbnail">' +
					'<img src="'+ result['image'] + '" alt="Lorem Pixel image" class="img">'+
					'<p>'+ result['title'] +'</p>'+
					'<p><small>' + result['date'] + '</small></p></a>'+
				'<div class="details">'+ result['summary'] +'</div>'+
	'</div>'

	var id = "" + result['id'];
	console.log(id);

	$('#project' + result['id']).html(projectHTML);


	console.log( result );
}


/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
	console.log("User clicked on color button");
	$.get("/palette/" , colorCallback);

}

function colorCallback(result){
	console.log("WAS IT PRESSED");
	var dummy = result['colors'];
	var colors = dummy['hex'];
	console.log(result);

	$('body').css('background-color', colors[0]);
$('.thumbnail').css('background-color', colors[1]);
$('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
$('p').css('color', colors[3]);
$('.project img').css('opacity', .75);
}