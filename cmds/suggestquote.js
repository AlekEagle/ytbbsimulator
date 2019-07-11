'use strict';

const suggestions = require('../functions/suggestionsHandler');

module.exports = {
    name: 'suggest',

    exec: (client, msg, args) => {
        suggestions.addSuggestion(msg, args.join(' '));
    },

    options: {
        description: 'Suggests a quote!',
        usage: '<quote>',
        guildOnly: true
    }
}