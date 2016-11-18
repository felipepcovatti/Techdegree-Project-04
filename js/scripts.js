

 	// prevent default behavor in anchors of gallery images
$("a[href^='img/'],a[href^='https://www.youtube.com']").click(function(event){
    event.preventDefault();
});



	// get the link of the clicked image


$("a[href^='img/']").click(function() {
   	var clickedImg = $(this).attr('href');
    $( '.lightbox-ctnr' ).css("display", "flex");
    $(".lightbox-ctnr img").attr("src", clickedImg);
 });

 $(".lightbox-ctnr").click(function() {
 	$(".lightbox-ctnr").css("display", "none");
 });






	// When someone click on the image
	// get the identifier of the image (ex 01, 02)

		// show a new box with the proper image placed

			// obs: this box has to be styles according to the image provided
			// the rest of the page have to be defoused

		// show previus and next button

			// the previos and next button have to work, being able 
			// to add and subtract to the img identifier
			// it also has to disable previous in the fist image and next in the last image

