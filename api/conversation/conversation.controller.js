var Conversation = require('./conversation.model');
var messages = require('../messages/messages.controller');
const { ObjectId } = require('mongoose').Types;

async function checkIfAdmin(selfId, conversationId) {
    const conversation = await Conversation.aggregate([{
        $match: {
            _id: ObjectId(conversationId)
        },
        $filter: {
            input: "$members",
            as: "member",
            cond: {
                $eq: {
                    "$$member.userId": ObjectId(selfId)
                }
            }
        }
    }]).exec();
    if(conversation[0].members[0].isAdmin)
        return true;
    throw new Error("You are not an admin");
}

async function updateMember(selfId, conversationId, userId, updateObj) {
    await checkIfAdmin(selfId, conversationId);
    await Conversation.findOneAndUpdate({
        _id: conversationId,
        "members.userId": userId
    }, {
        $set: updateObj
    });
    return true;
}

async function checkIfConversationExists(conversationId) {
    const conversation = await Conversation.findOne({_id: ObjectId(conversationId)})
        .select('members, isActive')
        .lean()
        .exec();
    const conversationExists = (conversation && conversation.isActive) ? 
        conversation : 
        false;
    return conversationExists;
}

exports.create = async (data) => {
    try {
        data.createdOn = new Date();
        const newConversation = new Conversation(data);
        const conversation = await newConversation.save();
        return conversation;
    } catch(err) {
        throw new Error("Unexpected error while creating conversation");
    }
}

exports.addMember = async (data) => {
    try {
        await checkIfAdmin(selfId, conversationId);
        await Conversation.findOneAndUpdate({
            _id: data.conversationId
        }, {
            $push: {
                members: data.members.map(m => ({
                    userId: m,
                    addedBy: data.selfId,
                    addedOn: new Date()
                }))
            }
        });
        return "Members added successfully";
    } catch(err) {
        throw new Error("Unexpected error while updating conversation");
    }
}

exports.removeMember = async (data) => {
    try {
        await updateMember(data.selfId, data.conversationId, data.userId, {
            "members.$.isActive": false,
            "members.$.removedBy": data.selfId
        });
        return "Member removed successfully";
    } catch(err) {
        throw new Error("Unexpected error while updating conversation");
    }
}

exports.makeAdmin = async (data) => {
    try {
        await updateMember(data.selfId, data.conversationId, data.userId, {
            "members.$.isAdmin": true
        });
        return "Member made admin successfully!";
    } catch(err) {
        throw new Error("Unexpected error while updating conversation");
    }
}

exports.removeGroup = async (data) => {
    try {
        await checkIfAdmin(selfId, conversationId);
        await Conversation.findOneAndUpdate({
            _id: data.conversationId
        }, {
            $set: {
                isActive: false
            }
        });
        return "Conversation deactivated successfully!";
    } catch(err) {
        throw new Error("Unexpected error while deactivating conversation");
    }
}

exports.getAllConversations = async (selfId) => {
    try {
        const conversations = await Conversation.aggregate([{
            $match: {
                "members.userId": ObjectId(selfId)
            }
        }, {
            $filter: {
                input: "$members",
                as: "member",
                cond: {
                    $ne: {
                        "$$member.userId": ObjectId(selfId)
                    }
                }
            }
        }, {
            $lookup: {
                localField: 'member.userId',
                foreignField: '_id',
                as: 'member.userDetails',
                from: 'User'
            }
        }]).exec();
        return conversations;
    } catch(err) {
        console.log("Error occured while getting conversations: ", err);
        throw new Error("Unexpected error occured");
    }
}

exports.sendMessage = async (messageObj, selfId) => {
    try {
        const conversation = await checkIfConversationExists(messageObj.conversationId);
        if(conversation) {
            const newMessage = await messages.create(messageObj);
            return newMessage;
        } else {
            throw new Error("Conversation doesnt exist");
        }
    } catch(err) {
        console.log("Error: ", err);
        throw new Error("Unexpected error!");
    }
}
