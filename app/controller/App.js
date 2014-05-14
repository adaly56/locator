Ext.define('Locator.controller.App', {
  extend: 'Ext.app.Controller',
  requires: ['Ext.device.Geolocation', 'Ext.Map'],
  util: Locator.util.Util,
  config: {
    refs: {
      categoriesList: 'categories',
      main: 'main',
      placeList: 'placelist'
    },
 
    control: {
      categoriesList: {
        itemtap: 'loadPlaces'
      }
    }
  },
 
  /**
   * Retrieve all the places for a particlur category
   */
  loadPlaces: function (list, index, target, record) {
    var me = this,
      loadPlaces = function () {
        // Show the place list page
        me.showPlaceList(record);
 
        // Load the store with user's location, radius, type and api key
        store.getProxy().setExtraParams({
          location: me.util.userLocation,
          action: me.util.api.nearBySearch,
          radius: me.util.defaultSearchRadius,
          sensor: false,
          key: me.util.API_KEY,
          types: record.get('type')
        });
 
        store.load(function (records) {
          me.util.showLoading(me.getPlaceList(), false);
        });
      },
      store = Ext.getStore('Places');
 
    // If user's location is already not set, fetch it.
    // Else load the places for the saved user's location
    if (!me.util.userLocation) {
      Ext.device.Geolocation.getCurrentPosition({
        success: function (position) {
          me.util.userLocation = position.coords.latitude + ',' + position.coords.longitude;
          loadPlaces();
        },
        failure: function () {
          me.util.showMsg(Lang.locationRetrievalError);
        }
      });
    } else {
      // Clean the store if there is any previous data
      store.removeAll();
      loadPlaces();
    }
  },
 
  /**
   * Show place list
   */
  showPlaceList: function (record) {
    this.getMain().push({
      xtype: 'placelist',
      title: record.get('name')
    });
  }
});