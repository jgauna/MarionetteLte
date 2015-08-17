define(['jquery', 'backbone', 'bootstrap', 'adminlte', 'marionette', 'underscore', 'layouts/RootLayoutView'],
    function($, Backbone, Marionette, bootstrap, adminlte, _, RootLayoutView) {
        var App = new Backbone.Marionette.Application();

        App.rootLayout = new RootLayoutView({
            regions: {
                headerRegion: ".main-header",
                sidebarRegion: ".main-sidebar",
                mainRegion: ".content-wrapper"
            }
        });

        function isMobile() {
            var ua = (navigator.userAgent || navigator.vendor || window.opera, window, window.document);
            return (/iPhone|iPod|iPad|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
        }

        App.static = {};

        App.static.mobile = isMobile();

        App.on('start', function(options) {
            if (Backbone.history) Backbone.history.start();
        });

        return App;
    });