var MessagesModel = require('./messages.model');
var response = require('../../lib/response');

exports.create = async (req, res) => {
    try {
        const newMessage = new MessagesModel(req.body);
        const data = await newMessage.save();
        return response.success(res, data);
    } catch(err) {
        return response.error(res, err);
    };
}

exports.readAll = async (req, res) => {
    try {
        const messages = await MessagesModel.find().lean().exec();
        return response.success(res, messages);
    } catch(err) {
        return response.error(res, err);
    }
}

exports.getMessage = async (req, res) => {
    try {
        const message = MessagesModel.findById(req.params.id).lean().exec();
        if(message) {
            return response.error(res, null, "message details not found", 404);
        }
        return response.success(res, message);
    } catch(err) {
        return response.error(res, err);
    }
}

exports.updateMessage = async (req, res) => {
    try {
        await MessagesModel.update(req.params.id, {$set: req.body});
        return response.success(res, {msg: "updated successfully"});
    } catch(err) {
        return response.error(res, err);
    }
}

exports.removeMessage = async (req, res) => {
    try {
        await MessagesModel.remove({_id: req.params.id});
        return response.success(res, {msg: "message removed successfully"});
    } catch(err) {
        return response.error(res, err);
    }
}