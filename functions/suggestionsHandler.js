'use strict';

const fs = require('fs');
const owners = require('../functions/getOwners');
const lists = require('../functions/lists');

module.exports = {
    suggestions: [],

    initializeSuggestions: () => {
        return new Promise((resolve, reject) => {
            try {
                this.suggestions = require('../suggestions.json');
                resolve(this.suggestions);
            }catch (err) {
                reject(err);
            }
        })
    },

    addSuggestion: (msg, quote) => {
        if (!owners.isOwner(msg.author.id)) {
            msg.channel.createMessage('Thanks for the suggestion! I will message you if your suggestion is approved or denied!');
            this.suggestions.push({person: msg.author.id, suggestion: quote, upVotes: [msg.author.id], downVotes: []});
            fs.writeFileSync('../suggestions.json', JSON.stringify(this.suggestions));
        }else {
            msg.channel.createMessage('It\'s in the list now!');
            delete require.cache[require.resolve(`../lists.json`)];
            var theLists = require('../lists.json');
            theLists.quotes.push({suggestedBy: msg.author.id, quote});
            fs.writeFileSync('../lists.json', JSON.stringify(theLists));
            lists.reloadLists();
        }
    },

    moderateSuggestion: (client, quoteIndex, action, reason) => {
        switch (action) {
            case 'approve':
                client.getDMChannel(this.suggestions[quoteIndex].person).then(channel => {
                    channel.createMessage(`Your quote \`\`\`${this.suggestions[quoteIndex].suggestion}\`\`\` got approved!`);
                });
                delete require.cache[require.resolve(`../lists.json`)];
                var theLists = require('../lists.json');
                theLists.quotes.push({suggestedBy: this.suggestions[quoteIndex].person, quote: this.suggestions[quoteIndex].suggestion});
                delete this.suggestions[quoteIndex];
                fs.writeFileSync('../suggestions.json', JSON.stringify(this.suggestions));
                fs.writeFileSync('../lists.json', JSON.stringify(theLists));
                lists.reloadLists();
            break;
            case 'deny':
                client.getDMChannel(this.suggestions[quoteIndex].person).then(channel => {
                    channel.createMessage(`Your quote \`\`\`${this.suggestions[quoteIndex].suggestion}\`\`\` has been declined for the following reason: \`\`\`${reason}\`\`\``);
                });
                delete this.suggestions[quoteIndex];
                fs.writeFileSync('../suggestions.json', JSON.stringify(this.suggestions));
            break;
            case 'upvote':
                if (this.suggestions)
            break;
            case 'downvote':

            break;
        }
    }
}