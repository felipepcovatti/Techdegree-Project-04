// -----------Global variables------------- //

        var imgW;
        var imgH;
        var imgRatio;
        var legH;

// ----------------end------------------- //

// prevent default behavor in anchors of gallery images and videos //

    $(".gallery-grid a").click(function(event) {
        event.preventDefault();
    });

// ----------------end------------------- //

// Get the size of the browser scrollbar //

	$("body").css("overflow-y", "hidden");
	var bodySizeNoScroll = $('body').outerWidth(true);
	$("body").css("overflow-y", "scroll");
	var bodySizeInScroll = $('body').outerWidth(true);
	var scrollSize = bodySizeNoScroll - bodySizeInScroll;

// ----------------end------------------- //


    function responsiveImg() {

            $(".lbox-box img").addClass("reset-img-js");

            imgW = $(".lbox-box img").width();
            imgH = $(".lbox-box img").height();
            imgRatio = imgW / imgH;
            legH = $(".lbox-box figcaption").outerHeight(true);

            $(".lbox-box img").removeClass("reset-img-js");

            newImgW = $(".lbox-box img").width();
            newImgH = newImgW / imgRatio;
            $(".lbox-ctnr").css("height", newImgH + legH);
            $(".lbox-box img").css("height",  newImgH);

    }





    $(".gallery-grid a").click(function makeLightBox() {


    // Remove scrollbar of page in background
    $("body").css("overflow-y", "hidden");
    // Show lightbox
    $( '.lbox-shadow' ).css("display", "block");
    // Preserve aspect of the page (remove space gained with the removal of the scrollbar)
    $("body").css("width", "calc(100% - " + scrollSize + "px)");


    if ($(this).is("a[href^='img/']")) {

       		// IMAGE

        // get the link of the clicked image
        var clickedImg = $(this).attr('href');

        $(".lbox-box").append("<figure><img><figcaption><h2>TESTING</h2><p>TESTES TES TSETSa asd as as a asasdfa dsfasdf as asdf asdf asdfa sdfasd TSETES</p></figcaption></figure>");           
    	$(".lbox-box img").attr("src", clickedImg);

                responsiveImg();

        $(".lbox-box img").on("load", function() {

            
                responsiveImg();

            
    }); 
                

    } else { 

            // VIDEO  

			// get the link of the clicked video
    	    var clickedVideo = $(this).attr('href');
    		
    	// $(".lightbox-ctnr iframe").attr("src", clickedVideo);


	}

        
});

            $(window).resize( function () {

                

                responsiveImg();

   
            });


// Close the lightbox when clicked over
    $(".lbox-shadow").click(function() {
    $(".lbox-box figure").remove();
 	$(".lbox-shadow").css("display", "none");
 	$("body").css("overflow-y", "scroll");
 	$("body").css("width", "100%");
 });







	// When someone click on the image DONE
	// get the identifier of the image (ex 01, 02) DONE

		// show a new box with the proper image placed DONE

			// obs: this box has to be styles according to the image provided DONE
			// the rest of the page have to be defoused DONE

		// show previus and next button

			// the previos and next button have to work, being able 
			// to add and subtract to the img identifier
			// it also has to disable previous in the fist image and next in the last image

