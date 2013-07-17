App.ChannelRoute = Ember.Route.extend({
    setupController: function(controller, model) {
        console.log(model);
        controller.set('model', App.Channel.findStatusesById(model.get("id")));
    }
});
