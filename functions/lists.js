'use strict';

module.exports = {
    quotes: require('../lists.json').quotes,

    reloadlists: () => {
        delete require.cache[require.resolve(`../lists.json`)]
        module.exports.quotes = require('../lists.json').quotes;
    }
}