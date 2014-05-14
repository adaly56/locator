Ext.define('Locator.view.PlaceList', {
  extend: 'Ext.List',
  xtype: 'placelist',
  config: {
    cls: 'default-bg placelist',
    store: 'Places',
    emptyText: '',
    itemTpl: Ext.create('Ext.XTemplate',
      '{[this.getImage(values)]}',
      '<div class="item" data-placelistitem-id="{id}">',
      '<div class="name">{name}</div>',
      '<div class="vicinity">{vicinity}</div>',
      '{rating:this.getRating}',
      '</div>', {
 
      // Returns the business image if available. Else shows the icon available for that business
      getImage: function (data) {
        if (data.photos && data.photos.length > 0) {
          return '<div class="photo"><img src="' + data.photos[0].url + '" /></div>';
        }
 
        return '<div class="icon-wrapper"><div class="icon" style="-webkit-mask-image:url(' + data.icon + ');" ></div></div>';
      },
 
      // Shows a star based rating. The functional details is given in the Util class
      getRating: function (rating) {
        return Locator.util.Util.getRating(rating);
      }
    })
  }
});