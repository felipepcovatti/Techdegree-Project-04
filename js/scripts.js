// -----------Some global variables------------- //
var clickedImgBig;
var clickedImgMedium;
var clickedImgSmall;
var clickedImgXSmall;
var clickedImgAltTxt;
var clickedImgCaption;
var currentSrc;
var currentSrcThumb;
var currentLi;
var clickedVidSrc;
var clickedVidCaption;
// ----------------end------------------- //
// ----------------end------------------- //
// Get the size of the browser scrollbar //
$("html").css("overflow-y", "hidden");
var bodySizeNoScroll = $('html').outerWidth(true);
$("html").css("overflow-y", "scroll");
var bodySizeInScroll = $('html').outerWidth(true);
var scrollSize = bodySizeNoScroll - bodySizeInScroll;
// ----------------end------------------- //
// Next & prev functions for img and video
function nextImg() {
    var nextImgSrc = currentLi.nextAll("li.result").first().find('img').attr('src');
    clickedImgBig = nextImgSrc.replace("thumbnails", "big");
    clickedImgMedium = nextImgSrc.replace("thumbnails", "medium");
    clickedImgSmall = nextImgSrc.replace("thumbnails", "small");
    clickedImgXSmall = nextImgSrc.replace("thumbnails", "xsmall");
    clickedImgAltTxt = currentLi.nextAll("li.result").first().find('img').attr('alt');
    clickedImgCaption = currentLi.nextAll("li.result").first().find('figcaption').contents().clone();
}

function nextVid() {
    var nextVidSrc = currentLi.nextAll("li.result").first().find('iframe').attr('src');
    clickedVidSrc = nextVidSrc;
    clickedVidCaption = currentLi.nextAll("li.result").first().find('figcaption').contents().clone();
}

function prevImg() {
    var prevImgSrc = currentLi.prevAll('li.result').first().find('img').attr('src');
    clickedImgBig = prevImgSrc.replace("thumbnails", "big");
    clickedImgMedium = prevImgSrc.replace("thumbnails", "medium");
    clickedImgSmall = prevImgSrc.replace("thumbnails", "small");
    clickedImgXSmall = prevImgSrc.replace("thumbnails", "xsmall");
    clickedImgAltTxt = currentLi.prevAll("li.result").first().find('img').attr('alt');
    clickedImgCaption = currentLi.prevAll("li.result").first().find('figcaption').contents().clone();
}

function prevVid() {
    var prevVidSrc = currentLi.prevAll("li.result").first().find('iframe').attr('src');
    clickedVidSrc = prevVidSrc;
    clickedVidCaption = currentLi.prevAll("li.result").first().find('figcaption').contents().clone();
}
// -----------end--------
// ----Set/apply the proper img/video src to the lightbox---
function setImgSrc() {
    // hide img untill fully loaded
    $(".lbox-box figure img").css("opacity", "0");
    // display blurred img meanwhile
    $("img.blurred-img").attr("src", clickedImgXSmall);
    // hide caption untill blurred img is loaded
    $(".lbox-box figure figcaption").css("opacity", "0");
    $("img.blurred-img").on("load", boxHFix);
    // set img attributes
    $(".lbox-box figure img").attr("srcset", clickedImgSmall + " 400w, " + clickedImgMedium + " 800w, " + clickedImgBig + " 1920w");
    $(".lbox-box figure img").attr("alt", clickedImgAltTxt);
    $(".lbox-box figure img").attr("sizes", "(min-width: 768px) 80vw, (min-width: 1100px) 62.5vw, (min-width: 3072px) 1920px, 100vw");
    picturefill();
    $(".lbox-box figcaption").contents().remove();
    $(".lbox-box figcaption").append(clickedImgCaption);
    // Show img after load
    $(".lbox-box figure img").on("load", function() {
        $(".lbox-box figure img").css("opacity", "1");
    });
}

