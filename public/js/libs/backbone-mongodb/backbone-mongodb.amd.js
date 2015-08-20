// backbone-mongodb 0.1.0
//
// (c) 2013 Vadim Mirgorod
// Licensed under the MIT license.
// AMD support added by hand_er

(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory(require("underscore"), require("backbone"));
    } else if (typeof define === "function" && define.amd) {
        // AMD. Register as an anonymous module.
        define(["underscore","backbone"], function(_, Backbone) {
            // Use global variables if the locals are undefined.
            return factory(_ || root._, Backbone || root.Backbone);
        });
    } else {
        // RequireJS isn't being used. Assume underscore and backbone are loaded in <script> tags
        factory(_, Backbone);
    }
}(this, function(_, Backbone) {

  // Define mixing that we will use in our extension.
  var mixin = {

    // Convert MongoDB Extended JSON into regular one.
    parse: function(resp, options) {
      if (_.isObject(resp._id))  {
        resp[this.idAttribute] = resp._id.$oid;
        delete resp._id;
      }

      return resp;
    },

    // Convert regular JSON into MongoDB extended one.
    toExtendedJSON: function() {
      var attrs = this.attributes;

      var attrs = _.omit(attrs, this.idAttribute);
      if (!_.isUndefined(this[this.idAttribute]))  {
        attrs._id = { $oid: this[this.idAttribute] };
      }

      return attrs;
    },

    // Substute toJSON method when performing synchronization.
    sync: function() {
      var toJSON = this.toJSON;
      this.toJSON = this.toExtendedJSON;

      var ret = Backbone.sync.apply(this, arguments);

      this.toJSON = toJSON;

      return ret;
    }
  }

  // Create new MongoModel object.
  Backbone.MongoModel = Backbone.Model.extend(mixin);

  // Provide mixin to extend Backbone.Model.
  Backbone.MongoModel.mixin = mixin;

  // Another way to perform mixin.
  //_.extend(Backbone.Model.prototype, mixin);

}));