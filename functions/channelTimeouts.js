'use strict';

let lists = require('../functions/lists');
let ms = require('ms');

module.exports = {
    timeouts: {},

    startTimeout: (msg) => {
        if (!msg.author.bot) {
            if (!module.exports.timeouts[msg.channel.id] && msg.channel.type !== '1') {
                module.exports.timeouts[msg.channel.id] = setTimeout(() => {
                    msg.channel.createMessage(lists.quotes[Math.floor(Math.random() * lists.quotes.length)].quote);
                    module.exports.timeouts[msg.channel.id] = null;
                }, ms('5 minutes'));
            }
        }
    }
}