function setVidSrc() {
    $(".lbox-box figure iframe").attr("src", clickedVidSrc);
    $(".lbox-box figcaption").contents().remove();
    $(".lbox-box figcaption").append(clickedVidCaption);
    videoHFix();
}
// ----------------end------------------- //
// -------Get and set some height sizes---------
function boxHFix() {
    var imgH = $("img.blurred-img").height();
    var legH = $(".lbox-box figcaption").outerHeight(true);
    // Set the max-height of .lbox-box to follow the size of its content
    $(".lbox-box").css("max-height", imgH + legH + "px");
    // Set main img height beforehand so the caption goes to the right place faster
    $(".lbox-box figure img").css("height", imgH + "px");
    // Show caption
    $(".lbox-box figure figcaption").css("opacity", "1");
    // Set prev and next clickable area
    $(".prev-div, .next-div").css('height', imgH + 'px');
    $(".prev-div, .next-div").css({
        'height': imgH + 'px',
        'top': 0
    });
}

function videoHFix() {
    var vidW = $(".lbox-box iframe").width();
    var vidH = vidW / 1.777;
    var legH = $(".lbox-box figcaption").outerHeight(true);
    $(".lbox-box").css("max-height", vidH + legH + "px");
    $(".lbox-box iframe").css("height", vidH + "px");
    // Set prev and next clickable area
    $(".prev-div, .next-div").css({
        'height': (vidH / 2) + 'px',
        'top': (vidH / 4) + 'px'
    });
}
// ----------------end------------------- //
// go to next img/video function
function goToNext() {
    var mediaType = $(".lbox-box figure").contents().first();
    if ($(mediaType).is('img')) {
        currentSrc = $(".lbox-box img.blurred-img").attr('src');
        currentSrcThumb = currentSrc.replace('xsmall', 'thumbnails');
        currentLi = $(".gallery-grid img[src='" + currentSrcThumb + "']").parents('li');
        var nextMediaType = currentLi.nextAll('li.result').first().find('div').children();
        if ($(nextMediaType).is('img')) {
            nextImg();
            setImgSrc();
        }
        if ($(nextMediaType).is('iframe')) {
            $('.lbox-box figure img').replaceWith('<iframe></iframe>');
            $('img.blurred-img').remove();
            nextVid();
            setVidSrc();
        }
    }
    if ($(mediaType).is('iframe')) {
        currentSrc = $(".lbox-box figure iframe").attr('src');
        currentLi = $(".gallery-grid iframe[src='" + currentSrc + "']").parents('li');
        var nextMediaType = currentLi.nextAll('li.result').first().find('div').children();
        if ($(nextMediaType).is('iframe')) {
            nextVid();
            setVidSrc();
        }
        if ($(nextMediaType).is('img')) {
            $('.lbox-box figure iframe').replaceWith('<img>');
            $(".lbox-box").prepend("<img class='blurred-img'>");
            nextImg();
            setImgSrc();
        }
    }
    if ($(currentLi).nextAll("li.result").length == 1) {
        $(".next-div").css('visibility', 'hidden');
    }
    $(".prev-div").css('visibility', 'visible');
}
// -----end-----------
// go to prev img/video function
function goToPrev() {
    var mediaType = $(".lbox-box figure").contents().first();
    if ($(mediaType).is('img')) {
        currentSrc = $(".lbox-box img.blurred-img").attr('src');
        currentSrcThumb = currentSrc.replace('xsmall', 'thumbnails');
        currentLi = $(".gallery-grid img[src='" + currentSrcThumb + "']").parents('li');
        var prevMediaType = currentLi.prevAll('li.result').first().find('div').children();
        if ($(prevMediaType).is('img')) {
            prevImg();
            setImgSrc();
        }
        if ($(prevMediaType).is('iframe')) {
            $('.lbox-box figure img').replaceWith('<iframe></iframe>');
            $('img.blurred-img').remove();
            prevVid();
            setVidSrc();
        }
    }
    if ($(mediaType).is('iframe')) {
        currentSrc = $(".lbox-box figure iframe").attr('src');
        currentLi = $(".gallery-grid iframe[src='" + currentSrc + "']").parents('li');
        var prevMediaType = currentLi.prevAll('li.result').first().find('div').children();
        if ($(prevMediaType).is('iframe')) {
            prevVid();
            setVidSrc();
        }
        if ($(prevMediaType).is('img')) {
            $('.lbox-box figure iframe').replaceWith('<img>');
            $(".lbox-box").prepend("<img class='blurred-img'>");
            prevImg();
            setImgSrc();
        }
    }
    if ($(currentLi).prevAll("li.result").length == 1) {
        $(".prev-div").css('visibility', 'hidden');
    }
    $(".next-div").css('visibility', 'visible');
}
// -----end-----------
// close light box function------
function closeLightBox() {
    $(".lbox-box").contents().remove();
    $(".close-btn").css("visibility", "hidden");
    $(".lbox-shadow").css("visibility", "hidden");
    $("html").css("overflow-y", "scroll");
    $("html").css("width", "100%");
}
// -------end------
// ----------------------Lightbox-----------------------
$(".gallery-grid div").click(function makeLightBox() {
    // Remove scrollbar of page in background
    $("html").css("overflow-y", "hidden");
    // Show lightbox
    $('.lbox-shadow').css("visibility", "visible");
    $(".close-btn").css("visibility", "visible");
    // Preserve aspect of the page (remove space gained with the removal of the scrollbar)
    $("html").css("width", "calc(100% - " + scrollSize + "px)");
    if ($(this).children().is("img")) {
        // IMAGE
        // get the link of the clicked image
        var clickedImgSrc = $(this).children().attr('src');
        clickedImgBig = clickedImgSrc.replace("thumbnails", "big");
        clickedImgMedium = clickedImgSrc.replace("thumbnails", "medium");
        clickedImgSmall = clickedImgSrc.replace("thumbnails", "small");
        clickedImgXSmall = clickedImgSrc.replace("thumbnails", "xsmall");
        clickedImgAltTxt = $(this).children().attr('alt');
        clickedImgCaption = $(this).next('figcaption').contents().clone();
        $(".lbox-box").append("<img class='blurred-img'><figure><img><figcaption></figcaption><div class='prev-div'><div class='prev-btn'></div></div><div class='next-div'><div class='next-btn'></div></div></figure>");
        setImgSrc();
    } else {
        // VIDEO  
        // get the link of the clicked video
        clickedVidSrc = $(this).children().attr('src');
        clickedVidCaption = $(this).next('figcaption').contents().clone();
        $(".lbox-box").contents().remove();
        $(".lbox-box").append("<figure><iframe></iframe><figcaption></figcaption><div class='prev-div'><div class='prev-btn'></div></div><div class='next-div'><div class='next-btn'></div></div></figure>");
        setVidSrc();
    }
    // Visibility of arrows
    if ($(this).parents('li').nextAll('li.result').length == 0) {
        $(".next-div").css('visibility', 'hidden');
    } else {
        $(".next-div").css('visibility', 'visible');
    }
    if ($(this).parents('li').prevAll('li.result').length == 0) {
        $(".prev-div").css('visibility', 'hidden');
    } else {
        $(".prev-div").css('visibility', 'visible');
    }
});
// ----------------end------------------- //
// --------Reresh boxH when resize------------ 
$(window).resize(function() {
    var mediaType = $(".lbox-box figure").contents().first();
    if ($(mediaType).is('img')) {
        boxHFix();
    }
    if ($(mediaType).is('iframe')) {
        videoHFix();
    }
});
// -----------end------
$(".lbox-shadow").click(function(e) {
    var target = $(e.target);
    if (target.is('.next-div, .next-btn, img')) {
        goToNext();
    }
    if (target.is('.prev-div, .prev-btn')) {
        goToPrev();
    }
    if (target.is('.lbox-shadow, .close-btn')) {
        closeLightBox();
    }
});
// -------Key events------------
$(document).keyup(function(e) {
    if (e.keyCode == 27) {
        closeLightBox();
    }
    if (e.keyCode == 39) {
        goToNext();
    }
    if (e.keyCode == 37) {
        goToPrev();
    }
});
// Search engine
// Case insensitive 
$.expr[":"].contains = $.expr.createPseudo(function(arg) {
    return function(elem) {
        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});
$(".gallery-grid li").addClass("result");
$('input').keyup(function() {
    $(".gallery-grid li").css('opacity', '0');
    var inputTxt = $('input').val();
    $(".gallery-grid li").removeClass("result");
    setTimeout(function() {
        $(".gallery-grid figcaption:contains(" + inputTxt + ")").parents('li').show().addClass("result");
        $(".gallery-grid figcaption:not(:contains(" + inputTxt + "))").parents('li').hide().removeClass("result");
        $(".gallery-grid li").css('opacity', '1');
    }, 200);
});