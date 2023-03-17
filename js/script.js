/**
 * Global variables
 */
"use strict";

var userAgent = navigator.userAgent.toLowerCase(),
    initialDate = new Date(),

    $document = $(document),
    $window = $(window),
    $html = $("html"),

    isDesktop = $html.hasClass("desktop"),
    isNoviBuilder = window.xMode,
     windowReady = false,
    isIE = userAgent.indexOf("msie") != -1 ? parseInt(userAgent.split("msie")[1]) : userAgent.indexOf("trident") != -1 ? 11 : userAgent.indexOf("edge") != -1 ? 12 : false,
    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isTouch = "ontouchstart" in window,

    plugins = {
      pointerEvents: isIE < 11 ? "js/pointer-events.min.js" : false,
      bootstrapTooltip: $("[data-toggle='tooltip']"),
      bootstrapModalDialog: $('.modal'),
      bootstrapTabs: $(".tabs-custom"),
      copyrightYear:           $( '.copyright-year' ),
      rdNavbar: $(".rd-navbar"),
      materialParallax:        $( '.parallax-container' ),
      maps:                    $( '.google-map-container' ),
      rdMailForm: $(".rd-mailform"),
      rdInputLabel: $(".form-label"),
      regula: $("[data-constraints]"),
      owl: $(".owl-carousel"),
      swiper: $(".swiper-slider"),
      search: $(".rd-search"),
      searchResults: $('.rd-search-results'),
      statefulButton: $('.btn-stateful'),
      popover: $('[data-toggle="popover"]'),
      viewAnimate: $('.view-animate'),
      lightGallery:            $( '[data-lightgallery="group"]' ),
      lightGalleryItem:        $( '[data-lightgallery="item"]' ),
      lightDynamicGalleryItem: $( '[data-lightgallery="dynamic"]' ),
      radio: $("input[type='radio']"),
      checkbox: $("input[type='checkbox']"),
      customToggle: $("[data-custom-toggle]"),
      counter: $(".counter"),
      progressLinear: $(".progress-linear"),
      circleProgress: $(".progress-bar-circle"),
      dateCountdown: $('.DateCountdown'),
      preloader:               $( '.preloader' ),
      rdAudioPlayer: $(".rd-audio"),
      rdVideoBG: $(".rd-video"),
      mojsIconEffect: $('.mojs-icon-effect'),
      customParallax: $(".custom-parallax"),
      slick: $('.slick-slider')
    };

  /**
   * @desc Check the element was been scrolled into the view
   * @param {object} elem - jQuery object
   * @return {boolean}
   */
  function isScrolledIntoView ( elem ) {
    if ( isNoviBuilder ) return true;
    return elem.offset().top + elem.outerHeight() >= $window.scrollTop() && elem.offset().top <= $window.scrollTop() + $window.height();
  }

  /**
   * @desc Calls a function when element has been scrolled into the view
   * @param {object} element - jQuery object
   * @param {function} func - init function
   */
  function lazyInit( element, func ) {
    var scrollHandler = function () {
      if ( ( !element.hasClass( 'lazy-loaded' ) && ( isScrolledIntoView( element ) ) ) ) {
        func.call();
        element.addClass( 'lazy-loaded' );
      }
    };

    scrollHandler();
    $window.on( 'scroll', scrollHandler );
  }

  $window.on('load', function () {

    if (plugins.preloader.length && !isNoviBuilder) {
      pageTransition({
        target: document.querySelector( '.page' ),
        delay: 0,
        duration: 500,
        classIn: 'fadeIn',
        classOut: 'fadeOut',
        classActive: 'animated',
        conditions: function (event, link) {
          return link && !/(\#|javascript:void\(0\)|callto:|tel:|mailto:|:\/\/)/.test(link) && !event.currentTarget.hasAttribute('data-lightgallery');
        },
        onTransitionStart: function ( options ) {
          setTimeout( function () {
            plugins.preloader.removeClass('loaded');
          }, options.duration * .75 );
        },
        onReady: function () {
          plugins.preloader.addClass('loaded');
          windowReady = true;
        }
      });
    }
// TimeCircles
    if (plugins.dateCountdown.length) {
      for ( var i = 0; i < plugins.dateCountdown.length; i++ ) {
        var
          dateCountdownItem = $( plugins.dateCountdown[ i ] ),
          countdownRender = function () {
            dateCountdownItem.TimeCircles( {
              time: { Seconds: { show: !( window.innerWidth < 768 ), } }
            } ).rebuild();
          };

        dateCountdownItem.TimeCircles( {
          color: dateCountdownItem.attr( "data-color" ) ? dateCountdownItem.attr( "data-color" ) : "rgba(247, 247, 247, 1)",
          animation: "smooth",
          bg_width: dateCountdownItem.attr( "data-bg-width" ) ? dateCountdownItem.attr( "data-bg-width" ) : 0.6,
          circle_bg_color: dateCountdownItem.attr( "data-bg" ) ? dateCountdownItem.attr( "data-bg" ) : "rgba(0, 0, 0, 1)",
          fg_width: dateCountdownItem.attr( "data-width" ) ? dateCountdownItem.attr( "data-width" ) : 0.03,
          time: {
            Days: {
              text: "Days",
              show: true,
              color: dateCountdownItem.attr( "data-color" ) ? dateCountdownItem.attr( "data-color" ) : "#f9f9f9"
            },
            Hours: {
              text: "Hours",
              show: true,
              color: dateCountdownItem.attr( "data-color" ) ? dateCountdownItem.attr( "data-color" ) : "#f9f9f9"
            },
            Minutes: {
              text: "Minutes",
              show: true,
              color: dateCountdownItem.attr( "data-color" ) ? dateCountdownItem.attr( "data-color" ) : "#f9f9f9"
            },
            Seconds: {
              text: "Seconds",
              show: false,
              color: dateCountdownItem.attr( "data-color" ) ? dateCountdownItem.attr( "data-color" ) : "#f9f9f9"
            }
          }
        } );

        countdownRender();
        window.addEventListener( 'resize', countdownRender );
      }
    }


  })

/**
 * Initialize All Scripts
 */
$document.ready(function () {

  /**
   * getSwiperHeight
   * @description  calculate the height of swiper slider basing on data attr
   */
  function getSwiperHeight(object, attr) {
    var val = object.attr("data-" + attr),
        dim;

    if (!val) {
      return undefined;
    }

    dim = val.match(/(px)|(%)|(vh)$/i);

    if (dim.length) {
      switch (dim[0]) {
        case "px":
          return parseFloat(val);
        case "vh":
          return $(window).height() * (parseFloat(val) / 100);
        case "%":
          return object.width() * (parseFloat(val) / 100);
      }
    } else {
      return undefined;
    }
  }

  /**
   * toggleSwiperInnerVideos
   * @description  toggle swiper videos on active slides
   */
  function toggleSwiperInnerVideos(swiper) {
    var prevSlide = $(swiper.slides[swiper.previousIndex]),
        nextSlide = $(swiper.slides[swiper.activeIndex]),
        videos;

    prevSlide.find("video").each(function () {
      this.pause();
    });

    videos = nextSlide.find("video");
    if (videos.length) {
      videos.get(0).play();
    }
  }

  /**
   * toggleSwiperCaptionAnimation
   * @description  toggle swiper animations on active slides
   */
  function toggleSwiperCaptionAnimation(swiper) {
    var prevSlide = $(swiper.container),
        nextSlide = $(swiper.slides[swiper.activeIndex]);

    prevSlide
        .find("[data-caption-animate]")
        .each(function () {
          var $this = $(this);
          $this
              .removeClass("animated")
              .removeClass($this.attr("data-caption-animate"))
              .addClass("not-animated");
        });

    nextSlide
        .find("[data-caption-animate]")
        .each(function () {
          var $this = $(this),
              delay = $this.attr("data-caption-delay");


          if (!isNoviBuilder) {
            setTimeout(function () {
              $this
                  .removeClass("not-animated")
                  .addClass($this.attr("data-caption-animate"))
                  .addClass("animated");
            }, delay ? parseInt(delay) : 0);
          } else {
            $this
                .removeClass("not-animated")
          }
        });
  }

  /**
   * makeParallax
   * @description  create swiper parallax scrolling effect
   */
  function makeParallax(el, speed, wrapper, prevScroll) {
    var scrollY = window.scrollY || window.pageYOffset;

    if (prevScroll != scrollY) {
      prevScroll = scrollY;
      el.addClass('no-transition');
      el[0].style['transform'] = 'translate3d(0,' + -scrollY * (1 - speed) + 'px,0)';
      el.height();
      el.removeClass('no-transition');

      if (el.attr('data-fade') === 'true') {
        var bound = el[0].getBoundingClientRect(),
          offsetTop = bound.top * 2 + scrollY,
          sceneHeight = wrapper.outerHeight(),
          sceneDevider = wrapper.offset().top + sceneHeight / 2.0,
          layerDevider = offsetTop + el.outerHeight() / 2.0,
          pos = sceneHeight / 6.0,
          opacity;


        if (sceneDevider + pos > layerDevider && sceneDevider - pos < layerDevider) {
          el[0].style["opacity"] = 1;
        } else {
          if (sceneDevider - pos < layerDevider) {
            opacity = 1 + ((sceneDevider + pos - layerDevider) / sceneHeight / 3.0 * 5);
          } else {
            opacity = 1 - ((sceneDevider - pos - layerDevider) / sceneHeight / 3.0 * 5);
          }
          el[0].style["opacity"] = opacity < 0 ? 0 : opacity > 1 ? 1 : opacity.toFixed(2);
        }
      }
    }

    requestAnimationFrame(function () {
      makeParallax(el, speed, wrapper, prevScroll);
    });
  }


  /**
   * @desc Initialize the gallery with set of images
   * @param {object} itemsToInit - jQuery object
   * @param {string} [addClass] - additional gallery class
   */
  function initLightGallery ( itemsToInit, addClass ) {
    if ( !isNoviBuilder ) {
      $( itemsToInit ).lightGallery( {
        thumbnail: $( itemsToInit ).attr( "data-lg-thumbnail" ) !== "false",
        selector: "[data-lightgallery='item']",
        autoplay: $( itemsToInit ).attr( "data-lg-autoplay" ) === "true",
        pause: parseInt( $( itemsToInit ).attr( "data-lg-autoplay-delay" ) ) || 5000,
        addClass: addClass,
        mode: $( itemsToInit ).attr( "data-lg-animation" ) || "lg-slide",
        loop: $( itemsToInit ).attr( "data-lg-loop" ) !== "false"
      } );
    }
  }

  /**
   * @desc Initialize the gallery with dynamic addition of images
   * @param {object} itemsToInit - jQuery object
   * @param {string} [addClass] - additional gallery class
   */
  function initDynamicLightGallery ( itemsToInit, addClass ) {
    if ( !isNoviBuilder ) {
      $( itemsToInit ).on( "click", function () {
        $( itemsToInit ).lightGallery( {
          thumbnail: $( itemsToInit ).attr( "data-lg-thumbnail" ) !== "false",
          selector: "[data-lightgallery='item']",
          autoplay: $( itemsToInit ).attr( "data-lg-autoplay" ) === "true",
          pause: parseInt( $( itemsToInit ).attr( "data-lg-autoplay-delay" ) ) || 5000,
          addClass: addClass,
          mode: $( itemsToInit ).attr( "data-lg-animation" ) || "lg-slide",
          loop: $( itemsToInit ).attr( "data-lg-loop" ) !== "false",
          dynamic: true,
          dynamicEl: JSON.parse( $( itemsToInit ).attr( "data-lg-dynamic-elements" ) ) || []
        } );
      } );
    }
  }

  /**
   * @desc Initialize the gallery with one image
   * @param {object} itemToInit - jQuery object
   * @param {string} [addClass] - additional gallery class
   */
  function initLightGalleryItem ( itemToInit, addClass ) {
    if ( !isNoviBuilder ) {
      $( itemToInit ).lightGallery( {
        selector: "this",
        addClass: addClass,
        counter: false,
        youtubePlayerParams: {
          modestbranding: 1,
          showinfo: 0,
          rel: 0,
          controls: 0
        },
        vimeoPlayerParams: {
          byline: 0,
          portrait: 0
        }
      } );
    }
  }

  /**
   * @desc Google map function for getting latitude and longitude
   */
  function getLatLngObject(str, marker, map, callback) {
    var coordinates = {};
    try {
      coordinates = JSON.parse(str);
      callback(new google.maps.LatLng(
        coordinates.lat,
        coordinates.lng
      ), marker, map)
    } catch (e) {
      map.geocoder.geocode({'address': str}, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          var latitude = results[0].geometry.location.lat();
          var longitude = results[0].geometry.location.lng();

          callback(new google.maps.LatLng(
            parseFloat(latitude),
            parseFloat(longitude)
          ), marker, map)
        }
      })
    }
  }

  /**
   * @desc Initialize Google maps
   */
  function initMaps() {
    var key;

    for ( var i = 0; i < plugins.maps.length; i++ ) {
      if ( plugins.maps[i].hasAttribute( "data-key" ) ) {
        key = plugins.maps[i].getAttribute( "data-key" );
        break;
      }
    }

    $.getScript('//maps.google.com/maps/api/js?'+ ( key ? 'key='+ key + '&' : '' ) +'sensor=false&libraries=geometry,places&v=quarterly', function () {
      var head = document.getElementsByTagName('head')[0],
        insertBefore = head.insertBefore;

      head.insertBefore = function (newElement, referenceElement) {
        if (newElement.href && newElement.href.indexOf('//fonts.googleapis.com/css?family=Roboto') !== -1 || newElement.innerHTML.indexOf('gm-style') !== -1) {
          return;
        }
        insertBefore.call(head, newElement, referenceElement);
      };
      var geocoder = new google.maps.Geocoder;
      for (var i = 0; i < plugins.maps.length; i++) {
        var zoom = parseInt(plugins.maps[i].getAttribute("data-zoom"), 10) || 11;
        var styles = plugins.maps[i].hasAttribute('data-styles') ? JSON.parse(plugins.maps[i].getAttribute("data-styles")) : [];
        var center = plugins.maps[i].getAttribute("data-center") || "New York";

        // Initialize map
        var map = new google.maps.Map(plugins.maps[i].querySelectorAll(".google-map")[0], {
          zoom: zoom,
          styles: styles,
          scrollwheel: false,
          center: {lat: 0, lng: 0}
        });

        // Add map object to map node
        plugins.maps[i].map = map;
        plugins.maps[i].geocoder = geocoder;
        plugins.maps[i].keySupported = true;
        plugins.maps[i].google = google;

        // Get Center coordinates from attribute
        getLatLngObject(center, null, plugins.maps[i], function (location, markerElement, mapElement) {
          mapElement.map.setCenter(location);
        });

        // Add markers from google-map-markers array
        var markerItems = plugins.maps[i].querySelectorAll(".google-map-markers li");

        if (markerItems.length){
          var markers = [];
          for (var j = 0; j < markerItems.length; j++){
            var markerElement = markerItems[j];
            getLatLngObject(markerElement.getAttribute("data-location"), markerElement, plugins.maps[i], function(location, markerElement, mapElement){
              var icon = markerElement.getAttribute("data-icon") || mapElement.getAttribute("data-icon");
              var activeIcon = markerElement.getAttribute("data-icon-active") || mapElement.getAttribute("data-icon-active");
              var info = markerElement.getAttribute("data-description") || "";
              var infoWindow = new google.maps.InfoWindow({
                content: info
              });
              markerElement.infoWindow = infoWindow;
              var markerData = {
                position: location,
                map: mapElement.map
              }
              if (icon){
                markerData.icon = icon;
              }
              var marker = new google.maps.Marker(markerData);
              markerElement.gmarker = marker;
              markers.push({markerElement: markerElement, infoWindow: infoWindow});
              marker.isActive = false;
              // Handle infoWindow close click
              google.maps.event.addListener(infoWindow,'closeclick',(function(markerElement, mapElement){
                var markerIcon = null;
                markerElement.gmarker.isActive = false;
                markerIcon = markerElement.getAttribute("data-icon") || mapElement.getAttribute("data-icon");
                markerElement.gmarker.setIcon(markerIcon);
              }).bind(this, markerElement, mapElement));


              // Set marker active on Click and open infoWindow
              google.maps.event.addListener(marker, 'click', (function(markerElement, mapElement) {
                if (markerElement.infoWindow.getContent().length === 0) return;
                var gMarker, currentMarker = markerElement.gmarker, currentInfoWindow;
                for (var k =0; k < markers.length; k++){
                  var markerIcon;
                  if (markers[k].markerElement === markerElement){
                    currentInfoWindow = markers[k].infoWindow;
                  }
                  gMarker = markers[k].markerElement.gmarker;
                  if (gMarker.isActive && markers[k].markerElement !== markerElement){
                    gMarker.isActive = false;
                    markerIcon = markers[k].markerElement.getAttribute("data-icon") || mapElement.getAttribute("data-icon")
                    gMarker.setIcon(markerIcon);
                    markers[k].infoWindow.close();
                  }
                }

                currentMarker.isActive = !currentMarker.isActive;
                if (currentMarker.isActive) {
                  if (markerIcon = markerElement.getAttribute("data-icon-active") || mapElement.getAttribute("data-icon-active")){
                    currentMarker.setIcon(markerIcon);
                  }

                  currentInfoWindow.open(map, marker);
                }else{
                  if (markerIcon = markerElement.getAttribute("data-icon") || mapElement.getAttribute("data-icon")){
                    currentMarker.setIcon(markerIcon);
                  }
                  currentInfoWindow.close();
                }
              }).bind(this, markerElement, mapElement))
            })
          }
        }
      }
    });
  }

  /**
   * @desc Initialize owl carousel plugin
   * @param {object} carousel - carousel jQuery object
   */
  function initOwlCarousel ( carousel ) {
    var
      aliaces = ["-", "-xs-", "-sm-", "-md-", "-lg-", "-xl-"],
      values = [0, 480, 768, 992, 1200, 1600],
      responsive = {};

    for ( var j = 0; j < values.length; j++ ) {
      responsive[ values[ j ] ] = {};
      for ( var k = j; k >= -1; k-- ) {
        if ( !responsive[ values[ j ] ][ 'items' ] && carousel.attr( 'data' + aliaces[ k ] + 'items' ) ) {
          responsive[ values[ j ] ][ 'items' ] = k < 0 ? 1 : parseInt( carousel.attr( 'data' + aliaces[ k ] + 'items' ), 10 );
        }
        if ( !responsive[ values[ j ] ][ 'stagePadding' ] && responsive[ values[ j ] ][ 'stagePadding' ] !== 0 && carousel.attr( 'data' + aliaces[ k ] + 'stage-padding' ) ) {
          responsive[ values[ j ] ][ 'stagePadding' ] = k < 0 ? 0 : parseInt( carousel.attr( 'data' + aliaces[ k ] + 'stage-padding' ), 10 );
        }
        if ( !responsive[ values[ j ] ][ 'margin' ] && responsive[ values[ j ] ][ 'margin' ] !== 0 && carousel.attr( 'data' + aliaces[ k ] + 'margin' ) ) {
          responsive[ values[ j ] ][ 'margin' ] = k < 0 ? 30 : parseInt( carousel.attr( 'data' + aliaces[ k ] + 'margin' ), 10 );
        }
      }
    }

    // Enable custom pagination
    if ( carousel.attr( 'data-dots-custom' ) ) {
      carousel.on( 'initialized.owl.carousel', function ( event ) {
        var
          carousel = $( event.currentTarget ),
          customPag = $( carousel.attr( 'data-dots-custom' ) ),
          active = 0;

        if ( carousel.attr( 'data-active' ) ) {
          active = parseInt( carousel.attr( 'data-active' ), 10 );
        }

        carousel.trigger( 'to.owl.carousel', [ active, 300, true ] );
        customPag.find( '[data-owl-item="' + active + '"]' ).addClass( 'active' );

        customPag.find( '[data-owl-item]' ).on( 'click', function ( event ) {
          event.preventDefault();
          carousel.trigger( 'to.owl.carousel', [ parseInt( this.getAttribute( 'data-owl-item' ), 10 ), 300, true ] );
        } );

        carousel.on( 'translate.owl.carousel', function ( event ) {
          customPag.find( '.active' ).removeClass( 'active' );
          customPag.find( '[data-owl-item="' + event.item.index + '"]' ).addClass( 'active' )
        } );
      } );
    }

    // Initialize lightgallery items in cloned owl items
    carousel.on( 'initialized.owl.carousel', function () {
      initLightGalleryItem( carousel.find( '[data-lightgallery="item"]' ), 'lightGallery-in-carousel' );
    } );

    carousel.owlCarousel( {
      autoplay:           isNoviBuilder ? false : carousel.attr( 'data-autoplay' ) !== 'false',
      autoplayTimeout:    carousel.attr( "data-autoplay" ) ? Number( carousel.attr( "data-autoplay" ) ) : 3000,
      autoplayHoverPause: true,
      loop:               isNoviBuilder ? false : carousel.attr( 'data-loop' ) !== 'false',
      items:              1,
      center:             carousel.attr( 'data-center' ) === 'true',
      dotsContainer:      carousel.attr( 'data-pagination-class' ) || false,
      navContainer:       carousel.attr( 'data-navigation-class' ) || false,
      mouseDrag:          isNoviBuilder ? false : carousel.attr( 'data-mouse-drag' ) !== 'false',
      nav:                carousel.attr( 'data-nav' ) === 'true',
      dots:               carousel.attr( 'data-dots' ) === 'true',
      dotsEach:           carousel.attr( 'data-dots-each' ) ? parseInt( carousel.attr( 'data-dots-each' ), 10 ) : false,
      animateIn:          carousel.attr( 'data-animation-in' ) ? carousel.attr( 'data-animation-in' ) : false,
      animateOut:         carousel.attr( 'data-animation-out' ) ? carousel.attr( 'data-animation-out' ) : false,
      responsive:         responsive,
      navText:            carousel.attr( 'data-nav-text' ) ? $.parseJSON( carousel.attr( 'data-nav-text' ) ) : [],
      navClass:           carousel.attr( 'data-nav-class' ) ? $.parseJSON( carousel.attr( 'data-nav-class' ) ) : [ 'owl-prev', 'owl-next' ]
    } );
  }



  // MoJS Effect
  function moJsIconsEffect(el, options) {
    this.el = el;
    this.options = $.extend({}, this.options);
    $.extend(this.options, options);

    this.checked = false;
    this.hovered = false;

    this.timeline = new mojs.Timeline();

    for (var i = 0, len = this.options.tweens.length; i < len; ++i) {
      this.timeline.add(this.options.tweens[i]);
    }

    var self = this;

    this.el.addEventListener('mouseenter', function (e) {
      if (self.hovered == false) {
        self.options.onCheck(self.el);
        self.timeline.replay();
        self.hovered = true;
        self.checked = !self.checked;
      }
    });
    this.el.addEventListener('mouseleave', function (e) {
      if (self.hovered) {
        self.options.onUnCheck(self.el);
        self.checked = !self.checked;
        self.hovered = false;
      }
    });
  }

  moJsIconsEffect.prototype.options = {
    tweens: [
      new mojs.Burst({})
    ],
    onCheck: function () {
      return false;
    },
    onUnCheck: function () {
      return false;
    }
  };





  // Owl carousel
  if ( plugins.owl.length ) {
    for ( var i = 0; i < plugins.owl.length; i++ ) {
      var carousel = $( plugins.owl[ i ] );
      plugins.owl[ i ].owl = carousel;
      initOwlCarousel( carousel );
    }
  }

  // lightGallery
  if (plugins.lightGallery.length) {
    for (var i = 0; i < plugins.lightGallery.length; i++) {
      initLightGallery(plugins.lightGallery[i]);
    }
  }

  // lightGallery item
  if (plugins.lightGalleryItem.length) {
    // Filter carousel items
    var notCarouselItems = [];

    for (var z = 0; z < plugins.lightGalleryItem.length; z++) {
      if (!$(plugins.lightGalleryItem[z]).parents('.owl-carousel').length &&
        !$(plugins.lightGalleryItem[z]).parents('.swiper-slider').length &&
        !$(plugins.lightGalleryItem[z]).parents('.slick-slider').length) {
        notCarouselItems.push(plugins.lightGalleryItem[z]);
      }
    }

    plugins.lightGalleryItem = notCarouselItems;

    for (var i = 0; i < plugins.lightGalleryItem.length; i++) {
      initLightGalleryItem(plugins.lightGalleryItem[i]);
    }
  }

  // Dynamic lightGallery
  if (plugins.lightDynamicGalleryItem.length) {
    for (var i = 0; i < plugins.lightDynamicGalleryItem.length; i++) {
      initDynamicLightGallery(plugins.lightDynamicGalleryItem[i]);
    }
  }

  // Google maps
  if( plugins.maps.length ) {
    lazyInit( plugins.maps, initMaps );
  }

  /**
   * Live Search
   * @description  create live search results
   */
  function liveSearch(options) {
    $('#' + options.live).removeClass('cleared').html();
    options.current++;
    options.spin.addClass('loading');
    $.get(handler, {
      s: decodeURI(options.term),
      liveSearch: options.live,
      dataType: "html",
      liveCount: options.liveCount,
      filter: options.filter,
      template: options.template
    }, function (data) {
      options.processed++;
      var live = $('#' + options.live);
      if (options.processed == options.current && !live.hasClass('cleared')) {
        live.find('> #search-results').removeClass('active');
        live.html(data);
        setTimeout(function () {
          live.find('> #search-results').addClass('active');
        }, 50);
      }
      options.spin.parents('.rd-search').find('.input-group-addon').removeClass('loading');
    })
  }

  /**
   * @desc Attach form validation to elements
   * @param {object} elements - jQuery object
   */
  function attachFormValidator(elements) {
    // Custom validator - phone number
    regula.custom({
      name: 'PhoneNumber',
      defaultMessage: 'Invalid phone number format',
      validator: function() {
        if ( this.value === '' ) return true;
        else return /^(\+\d)?[0-9\-\(\) ]{5,}$/i.test( this.value );
      }
    });

    for (var i = 0; i < elements.length; i++) {
      var o = $(elements[i]), v;
      o.addClass("form-control-has-validation").after("<span class='form-validation'></span>");
      v = o.parent().find(".form-validation");
      if (v.is(":last-child")) o.addClass("form-control-last-child");
    }

    elements.on('input change propertychange blur', function (e) {
      var $this = $(this), results;

      if (e.type !== "blur") if (!$this.parent().hasClass("has-error")) return;
      if ($this.parents('.rd-mailform').hasClass('success')) return;

      if (( results = $this.regula('validate') ).length) {
        for (i = 0; i < results.length; i++) {
          $this.siblings(".form-validation").text(results[i].message).parent().addClass("has-error");
        }
      } else {
        $this.siblings(".form-validation").text("").parent().removeClass("has-error")
      }
    }).regula('bind');

    var regularConstraintsMessages = [
      {
        type: regula.Constraint.Required,
        newMessage: "The text field is required."
      },
      {
        type: regula.Constraint.Email,
        newMessage: "The email is not a valid email."
      },
      {
        type: regula.Constraint.Numeric,
        newMessage: "Only numbers are required"
      },
      {
        type: regula.Constraint.Selected,
        newMessage: "Please choose an option."
      }
    ];


    for (var i = 0; i < regularConstraintsMessages.length; i++) {
      var regularConstraint = regularConstraintsMessages[i];

      regula.override({
        constraintType: regularConstraint.type,
        defaultMessage: regularConstraint.newMessage
      });
    }
  }

  /**
   * @desc Check if all elements pass validation
   * @param {object} elements - object of items for validation
   * @param {object} captcha - captcha object for validation
   * @return {boolean}
   */
  function isValidated(elements, captcha) {
    var results, errors = 0;

    if (elements.length) {
      for (var j = 0; j < elements.length; j++) {

        var $input = $(elements[j]);
        if ((results = $input.regula('validate')).length) {
          for (k = 0; k < results.length; k++) {
            errors++;
            $input.siblings(".form-validation").text(results[k].message).parent().addClass("has-error");
          }
        } else {
          $input.siblings(".form-validation").text("").parent().removeClass("has-error")
        }
      }

      if (captcha) {
        if (captcha.length) {
          return validateReCaptcha(captcha) && errors === 0
        }
      }

      return errors === 0;
    }
    return true;
  }

  /**
   * @desc Initialize Bootstrap tooltip with required placement
   * @param {string} tooltipPlacement
   */
  function initBootstrapTooltip(tooltipPlacement) {
    plugins.bootstrapTooltip.tooltip('dispose');

    if (window.innerWidth < 576) {
      plugins.bootstrapTooltip.tooltip({placement: 'bottom'});
    } else {
      plugins.bootstrapTooltip.tooltip({placement: tooltipPlacement});
    }
  }


  // Copyright Year (Evaluates correct copyright year)
  if (plugins.copyrightYear.length) {
    plugins.copyrightYear.text(initialDate.getFullYear());
  }
  /**
   * Is Mac os
   * @description  add additional class on html if mac os.
   */
  if (navigator.platform.match(/(Mac)/i)) $html.addClass("mac-os");

  /**
   * IE Polyfills
   * @description  Adds some loosing functionality to IE browsers
   */
  if (isIE) {
    if (isIE < 10) {
      $html.addClass("lt-ie-10");
    }

    if (isIE < 11) {
      if (plugins.pointerEvents) {
        $.getScript(plugins.pointerEvents)
            .done(function () {
              $html.addClass("ie-10");
              PointerEventsPolyfill.initialize({});
            });
      }
    }

    if (isIE === 11) {
      $("html").addClass("ie-11");
    }

    if (isIE === 12) {
      $("html").addClass("ie-edge");
    }
  }

  // Bootstrap Tooltips
  if (plugins.bootstrapTooltip.length) {
    var tooltipPlacement = plugins.bootstrapTooltip.attr('data-placement');
    initBootstrapTooltip(tooltipPlacement);

    $window.on('resize orientationchange', function () {
      initBootstrapTooltip(tooltipPlacement);
    })
  }

  /**
   * bootstrapModalDialog
   * @description Stap vioeo in bootstrapModalDialog
   */
  if (plugins.bootstrapModalDialog.length > 0) {
    var i = 0;

    for (i = 0; i < plugins.bootstrapModalDialog.length; i++) {
      var modalItem = $(plugins.bootstrapModalDialog[i]);

      modalItem.on('hidden.bs.modal', $.proxy(function () {
        var activeModal = $(this),
            rdVideoInside = activeModal.find('video'),
            youTubeVideoInside = activeModal.find('iframe');

        if (rdVideoInside.length) {
          rdVideoInside[0].pause();
        }

        if (youTubeVideoInside.length) {
          var videoUrl = youTubeVideoInside.attr('src');

          youTubeVideoInside
              .attr('src', '')
              .attr('src', videoUrl);
        }
      }, modalItem))
    }
  }

  /**
   * Radio
   * @description Add custom styling options for input[type="radio"]
   */
  if (plugins.radio.length) {
    var i;
    for (i = 0; i < plugins.radio.length; i++) {
      var $this = $(plugins.radio[i]);
      $this.addClass("radio-custom").after("<span class='radio-custom-dummy'></span>")
    }
  }

  /**
   * Checkbox
   * @description Add custom styling options for input[type="checkbox"]
   */
  if (plugins.checkbox.length) {
    var i;
    for (i = 0; i < plugins.checkbox.length; i++) {
      var $this = $(plugins.checkbox[i]);
      $this.addClass("checkbox-custom").after("<span class='checkbox-custom-dummy'></span>")
    }
  }

  /**
   * Popovers
   * @description Enables Popovers plugin
   */
  if (plugins.popover.length) {
    if (window.innerWidth < 767) {
      plugins.popover.attr('data-placement', 'bottom');
      plugins.popover.popover();
    }
    else {
      plugins.popover.popover();
    }
  }

  /**
   * Bootstrap Buttons
   * @description  Enable Bootstrap Buttons plugin
   */
  if (plugins.statefulButton.length) {
    $(plugins.statefulButton).on('click', function () {
      var statefulButtonLoading = $(this).button('loading');

      setTimeout(function () {
        statefulButtonLoading.button('reset')
      }, 2000);
    })
  }

  /**
   * UI To Top
   * @description Enables ToTop Button
   */
  if (isDesktop && !isNoviBuilder) {
    $().UItoTop({
      easingType: 'easeOutQuart',
      containerClass: 'ui-to-top fa fa-angle-up'
    });
  }

  /**
   * RD Navbar
   * @description Enables RD Navbar plugin
   */
  if (plugins.rdNavbar.length) {
    plugins.rdNavbar.RDNavbar({
      stickUpClone: isNoviBuilder !== "designMode" ?  plugins.rdNavbar.attr('data-stick-up-clone') == 'true' : false,
      responsive: {
        0: {
          stickUp: plugins.rdNavbar.attr("data-stick-up") ? (!isNoviBuilder ? plugins.rdNavbar.attr("data-stick-up") === 'true' : false) : isNoviBuilder !== "designMode"
        },
        768: {
          stickUp: plugins.rdNavbar.attr("data-sm-stick-up") ? (!isNoviBuilder ? plugins.rdNavbar.attr("data-sm-stick-up") === 'true' : false) : isNoviBuilder !== "designMode"
        },
        992: {
          stickUp: plugins.rdNavbar.attr("data-md-stick-up") ? (!isNoviBuilder ? plugins.rdNavbar.attr("data-md-stick-up") === 'true' : false) : isNoviBuilder !== "designMode"
        },
        1200: {
          stickUp: plugins.rdNavbar.attr("data-lg-stick-up") ? (!isNoviBuilder ? plugins.rdNavbar.attr("data-lg-stick-up") === 'true' : false) : isNoviBuilder !== "designMode"
        }
      }
    });
    if (plugins.rdNavbar.attr("data-body-class")) {
      document.body.className += ' ' + plugins.rdNavbar.attr("data-body-class");
    }
  }

  /**
   * ViewPort Universal
   * @description Add class in viewport
   */
  if (plugins.viewAnimate.length) {
    var i;
    for (i = 0; i < plugins.viewAnimate.length; i++) {
      var $view = $(plugins.viewAnimate[i]).not('.active');
      $document.on("scroll", $.proxy(function () {
        if (isScrolledIntoView(this)) {
          this.addClass("active");
        }
      }, $view))
          .trigger("scroll");
    }
  }

  /**
   * Swiper 3.1.7
   * @description  Enable Swiper Slider
   */
  if (plugins.swiper.length) {
    var i;
    for (i = 0; i < plugins.swiper.length; i++) {
      var s = $(plugins.swiper[i]);
      var pag = s.find(".swiper-pagination"),
          next = s.find(".swiper-button-next"),
          prev = s.find(".swiper-button-prev"),
          bar = s.find(".swiper-scrollbar"),
          parallax = s.parents('.rd-parallax').length,
          swiperSlide = s.find(".swiper-slide"),
          autoplay = false;

      for (j = 0; j < swiperSlide.length; j++) {
        var $this = $(swiperSlide[j]),
            url;

        if (url = $this.attr("data-slide-bg")) {
          $this.css({
            "background-image": "url(" + url + ")",
            "background-size": "cover"
          })
        }
      }


      swiperSlide.end()
          .find("[data-caption-animate]")
          .addClass("not-animated")
          .end()
          .swiper({
            autoplay: isNoviBuilder ? null :  s.attr('data-autoplay') ? s.attr('data-autoplay') === "false" ? undefined : s.attr('data-autoplay') : 5000,
            direction: s.attr('data-direction') ? s.attr('data-direction') : "horizontal",
            effect: s.attr('data-slide-effect') ? s.attr('data-slide-effect') : "slide",
            speed: s.attr('data-slide-speed') ? s.attr('data-slide-speed') : 600,
            keyboardControl: s.attr('data-keyboard') === "true",
            mousewheelControl: s.attr('data-mousewheel') === "true",
            mousewheelReleaseOnEdges: s.attr('data-mousewheel-release') === "true",
            nextButton: next.length ? next.get(0) : null,
            prevButton: prev.length ? prev.get(0) : null,
            pagination: pag.length ? pag.get(0) : null,
            paginationClickable: pag.length ? pag.attr("data-clickable") !== "false" : false,
            paginationBulletRender: pag.length ? pag.attr("data-index-bullet") === "true" ? function (index, className) {
              return '<span class="' + className + '">' + (index + 1) + '</span>';
            } : null : null,
            scrollbar: bar.length ? bar.get(0) : null,
            scrollbarDraggable: bar.length ? bar.attr("data-draggable") !== "false" : true,
            scrollbarHide: bar.length ? bar.attr("data-draggable") === "false" : false,
            loop: isNoviBuilder ? false : s.attr('data-loop') !== "false",
            simulateTouch: s.attr('data-simulate-touch') && !isNoviBuilder ? s.attr('data-simulate-touch') === "true" : false,
            onTransitionStart: function (swiper) {
              toggleSwiperInnerVideos(swiper);
            },
            onTransitionEnd: function (swiper) {
              toggleSwiperCaptionAnimation(swiper);
            },
            onInit: function (swiper) {
              toggleSwiperInnerVideos(swiper);
              toggleSwiperCaptionAnimation(swiper);
              $(window).on('resize', function () {
                swiper.update(true);
              })
            }
          });

      $(window)
          .on("resize", function () {
            var mh = getSwiperHeight(s, "min-height"),
                h = getSwiperHeight(s, "height");
            if (h) {
              s.css("height", mh ? mh > h ? mh : h : h);
            }
          })
          .trigger("resize");
    }
  }



  /**
   * WOW
   * @description Enables Wow animation plugin
   */
  if (isDesktop && $html.hasClass("wow-animation") && $(".wow").length) {
    new WOW().init();
  }

  /**
   * Bootstrap tabs
   * @description Activate Bootstrap Tabs
   */
  if (plugins.bootstrapTabs.length) {
    var i;
    for (i = 0; i < plugins.bootstrapTabs.length; i++) {
      var bootstrapTabsItem = $(plugins.bootstrapTabs[i]);

      //If have owl carousel inside tab - resize owl carousel on click
      if (bootstrapTabsItem.find('.owl-carousel').length) {
        // init first open tab
        var carouselObj = bootstrapTabsItem.find('.tab-content .tab-pane.active .owl-carousel');
        var setTimeOutTime = isNoviBuilder ? 1500 : 300;
        initOwlCarousel(carouselObj);

        //init owl carousel on tab change
        bootstrapTabsItem.find('.tabs-custom-list > li > a').on('click', $.proxy(function () {
          var $this = $(this);

          setTimeout(function () {
            var carouselObj = $this.find('.tab-content .tab-pane.active .owl-carousel').not('.owl-initialised');

            if (carouselObj.length) {
              for (var j = 0; j < carouselObj.length; j++) {
                var carouselItem = $(carouselObj[j]);
                initOwlCarousel(carouselItem);
                carouselItem.addClass('owl-initialised');
              }
            }
          }, setTimeOutTime);

        }, bootstrapTabsItem));
      }

      //If have slick carousel inside tab - resize slick carousel on click
      if (bootstrapTabsItem.find('.slick-slider').length) {
        bootstrapTabsItem.find('.tabs-custom-list > li > a').on('click', $.proxy(function () {
          var $this = $(this);
          var setTimeOutTime = isNoviBuilder ? 1500 : 300;

          setTimeout(function () {
            $this.find('.tab-content .tab-pane.active .slick-slider').slick('setPosition');
          }, setTimeOutTime);
        }, bootstrapTabsItem));
      }
    }
  }


  // RD Input Label
  if (plugins.rdInputLabel.length) {
    plugins.rdInputLabel.RDInputLabel();
  }

  // Regula
  if (plugins.regula.length) {
    attachFormValidator(plugins.regula);
  }

  // RD Mailform
  if (plugins.rdMailForm.length) {
    var i, j, k,
      msg = {
        'MF000': 'Successfully sent!',
        'MF001': 'Recipients are not set!',
        'MF002': 'Form will not work locally!',
        'MF003': 'Please, define email field in your form!',
        'MF004': 'Please, define type of your form!',
        'MF254': 'Something went wrong with PHPMailer!',
        'MF255': 'Aw, snap! Something went wrong.'
      };

    for (i = 0; i < plugins.rdMailForm.length; i++) {
      var $form = $(plugins.rdMailForm[i]),
        formHasCaptcha = false;

      $form.attr('novalidate', 'novalidate').ajaxForm({
        data: {
          "form-type": $form.attr("data-form-type") || "contact",
          "counter": i
        },
        beforeSubmit: function (arr, $form, options) {
          if (isNoviBuilder)
            return;

          var form = $(plugins.rdMailForm[this.extraData.counter]),
            inputs = form.find("[data-constraints]"),
            output = $("#" + form.attr("data-form-output")),
            captcha = form.find('.recaptcha'),
            captchaFlag = true;

          output.removeClass("active error success");

          if (isValidated(inputs, captcha)) {

            // veify reCaptcha
            if (captcha.length) {
              var captchaToken = captcha.find('.g-recaptcha-response').val(),
                captchaMsg = {
                  'CPT001': 'Please, setup you "site key" and "secret key" of reCaptcha',
                  'CPT002': 'Something wrong with google reCaptcha'
                };

              formHasCaptcha = true;

              $.ajax({
                method: "POST",
                url: "bat/reCaptcha.php",
                data: {'g-recaptcha-response': captchaToken},
                async: false
              })
                .done(function (responceCode) {
                  if (responceCode !== 'CPT000') {
                    if (output.hasClass("snackbars")) {
                      output.html('<p><span class="icon text-middle mdi mdi-check icon-xxs"></span><span>' + captchaMsg[responceCode] + '</span></p>')

                      setTimeout(function () {
                        output.removeClass("active");
                      }, 3500);

                      captchaFlag = false;
                    } else {
                      output.html(captchaMsg[responceCode]);
                    }

                    output.addClass("active");
                  }
                });
            }

            if (!captchaFlag) {
              return false;
            }

            form.addClass('form-in-process');

            if (output.hasClass("snackbars")) {
              output.html('<p><span class="icon text-middle fa fa-circle-o-notch fa-spin icon-xxs"></span><span>Sending</span></p>');
              output.addClass("active");
            }
          } else {
            return false;
          }
        },
        error: function (result) {
          if (isNoviBuilder)
            return;

          var output = $("#" + $(plugins.rdMailForm[this.extraData.counter]).attr("data-form-output")),
            form = $(plugins.rdMailForm[this.extraData.counter]);

          output.text(msg[result]);
          form.removeClass('form-in-process');

          if (formHasCaptcha) {
            grecaptcha.reset();
          }
        },
        success: function (result) {
          if (isNoviBuilder)
            return;

          var form = $(plugins.rdMailForm[this.extraData.counter]),
            output = $("#" + form.attr("data-form-output")),
            select = form.find('select');

          form
            .addClass('success')
            .removeClass('form-in-process');

          if (formHasCaptcha) {
            grecaptcha.reset();
          }

          result = result.length === 5 ? result : 'MF255';
          output.text(msg[result]);

          if (result === "MF000") {
            if (output.hasClass("snackbars")) {
              output.html('<p><span class="icon text-middle mdi mdi-check icon-xxs"></span><span>' + msg[result] + '</span></p>');
            } else {
              output.addClass("active success");
            }
          } else {
            if (output.hasClass("snackbars")) {
              output.html(' <p class="snackbars-left"><span class="icon icon-xxs mdi mdi-alert-outline text-middle"></span><span>' + msg[result] + '</span></p>');
            } else {
              output.addClass("active error");
            }
          }

          form.clearForm();

          if (select.length) {
            select.select2("val", "");
          }

          form.find('input, textarea').trigger('blur');

          setTimeout(function () {
            output.removeClass("active error success");
            form.removeClass('success');
          }, 3500);
        }
      });
    }
  }

  /**
   * Custom Toggles
   */
  if (plugins.customToggle.length) {
    var i;

    for (i = 0; i < plugins.customToggle.length; i++) {
      var $this = $(plugins.customToggle[i]);

      $this.on('click', $.proxy(function (event) {
        event.preventDefault();
        var $ctx = $(this);
        $($ctx.attr('data-custom-toggle')).add(this).toggleClass('active');
      }, $this));

      if ($this.attr("data-custom-toggle-hide-on-blur") === "true") {
        $("body").on("click", $this, function (e) {
          if (e.target !== e.data[0]
            && $(e.data.attr('data-custom-toggle')).find($(e.target)).length
            && e.data.find($(e.target)).length == 0) {
            $(e.data.attr('data-custom-toggle')).add(e.data[0]).removeClass('active');
          }
        })
      }

      if ($this.attr("data-custom-toggle-disable-on-blur") === "true") {
        $("body").on("click", $this, function (e) {
          if (e.target !== e.data[0] && $(e.data.attr('data-custom-toggle')).find($(e.target)).length == 0 && e.data.find($(e.target)).length == 0) {
            $(e.data.attr('data-custom-toggle')).add(e.data[0]).removeClass('active');
          }
        })
      }
    }
  }
  /**
   * jQuery Count To
   * @description Enables Count To plugin
   */
  if (plugins.counter.length) {
    var i;

    for (i = 0; i < plugins.counter.length; i++) {
      var $counterNotAnimated = $(plugins.counter[i]).not('.animated');
      $document
          .on("scroll", $.proxy(function () {
            var $this = this;

            if ((!$this.hasClass("animated")) && (isScrolledIntoView($this))) {
              $this.countTo({
                refreshInterval: 40,
                from: 0,
                to: parseInt($this.text(), 10),
                speed: $this.attr("data-speed") || 1000,
                formatter: function (value, options) {
                  if ($this.attr('data-formatter') != 'false') {
                    value = value.toFixed(options.decimals);
                    if (value < 10) {
                      return '0' + value;
                    }
                    return value;

                  } else if (value.toString().indexOf('.') !== -1) {
                    var decimals = $this.attr('data-to').split('.')[1];
                    return value.toFixed(options.decimals) + '.' + decimals;

                  } else {
                    return value.toFixed(options.decimals);
                  }

                }
              });
              $this.addClass('animated');
            }
          }, $counterNotAnimated))
          .trigger("scroll");
    }
  }

  /**
   * Circle Progress
   * @description Enable Circle Progress plugin
   */
  if (plugins.circleProgress.length) {
    var i;
    for (i = 0; i < plugins.circleProgress.length; i++) {
      var circleProgressItem = $(plugins.circleProgress[i]);
      $document
          .on("scroll", function () {
            if (!circleProgressItem.hasClass('animated')) {

              var arrayGradients = circleProgressItem.attr('data-gradient').split(",");

              circleProgressItem.circleProgress({
                value: parseFloat(circleProgressItem.text(), 10),
                size: circleProgressItem.attr('data-size') ? circleProgressItem.attr('data-size') : 140,
                fill: {gradient: arrayGradients, gradientAngle: Math.PI / 4},
                startAngle: -Math.PI / 4 * 2,
                emptyFill: circleProgressItem.attr('data-empty-fill') ? circleProgressItem.attr('data-empty-fill') : "rgb(245,245,245)",
                thickness: circleProgressItem.attr('data-thickness') ? parseInt(circleProgressItem.attr('data-thickness')) : 10,

              }).on('circle-animation-progress', function (event, progress, stepValue) {
                $(this).find('span').text(String(stepValue.toFixed(2)).replace('0.', '').replace('1.', '1'));
              });
              circleProgressItem.addClass('animated');
            }
          })
          .trigger("scroll");
    }
  }

  /**
   * Linear Progress bar
   * @description  Enable progress bar
   */
  if (plugins.progressLinear.length) {
    for (i = 0; i < plugins.progressLinear.length; i++) {
      var progressBar = $(plugins.progressLinear[i]);
      $window
          .on("scroll load", $.proxy(function () {
            var bar = $(this);
            if (!bar.hasClass('animated-first') && isScrolledIntoView(bar)) {
              var end = parseInt($(this).find('.progress-value').text(), 10);
              bar.find('.progress-bar-linear').css({width: end + '%'});
              bar.find('.progress-value').countTo({
                refreshInterval: 40,
                from: 0,
                to: end,
                speed: 500
              });
              bar.addClass('animated-first');
            }
          }, progressBar));
    }
  }

  // Material Parallax
  if ( plugins.materialParallax.length ) {
    if ( !isNoviBuilder && !isIE && !isMobile) {
      plugins.materialParallax.parallax();
    } else {
      for ( var i = 0; i < plugins.materialParallax.length; i++ ) {
        var $parallax = $(plugins.materialParallax[i]);

        $parallax.addClass( 'parallax-disabled' );
        $parallax.css({ "background-image": 'url('+ $parallax.data("parallax-img") +')' });
      }
    }
  }

  if(plugins.customParallax.length) {
    for (var k = 0; k < plugins.customParallax.length; k++) {
      var $this = $(plugins.customParallax[k]),
        wrapper = $('.custom-parallax-wrap'),
        parallax = true,
        speed;

      if (parallax && !isIE && !isMobile) {
        if (speed = $this.attr("data-speed")) {
          makeParallax($this, speed, wrapper, false);
        }
      }
    }
  }



  /**
   * RD Video
   * @description Enables RD Video plugin
   */
  if (plugins.rdVideoBG.length) {
    var i;
    for (i = 0; i < plugins.rdVideoBG.length; i++) {
      var videoItem = $(plugins.rdVideoBG[i]);
      videoItem.RDVideo({});
    }
  }

  /**
   * RD Audio player
   * @description Enables RD Audio player plugin
   */
  if (plugins.rdAudioPlayer.length && !isNoviBuilder) {
    var i;
    for (i = 0; i < plugins.rdAudioPlayer.length; i++) {
      $(plugins.rdAudioPlayer[i]).RDAudio();
    }
  }


  /**
   * MoJs icon effects
   * @description Enables effects for icons
   */
  function moJsIconsEffect(el, options) {
    this.el = el;
    this.options = $.extend({}, this.options);
    $.extend(this.options, options);

    this.checked = false;
    this.hovered = false;

    this.timeline = new mojs.Timeline();

    for (var i = 0, len = this.options.tweens.length; i < len; ++i) {
      this.timeline.add(this.options.tweens[i]);
    }

    var self = this;

    this.el.addEventListener('mouseenter', function (e) {
      if (self.hovered == false) {
        self.options.onCheck(self.el);
        self.timeline.replay();
        self.hovered = true;
        self.checked = !self.checked;
      }
    });
    this.el.addEventListener('mouseleave', function (e) {
      if (self.hovered) {
        self.options.onUnCheck(self.el);
        self.checked = !self.checked;
        self.hovered = false;
      }
    });
  }

  moJsIconsEffect.prototype.options = {
    tweens: [
      new mojs.Burst({})
    ],
    onCheck: function () {
      return false;
    },
    onUnCheck: function () {
      return false;
    }
  };

  if (plugins.mojsIconEffect.length) {
    var iconElements = $('.mojs-icon-effect-5');
    for (var i = 0; i < iconElements.length; i++) {
      var scaleCurve5 = mojs.easing.path('M0,100 L25,99.9999983 C26.2328835,75.0708847 19.7847843,0 100,0'),
        element = iconElements[i],
        elementSpan;

      new moJsIconsEffect(element, {
        tweens : [
          // burst animation
          new mojs.Burst({
            parent: 	element,
            count: 		15,
            radius: 	{20:80},
            angle: 		{ 0: 140, easing: mojs.easing.bezier(0.1, 1, 0.3, 1) },
            children: {
              fill: 			'#f47e4b',
              radius: 		20,
              opacity: 		0.6,
              duration: 	1500,
              easing: 		mojs.easing.bezier(0.1, 1, 0.3, 1)
            }
          }),
          // icon scale animation
          new mojs.Tween({
            duration : 800,
            easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
            onUpdate: $.proxy(function (progress) {
              var scaleProgress = scaleCurve5(progress);
              elementSpan = this.querySelector('span');
              elementSpan.style.WebkitTransform = elementSpan.style.transform = 'scale3d(' + progress + ',' + progress + ',1)';
            }, element)
          })
        ],
        onCheck : function(ctx) {
          ctx.style.color = '#f47e4b';
        },
        onUnCheck : function(ctx) {
          ctx.style.color = '#efe939';
        }
      });
    }
  }

  /**
   * MoJs icon effects
   * @description Enables effects for icons
   */
  if (plugins.mojsIconEffect.length) {
    // .mo-js-icon-effect-6
    var iconElements = $('.mojs-icon-effect-6');
    for (var i = 0; i < iconElements.length; i++) {
      var scaleCurve6 = mojs.easing.path('M0,100 L25,99.9999983 C26.2328835,75.0708847 19.7847843,0 100,0');
      element = iconElements[i],
        elementSpan;

      new moJsIconsEffect(element, {
        tweens : [
          // burst animation
          new mojs.Burst({
            parent: 			element,
            radius: 			{40:110},
            count: 				20,
            children: {
              shape: 			'line',
              fill : 			'white',
              radius: 		{ 12: 0 },
              scale: 			1,
              stroke: 		'#efe939',
              strokeWidth: 2,
              duration: 	1500,
              easing: 		mojs.easing.bezier(0.1, 1, 0.3, 1)
            },
          }),
          // ring animation
          new mojs.Shape({
            parent: 			element,
            radius: 			{10: 60},
            fill: 				'transparent',
            stroke: 			'#efe939',
            strokeWidth: 	{30:0},
            duration: 		800,
            easing: 			mojs.easing.bezier(0.1, 1, 0.3, 1)
          }),
          // icon scale animation
          new mojs.Tween({
            duration : 800,
            easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
            onUpdate: $.proxy(function (progress) {
              var scaleProgress = scaleCurve6(progress);
              elementSpan = this.querySelector('span');
              elementSpan.style.WebkitTransform = elementSpan.style.transform = 'scale3d(' + progress + ',' + progress + ',1)';
            }, element)
          })
        ],
        onCheck : function(ctx) {
          ctx.style.color = '#151515';
        },
        onUnCheck : function(ctx) {
          ctx.style.color = '#151515';
        }
      });
    }
  }

  /**
   * Slick carousel
   * @description  Enable Slick carousel plugin
   */
  if (plugins.slick.length) {
    var i;
    for (i = 0; i < plugins.slick.length; i++) {
      var $slickItem = $(plugins.slick[i]);

      $slickItem.slick({
        slidesToScroll: parseInt($slickItem.attr('data-slide-to-scroll')) || 1,
        asNavFor: $slickItem.attr('data-for') || false,
        dots: $slickItem.attr("data-dots") == "true",
        infinite: $slickItem.attr("data-loop") == "true",
        focusOnSelect: true,
        arrows: $slickItem.attr("data-arrows") == "true" || $slickItem.attr('data-custom-arrows') == 'true',
        prevArrow: $slickItem.attr('data-custom-arrows') == 'true' ? $('.slick-prev[data-slick="' + $slickItem.attr('id') + '"]'): '',
        nextArrow: $slickItem.attr('data-custom-arrows') == 'true' ? $('.slick-next[data-slick="' + $slickItem.attr('id') + '"]'): '',
        swipe: $slickItem.attr("data-swipe") == "true",
        autoplay: $slickItem.attr("data-autoplay") == "true",
        vertical: $slickItem.attr("data-vertical") == "true",
        centerMode: $slickItem.attr("data-center-mode") == "true",
        centerPadding: $slickItem.attr("data-center-padding") ? $slickItem.attr("data-center-padding") : '0.50',
        mobileFirst: true,
        responsive: [
          {
            breakpoint: 0,
            settings: {
              slidesToShow: parseInt($slickItem.attr('data-items')) || 1,
            }
          },
          {
            breakpoint: 479,
            settings: {
              slidesToShow: parseInt($slickItem.attr('data-xs-items')) || 1,
            }
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: parseInt($slickItem.attr('data-sm-items')) || 1,
            }
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: parseInt($slickItem.attr('data-md-items')) || 1,
            }
          },
          {
            breakpoint: 1199,
            settings: {
              slidesToShow: parseInt($slickItem.attr('data-lg-items')) || 1,
              swipe: false
            }
          }
        ]
      })
        .on('afterChange', function (event, slick, currentSlide, nextSlide) {
          var $this = $(this),
            childCarousel = $this.attr('data-child');

          if (childCarousel) {
            $(childCarousel + ' .slick-slide').removeClass('slick-current');
            $(childCarousel + ' .slick-slide').eq(currentSlide).addClass('slick-current');
          }
        });
    }
  }
});

