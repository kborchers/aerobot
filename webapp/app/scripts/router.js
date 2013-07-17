App.Router.map(function () {
    this.resource('channels', { path: '/channels' }, function() {
        this.resource('channel', { path: '/irc.freenode.net/:channel_id' });
    });
    this.resource('karma');
});
