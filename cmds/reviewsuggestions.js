'use strict';

const suggestions = require('../functions/suggestionsHandler');
const owners = require('../functions/getOwners');

module.exports = {
    name: 'reviewsuggestions',

    exec: (client, msg, args) => {
        if (owners.isOwner(msg.author.id)) {
            if (suggestions.suggestions.length < 1) {
                msg.channel.createMessage('There are no suggestions right now!');
            }
            msg.channel.createMessage({
                embed: {
                    title: 'Suggestion Reviewer v0.5.1 alpha',
                    description: 'Lets start reviewing these suggestions!',
                    fields: [
                        {
                            name: 'Current Quote',
                            value: suggestions.suggestions[currentSelected].suggestion,
                            inline: false
                        },
                        {
                            name: 'Person who had the idea',
                            value: `${client.users.get(suggestions.suggestions[currentSelected].person).username}#${client.users.get(suggestions.suggestions[currentSelected].person).discriminator} (${suggestions.suggestions[currentSelected].person})`,
                            inline: false
                        },
                        {
                            name: 'Upvotes',
                            value: suggestions.suggestions[currentSelected].upVotes,
                            inline: true
                        },
                        {
                            name: 'Downvotes',
                            value: suggestions.suggestions[currentSelected].downVotes,
                            inline: true
                        }
                    ]
                }
            })
        }
    },

    options: {
        hidden: true
    }
}