
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


// -------Set the max-height of .lbox-box to follow the size of its content---------

    function boxHFix() {

   
            imgH = $("img.blurred-img").height();

            legH = $(".lbox-box figcaption").outerHeight(true); 
                             
            $(".lbox-box").css("max-height", imgH + legH + "px");
         
    }

// ----------------end------------------- //

// ----------------------Lightbox-----------------------

    $(".gallery-grid a").click(function makeLightBox() {


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
        var clickedImgMedium = clickedImgSrc.replace("thumbnails","medium");
        var clickedImgSmall = clickedImgSrc.replace("thumbnails","small");
        var clickedImgXSmall = clickedImgSrc.replace("thumbnails", "xsmall");
        var clickedImgAltTxt = $(this).children().attr('alt');
        var clickedImgCaption = $(this).next('figcaption').contents().clone();



              
        // ------Display blurred/low definition img when loading main img-------
        // $(".lbox-box").css("background-image", "url('" + clickedImgXSmall + "')");

        $(".lbox-box").append("<img class='blurred-img'><figure><img><figcaption></figcaption></figure>");

        $("img.blurred-img").attr("src", clickedImgXSmall);

        $("img.blurred-img").on("load", function() {

            boxHFix();

        });
          
      
        $(".lbox-box figure img").attr("srcset", clickedImgSmall + " 400w, " + clickedImgMedium + " 800w, " + clickedImgBig + " 1920w");
        // $(".lbox-box img").attr("src", clickedImgSmall);
        $(".lbox-box figure img").attr("alt", clickedImgAltTxt);

        $(".lbox-box figure img").attr("sizes", "(min-width: 768px) 80vw, (min-width: 1100px) 62.5vw, (min-width: 3072px) 1920px, 100vw");

        picturefill();
        
        $(".lbox-box figcaption").append(clickedImgCaption);

        

        $(".lbox-box figure img").on("load", function() {

                // throw new Error("Something went badly wrong!");

                // boxHFix();
                $(".lbox-box figure img").css("opacity", "1");
                // $(".lbox-box figcaption").css("opacity", "1");
                // $(".spinner").css("visibility", "hidden");
                // $(".lbox-box").css("background-image", "none");
                
           
        }); 
                        

        }   else { 

                    // VIDEO  

        			// get the link of the clicked video
            	    var clickedVideo = $(this).attr('href');
            		
            	// $(".lightbox-ctnr iframe").attr("src", clickedVideo);

        	}

       
    });

// ----------------end------------------- //

    
    $(window).resize( function () {
      
        boxHFix();
   
    });


// Close the lightbox when clicked over
    $(".lbox-shadow").click(function() {
    // $(".lbox-box figure figcaption").contents().remove();
    $(".lbox-box").contents().remove();
    // $(".lbox-box img.blurred-img-js").remove();
 	$(".lbox-shadow").css("visibility", "hidden");
 	$("html").css("overflow-y", "scroll");
 	$("html").css("width", "100%");
    $(".lbox-box figure img").css("opacity", "0");

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

