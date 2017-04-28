$(function () {
  navbar.initialize();

  settings.initialize();

  pricing_charts.initialize();

  global_notifications.initialize();

  ecommerce.initialize();
  
  retina.initialize();

  zoomerang.initialize();
});

var settings = {
  initialize: function () {
    var $settings_module = $("#settings-module"),
      $button = $("#open-settings", $settings_module),
      $options_navbar = $("[data-option='navbar']", $settings_module),
      $navbar = $("nav.navbar"),
      $body = $("body, html");

    $button.click(function (e) {
      e.preventDefault();
      $settings_module.toggleClass("opened");
    });

    $options_navbar.click(function (e) {
      e.preventDefault();
      var navbarClass = $(this).data("class");
      $navbar.removeClass("navbar-default navbar-transparent navbar-inverse").addClass(navbarClass);

      if (navbarClass === 'navbar-default') {
        $navbar.find('.navbar-brand img').attr('src', 'images/logo-alt-b.png');
      } else {
        $navbar.find('.navbar-brand img').attr('src', 'images/logo-alt-w.png');
      }
    });

    $body.click(function () {
      $settings_module.removeClass("opened");
    });

    $settings_module.click(function (e) {
      e.stopPropagation();
    });

    // preload logo images for optimized switching
    if ($settings_module.length) {
      (new Image()).src = 'images/logo-alt-w.png';
      (new Image()).src = 'images/logo-alt-b.png';
    }
  }
};

var zoomerang = {
  initialize: function () {
    Zoomerang.config({
      maxHeight: 730,
      maxWidth: 900
    }).listen('[data-trigger="zoomerang"]')
  }
};

var ecommerce = {
  initialize: function () {
    this.displayCart()
    this.search()
  },

  displayCart: function () {
    var $cart = $(".store-navbar .cart"),
        $modal = $("#cart-modal"),
        timeout;

    var showModal = function () {
      $modal.addClass("visible");

      clearTimeout(timeout);
      timeout = null;
    };

    var hideModal = function () {
      timeout = setTimeout(function() {
        $modal.removeClass("visible");
      }, 400);
    };

    $cart.hover(showModal, hideModal);
    $modal.hover(showModal, hideModal);
  },

  search: function () {
    var $searchField = $('.store-navbar .search-field')
    var $searchInput = $searchField.find('.input-search')

    $searchInput.focus(function () {
      $searchField.addClass('focus')
    })

    $searchInput.blur(function () {
      $searchField.removeClass('focus')
    })
  }
};

var navbar = {
  initialize: function () {
    this.themeSites();
    
    if (!window.utils.isMobile()) {
      this.dropdowns();
    }
  },

  dropdowns: function () {
    var $dropdowns = $('.navbar-nav li.dropdown')
    $dropdowns.each(function (index, item) {
      var $item = $(this)

      $item.hover(function () {
          $item.addClass('open')
      }, function () {
          $item.removeClass('open')  
      })
    })
  },

  themeSites: function () {
    var $trigger = $("[data-toggle-header-sections-menu]"),
      $header_panel = $("#header-sections-menu"),
      $body = $("body");

    $trigger.click(function (e) {
      e.preventDefault();

      $body.toggleClass("header-panel-visible");

      if ($body.hasClass("header-panel-visible")) {
        $trigger.find("i").removeClass("ion-plus").addClass("ion-minus");

        var $navbar = $trigger.closest(".navbar");

        if ($navbar.hasClass("navbar-transparent")) {
          $header_panel.removeClass("fixed");
          return;
        }

        if ($navbar.hasClass("navbar-fixed-top")) {
          $header_panel.addClass("fixed");
        }
      } else {
        $trigger.find("i").removeClass("ion-minus").addClass("ion-plus");
      }
    })
  }
};

var global_notifications = {
  initialize: function () {
    setTimeout(function () {
      $(".global-notification").removeClass("uber-notification").addClass("uber-notification-remove");
    }, 5000);
  }
};

var pricing_charts = {
  initialize: function () {
    var tabs = $(".pricing-charts-tabs .tab"),
        prices = $(".pricing-charts .chart header .price");

    tabs.click(function () {
      tabs.removeClass("active");
      $(this).addClass("active");

      var period = $(this).data("tab");
      var price_out = prices.filter(":not(."+ period +")");
      price_out.addClass("go-out");
      prices.filter("." + period + "").addClass("active");

      setTimeout(function () {
        price_out.removeClass("go-out").removeClass("active");
      }, 250);
    });
  }
};

var retina = {
  initialize: function () {
    if(window.devicePixelRatio >= 1.2){
      $("[data-2x]").each(function(){
        if(this.tagName == "IMG"){
          $(this).attr("src",$(this).attr("data-2x"));
        } else {
          $(this).css({"background-image":"url("+$(this).attr("data-2x")+")"});
        }
      });
    }
  }
};

window.utils = {
  isFirefox: function () {
    return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
  },

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  debounce: function (func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  },

  isMobile: function () {
    if (window.innerWidth <= 1024) {
      return true
    } else {
      return false
    }
  },

  parallax_text: function ($selector, extra_top) {
    extra_top = typeof extra_top !== 'undefined' ? extra_top : 0;

    $(window).scroll(function() {
      var scroll = $(window).scrollTop(), 
        slowScroll = scroll/1.4,
        slowBg = (extra_top + slowScroll) + "px",
        opacity,
        transform = "transform" in document.body.style ? "transform" : "-webkit-transform";;

      if (scroll > 0) {
        opacity = (1000 - (scroll*2.7)) / 1000;
      } else {
        opacity = 1;
      }

      $selector.css({
        "position": "relative",
        // transform: "translate3d(0, " + slowBg + ", 0)",
        top: slowBg,
        "opacity": opacity
      });
    });
  }
};
