$(document).ready( function() {

	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });

/*---------------------------------------------------------------------
  Show or fade mobile menu
-----------------------------------------------------------------------*/	
	$(".main_nav__btn").on("click", function() {
		if( $(".main_nav__ul").hasClass("main_nav__ul_hover") ) {
			$(".main_nav__ul").removeClass("main_nav__ul_hover");
			$(".main_nav__btn").removeClass("main_nav__btn_hover");
		} else {
			$(".main_nav__ul").addClass("main_nav__ul_hover");
			$(".main_nav__btn").addClass("main_nav__btn_hover");
		}
	});

	$("header").css("height", $(window).height());

/*---------------------------------------------------------------------
  Animate page scrolling on menu's item click
-----------------------------------------------------------------------*/	
	$(".scroll_href").on("click", ".scroll_page", function(event) {
		 event.preventDefault();
		 var id = $(this).attr("href"),
         top = $(id).offset().top;
         $("html, body").animate({
			       scrollTop: top
		     }, 1000);
	});
  $(".footer__btn_up").on("click", function() {
  	$("html, body").animate({
			       scrollTop: 0
		     }, 1000);
  })
	/*---------------------------------------------------------------------
  Highlight item of the menu while scrolling a page
-----------------------------------------------------------------------*/	
  var $sections = $("section"),
      $navLink = $("#wrap_nav a");
    
  $sections.waypoint ({
    handler: function(event, direction) {
    	var $activeSection = $(this),
    	    $activeLink; 

      if (direction == "up") {
      	$activeSection = $activeSection.prev();
      }

      if(!$activeSection.attr("id")) {
        $activeLink = $('#wrap_nav a[href="#home"]');
      } else {
        $activeLink = $('#wrap_nav a[href="#' + $activeSection.attr("id") + '"]');
      }

      $navLink.parent().removeClass("current");
      $activeLink.parent().addClass("current");
      $activeLink.parent().focus();
    },
    offset: "35%"
  });

/*---------------------------------------------------------------------
  The main menu fadeIn or fadeOut depending on scrollTop and window width
-----------------------------------------------------------------------*/	
	$(window).scroll( function() {
	  var y = $(window).scrollTop(),
	      windowH = $(window).height(),
	      windowW = $(window).width();
		if( (y > windowH * 0.2) && (y < windowH) && (windowW >= 768) ) {
		  $(".main_nav").fadeOut("fast");
		} else {
		  $(".main_nav").fadeIn("fast");
		}

		changeBgMenu();
  });
 
  changeIconMail();

  /*---------------------------------------------------------------------
  Modal window call and configuration
-----------------------------------------------------------------------*/	
  $("#modal_wind").on("click", function() {
  	var that = $(this);
    setTimeout(function() {
      if(!that.hasClass("in")){
        that.find("img").attr("src", "");
      }
    }, 200);
  });

  $(".some_work").on("click", "li", function(e) {
  	var src = $(this).attr("data-src");
  	$("#modal_wind img").attr("src", src);
  });

  $(".link-site").on("click", function(e){
  	e.stopPropagation();
  });
/*---------------------------------------------------------------------
  Check the input fields of the form
-----------------------------------------------------------------------*/	
	$('#contactForm').validate({
		// Rules for fields' validation
		rules:{
			"name":{required:true},
			"mail":{required:true, email:true},
			"message":{required:true},
		},
	});
});

$(window).resize(function() {
	$("header").css("height", $(window).height());
  
  changeBgMenu();
});

$(window).load( function() {
	$(".loader_inner").fadeOut();
	$(".loader").delay(400).fadeOut("slow");
	changeBgMenu();

});
/*----------------------------------------------------------
  Change css style (bg-color) of element ".main_nav" 
  depending on window width and scrollTop.
------------------------------------------------------------*/
function changeBgMenu() {
  var $width = $(window).width(),
  	  $height = $(window).height(),
  	  $y = $(window).scrollTop();
  if( ($width < 768) || ($y < 0.2 * $height) ) {
    $(".main_nav").css("background-color","transparent");
  }
  else {
    $(".main_nav").css("background-color","rgba(31, 32, 36, 0.8)");
  }
}

/*----------------------------------------------------------
Change the icon of a menu depending on a date.
----------------------------------------------------------*/
function changeIconMail() {
	var date = new Date(),
	    month = date.getMonth(),
	    day = date.getDate();
	if( ((month == 11)&&(day > 10)) || ((month == 0)&&(day < 14)) ){
    $(".contacts__icon_mail").removeClass("contact__tradition_icon");
    $(".contacts__icon_mail").addClass("contact__selebrate_icon");
	}
}

