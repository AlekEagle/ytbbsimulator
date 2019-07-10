'use strict';

let nums = require('../functions/numbers');
let lists = require('../functions/lists');

module.exports = {
    name: 'messageCreate',

    exec: (client, msg) => {
        let timeouts = {};
        nums.msgsRead = ++nums.msgsRead
        if (!msg.author.bot) {
            if (!timeouts[msg.channel.id]) {
                timeouts[msg.channel.id] = setTimeout(() => {
                    msg.channel.createMessage(lists.quotes[Math.floor(Math.random() * lists.quotes.length)]);
                    timeouts[msg.channel.id] = null;
                }, 30000);
            }
        }
    }
}