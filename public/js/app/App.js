define(['jquery', 'backbone', 'bootstrap', 'adminlte', 'highcharts', 'backbone-mongodb', 'marionette', 'underscore', 'layouts/RootLayoutView'],
    function($, Backbone, Marionette, bootstrap, adminlte, highcharts, MongoModel, _, RootLayoutView) {
        'use strict';
        var app = new Backbone.Marionette.Application();
        // Set configuration for mongolab
        app.appConfig = {
            baseURL: 'https://api.mongolab.com/api/1/databases/xyz_db/collections/',
            apiKey: 'apiKey=lzJkz-9hOBSL6ppI1cWTEJxzFpeH5xXv',
            cadidatesURL: 'https://api.mongolab.com/api/1/databases/xyz_db/collections/metrics?f={%22candidate%22:%201}&apiKey=lzJkz-9hOBSL6ppI1cWTEJxzFpeH5xXv',
            metricsByCandidateURL: 'https://api.mongolab.com/api/1/databases/xyz_db/collections/metrics?q='
        };
        app.rootLayout = new RootLayoutView({
            regions: {
                headerRegion: ".main-header",
                sidebarRegion: ".main-sidebar",
                mainRegion: ".content-wrapper",
                footerRegion: ".main-footer"
            }
        });

        app.addInitializer(function() {
            _.extend(Backbone.Model.prototype, Backbone.MongoModel.mixin);
        });

        function isMobile() {
            var ua = (navigator.userAgent || navigator.vendor || window.opera, window, window.document);
            return (/iPhone|iPod|iPad|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
        }

        app.static = {};

        app.static.mobile = isMobile();

        app.on('start', function(options) {
            if (Backbone.history) Backbone.history.start();
        });

        return app;
    });