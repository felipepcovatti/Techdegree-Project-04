/*! picturefill - v3.0.2 - 2016-02-12
 * https://scottjehl.github.io/picturefill/
 * Copyright (c) 2016 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT
 */



// -----------Global variables------------- //

        var imgW;
        var imgH;
        var imgRatio;
        var legH;
        var winH;

// ----------------end------------------- //













// prevent default behavor in anchors of gallery images and videos //

    $(".gallery-grid a").click(function(event) {
        event.preventDefault();
    });

// ----------------end------------------- //

// Get the size of the browser scrollbar //

	$("html").css("overflow-y", "hidden");
	var bodySizeNoScroll = $('html').outerWidth(true);
	$("html").css("overflow-y", "scroll");
	var bodySizeInScroll = $('html').outerWidth(true);
	var scrollSize = bodySizeNoScroll - bodySizeInScroll;

// ----------------end------------------- //




// -------Responsive img function---------

    function boxFix() {


            // $(".lbox-box img").addClass("reset-img-js");

            // imgW = $(".lbox-box img").width();
            // imgH = $(".lbox-box img").height();
            // imgRatio = imgW / imgH;
            

            // $(".lbox-box img").removeClass("reset-img-js");

            legH = $(".lbox-box figcaption").outerHeight(true);

            // newImgW = $(".lbox-box img").width();
            // newImgH = newImgW / imgRatio;
            // imgW = $(".lbox-box img").width();
            imgH = $(".lbox-box img").height();
      
            // $(".lbox-ctnr").css("min-height", newImgH + legH + "px");


            // $(".lbox-box img").css("height",  newImgH + "px");

            $(".lbox-box").css("max-height", imgH + legH + "px");


         

    

    }




    $(".gallery-grid a").click(function makeLightBox() {


    // $(".spinner").css("display", "block");

    // Remove scrollbar of page in background
    $("html").css("overflow-y", "hidden");
    // Show lightbox
    $( '.lbox-shadow' ).css("visibility", "visible");
    // Preserve aspect of the page (remove space gained with the removal of the scrollbar)
    $("html").css("width", "calc(100% - " + scrollSize + "px)");


    if ($(this).children().is("img")) {

       		// IMAGE

        // get the link of the clicked image
        var clickedImgSrc = $(this).children().attr('src');
        var clickedImgBig = clickedImgSrc.replace("thumbnails","big");
        var clickedImgSmall = clickedImgSrc.replace("thumbnails","small");
        var clickedImgXSmall = clickedImgSrc.replace("thumbnails", "xsmall");
        var clickedImgAltTxt = $(this).children().attr('alt');
        var clickedImgCaption = $(this).next('figcaption').contents().clone();
        // alert(clickedImgCaption);



                

        
        $(".lbox-box").css("background-image", "url('" + clickedImgXSmall + "')");
        $(".lbox-box").append("<figure><img><figcaption></figcaption></figure>");
          
    	



        $(".lbox-box img").attr("srcset", clickedImgSmall + " 400w, " + clickedImgBig + " 1920w");
        $(".lbox-box img").attr("src", clickedImgSmall);
        $(".lbox-box img").attr("alt", clickedImgAltTxt);
        $(".lbox-box img").attr("sizes", "(min-width: 768px) 80vw, (min-width: 1100px) 62.5vw, (min-width: 3072px) 1920px, 100vw");

        

        $(".lbox-box figcaption").append(clickedImgCaption); 
 


      

        $(".lbox-box img").on("load", function() {

 

                $(".lbox-box img").css("opacity", "1");
                // $(".lbox-box figcaption").css("opacity", "1");
                // $(".spinner").css("visibility", "hidden");
                // $(".lbox-box").css("background-image", "none");
                boxFix();
                picturefill();
               

            
    }); 
                

    } else { 

            // VIDEO  

			// get the link of the clicked video
    	    var clickedVideo = $(this).attr('href');
    		
    	// $(".lightbox-ctnr iframe").attr("src", clickedVideo);


	}

   


});

            $(window).resize( function () {

                

                boxFix();
      
   
            });


// Close the lightbox when clicked over
    $(".lbox-shadow").click(function() {
    $(".lbox-box figure figcaption").contents().remove();
    $(".lbox-box figure").remove();
 	$(".lbox-shadow").css("visibility", "hidden");
 	$("html").css("overflow-y", "scroll");
 	$("html").css("width", "100%");
    $(".lbox-box img").css("opacity", "0");
    // $(".lbox-box figcaption").css("opacity", "0");
    // $(".spinner").css("visibility", "visible");
    // $(".spinner").css("display", "none");



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

