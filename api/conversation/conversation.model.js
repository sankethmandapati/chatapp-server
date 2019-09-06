var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
    members: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        addedOn: Date,
        removedOn: Date,
        isActive: {
            type: Boolean,
            default: true
        },
        addedBy: mongoose.Schema.Types.ObjectId,
        removedBy: mongoose.Schema.Types.ObjectId
    }],
    isGroupChat: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdOn: Date,
    deletedOn: Date,
    groupChatDetails: {
        name: String,
        nameUpdatedOn: Date,
        dp: String,
        dpUpdatedOn: Date
    }
});

module.exports = mongoose.model('Conversation', ConversationSchema);
