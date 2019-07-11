'use strict';

let nums = require('../functions/numbers');
let timeouts = require('../functions/channelTimeouts');

module.exports = {
    name: 'messageCreate',

    exec: (client, msg) => {
        ++nums.msgsRead;
        timeouts.startTimeout(msg);
    }
}