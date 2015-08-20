define(["jquery", "App", "backbone"],
    function($, App, Backbone) {
        var metricsModel = Backbone.Model.extend({
            defaults: {
                candidate: "",
                byAge: "",
                byAex: "",
                byResidence: "",
                byEducational_level: "",
                byCountry_situtation: ""
            }
        });

        return metricsModel;
    }
);