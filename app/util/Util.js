Ext.define('Locator.util.Util', {
  singleton: true,
  // Whether the application views will have a animation while changing on=r not
  enablePageAnimations: true,
  // User's current location is saved here
  userLocation: null,
  // Google place api key
  API_KEY: 'AIzaSyAGEF5-1H1S6dgXbH9lu7Z3SXX2EiiG9Bo',
 
  // All the api urls
  api: (function () {
    //var baseUrl = 'https://maps.googleapis.com/maps/api/place/';
    var baseUrl = 'php/action.php';
    return {
      baseUrl: baseUrl,
      categories: 'resources/data/categories.json',
      nearestPlaces: baseUrl + '',
      nearBySearch: 'nearbysearch',
      photo: 'photo',
      details: 'details'
    }
  })(),
 
  // Destroy a Sencha view
  destroyCmp: function (child, parent) {
    parent = parent || Ext.Viewport;
 
    if (child) {
      Ext.defer(function () {
        parent.remove(child);
      }, Locator.util.Util.animDuration);
    }
  },
 
  // Show general message alert
  showMsg: function (msg, title, cb, scope) {
    if (msg) {
      Ext.Msg.alert(title || 'Error', msg.toString(), cb || function () {}, scope || window);
    }
 
    return this;
  },
 
  // Animate the active item
  showActiveItem: function (parentPanel, childPanel, animation) {
    animation = Ext.apply({
      type: 'slide',
      duration: LocatrConfig.amimationDuration
    }, animation || {});
 
    if (parentPanel && childPanel) {
      if (this.enablePageAnimations && animation && animation.type) {
        parentPanel.animateActiveItem(childPanel, animation);
      } else {
        parentPanel.setActiveItem(childPanel);
      }
    }
 
    return this;
  },
 
  // Show a loading box on a
  showLoading: function (panel, doShow, message) {
    panel = panel || Ext.Viewport;
    if (panel) {
      if (doShow) {
        panel.setMasked({
          xtype: 'loadmask',
          message: message || 'Loading...'
        });
      } else {
        panel.setMasked(false);
      }
    }
 
    return this;
  },
 
  // Capitalize first character of each word of a string
  toTitleCase: function (str) {
    if (!str) {
      return '';
    }
 
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    
  },
  
  getRating: function (rating, max, hideRatingValue) {
	  if (rating !== undefined) {
	    var str = '<div class="ratings">';
	    rating = parseFloat(rating);
	    max = max || 5;
	 
	    // We divide the rating into a part upto maximum value
	 
	    for (var i=1; i <= max; i++) {
	      // For each 1 rating, add a full star
	      if (i <= rating) {
	        str += '<div class="star full-star"></div>';
	      }
	 
	      if (i > rating) {
	        // If the part rating is a decimal between 0 & 1, add half star
	        if (rating %1 !==0 && (i-rating) <1) {
	          str += '<div class="star half-star"></div>';
	        }
	        // For all part rating value 0, add no star
	        else {
	          str += '<div class="star no-star"></div>';
	        }
	      }
	    }
	 
	    if (!hideRatingValue) {
	      str += '<div class="value">' + rating + '</div>';
	    }
	 
	    str += '</div>';
	 
	    return str;
	  }
	 
	  return Lang.noRating;
	}
  
});


