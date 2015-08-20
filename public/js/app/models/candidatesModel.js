define(["jquery", "App", "backbone"],
    function($, App, Backbone) {
        var candidatesModel = Backbone.Model.extend({
            defaults: {
                _id: null,
                candidate: null
            },
            url: function() {
                return App.appConfig.cadidatesURL;
            }
        });

        return candidatesModel;
    }
);