// prevent default behavor in anchors of gallery images and videos
$(".gallery-grid a").click(function(event) {
    event.preventDefault();
});

// Get the size of the browser scrollbar
	$("body").css("overflow-y", "hidden");
	var bodySizeNoScroll = $('body').outerWidth(true);
	$("body").css("overflow-y", "scroll");
	var bodySizeInScroll = $('body').outerWidth(true);
	var scrollSize = bodySizeNoScroll - bodySizeInScroll;
// end
            

    // ---------------TESTE---------------

//             function getImgRatio() {

//                 var imgWt = $(".img-place").outerWidth(true);
//                 var imgHt = $(".img-place").outerHeight(true);
//                 var imgRatiot = imgWt / imgHt;
//                 alert(imgRatiot);
                           
//             }
        
//         $(".gallery-grid a").click(function makeImgPlace() {

//             var imgHref = $(this).attr('href');

//             $("body").append("<img class='img-place'>");
               
//             $(".img-place").attr("src", imgHref);
         

//             $(".img-place").on("load", function() {


//                 getImgRatio();
    
//                 $(".img-place").remove();
         

//             }); 
         
       

// });





// ----------------------------------------

    function responsiveImg() {


        $(".lightbox-ctnr img").addClass("reset-img-js");
        var imgW = $(".lightbox-ctnr img").outerWidth(true);
        var imgH = $(".lightbox-ctnr img").outerHeight(true);
        var imgRatio = imgW / imgH;
        var winH = $(window).height();
        var figcapH = $(".lightbox-ctnr figcaption").outerHeight(true);
        $(".lightbox-ctnr img").css("max-height", winH - figcapH + "px");
        $(".lightbox-ctnr img").css("max-width", imgRatio * (winH - figcapH) + "px");
        $(".lightbox-ctnr img").removeClass("reset-img-js");


 }





$(".gallery-grid a").click(function makeLightBox() {



    // Remove scrollbar of page in background
    $("body").css("overflow-y", "hidden");
    // Show lightbox-ctnr
    $( '.lightbox-ctnr' ).css("display", "flex");
    // Preserve aspect of the page (remove space gained with the removal of the scrollbar)
    $("body").css("width", "calc(100% - " + scrollSize + "px)");

    if ($(this).is("a[href^='img/']")) {

       		// IMAGE

            // get the link of the clicked image
            var clickedImg = $(this).attr('href');

        $(".lightbox-ctnr .lightbox-box").append("<figure><img><figcaption><p>TESTES TES TSETSa asd as as a asasdfa dsfasdf as asdf asdf asdfa sdfasd TSETES</p></figcaption></figure>");           
    	$(".lightbox-ctnr img").attr("src", clickedImg);
        $(".lightbox-ctnr img").on("load", function() {

            responsiveImg();
    }); 
                
      

    } else { 

            // VIDEO  

			// get the link of the clicked video
    	    var clickedVideo = $(this).attr('href');

    		

    	$(".lightbox-ctnr iframe").attr("src", clickedVideo);


	}

        
});


            $(window).resize( function () {

                 responsiveImg();
   
            });



// Close the lightbox when clicked over
 $(".lightbox-ctnr").click(function() {
    $(".lightbox-ctnr figure").remove();
 	$(".lightbox-ctnr").css("display", "none");
 	$("body").css("overflow-y", "scroll");
 	$("body").css("width", "100%");
 });





// var boxWidth = $(".lightbox-box").children().width(); 
// var boxHeight = $(".lightbox-box").children().height();
// var boxAspectRatio = (boxWidth/boxHeight);


// function rspImg()	{

// 	$(".lightbox-box").css("max-width", 100 * boxAspectRatio + "px");
// 	// $(".lightbox-box").css("max-width","50px");
// }

// rspImg();





	// When someone click on the image
	// get the identifier of the image (ex 01, 02)

		// show a new box with the proper image placed

			// obs: this box has to be styles according to the image provided
			// the rest of the page have to be defoused

		// show previus and next button

			// the previos and next button have to work, being able 
			// to add and subtract to the img identifier
			// it also has to disable previous in the fist image and next in the last image

