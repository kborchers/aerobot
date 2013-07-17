App.IndexRoute = Ember.Route.extend({
    redirect: function(controller) {
        this.transitionTo('channels');
    }
});
