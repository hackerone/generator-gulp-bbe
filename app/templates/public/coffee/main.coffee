require.config
  paths:
    "jquery" : "/components/jquery/dist/jquery",
    "backbone" : "/components/backbone/backbone",
    "underscore" : "/components/lodash/dist/lodash.underscore",
    "bs": "/components/bootstrap-sass/vendor/javascripts/bootstrap"

require ["backbone"], (Backbone) ->
  Backbone.History.start();