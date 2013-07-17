App.Channel = Ember.Object.extend();

App.Channel.reopenClass({
    channels: Ember.ArrayProxy.create({ content: [] }),
    statuses: Ember.ArrayProxy.create({ content: [] }),
    channelPipe: AeroGear.Pipeline({
        name: "statuses",
        settings: {
            baseURL: "http://api.aerobot.qmx.me/"
        }
    }).pipes.statuses,

    find: function() {
        var that = this;
        this.channelPipe.read({
            success: function( data ) {
                that.channels.clear();
                data["aerobot:status"]["irc.freenode.net"].channels.forEach( function( item ) {
                    that.channels.pushObject( App.Channel.create( { id: item.channel, name: item.channel } ) );
                });
            }
        });

        return this.channels;
    },

    findStatusesById: function(channel) {
        var that = this;
        this.channelPipe.read({
            id: "irc.freenode.net/" + channel,
            success: function( data ) {
                that.statuses.clear();
                data.users.forEach( function( item ) {
                    that.statuses.pushObject( App.Channel.create( item ) );
                });
            }
        });

        return this.statuses;
    }
});
