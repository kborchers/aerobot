App.StatusesRoute = Ember.Route.extend({
    setupController: function(controller, user_id) {
        controller.set('model', App.Channel.find());
    }
});
