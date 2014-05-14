Ext.define('Locator.model.Category', {
  extend: 'Ext.data.Model',
  config: {
    fields: [
      "type", {
      name: "name",
      type: "string",
      convert: function (v, record) {
        // Converts to title case and returns
        return Locator.util.Util.toTitleCase(record.get('type').split('_').join(' '));
      }
    }, "size"]
  }
});