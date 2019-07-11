'use strict';

const lists = require('../functions/lists');
const timeouts = require('../functions/channelTimeouts');

module.exports = {
    name: 'quote',

    exec: (client, msg, args) => {
        if (timeouts[msg.channel.id]) {
            clearTimeout(timeouts[msg.channel.id]);
            timeouts[msg.channel.id] = null;
            msg.channel.createMessage(lists.quotes[Math.floor(Math.random() * lists.quotes)].quote);
        }
    },

    options: {
        description: 'A quote from YouTubeBassBooster',
        longDescription: 'There is literally nothing else to know about this command.'
    }
}