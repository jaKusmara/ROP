const Channel = require('../models/channelModel')
const Project = require('../models/projectModel')

//  CREATE CHANNEL
const createChannel = async (req, res) => {
    const { title } = req.body;
    const user_id = req.user._id;
    const project_id = req.body.project_id

    try {
        const channel = await Channel.create({ 
            members: [user_id], title
        });
        
        await Project.findByIdAndUpdate(
            project_id,
            { $push: { channels: channel._id } },
            { new: true }
        );

        res.status(200).json(channel);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// GET CHANNEL
const getAllChannels = async(req, res) => {
    const user_id = req.user._id

    try{
        const channels = await Channel.find(
            { members: user_id }
        ); 

        if (!channels) {
            return res.status(404).json({ error: 'Channel not found' });
        }

        res.status(200).json(channels)
    }catch(error){
        res.status(400).json({ error: error.message });
    }
}

// JOIN PROJECT
const joinChannel = async (req, res) => {
    const channel_id = req.body.channel_id
    const user_id = req.user._id;

    try {
        const updatedChannel = await Channel.findOneAndUpdate(
            { _id: channel_id },
            { $push: { members: user_id } },
            { new: true }
        );

        if (!updatedChannel) {
            return res.status(404).json({ error: 'Channel not found' });
        }

        res.status(200).json(updatedChannel);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


//  DELETE CHANNEL
const deleteChannel = async (req, res) => {
    const channel_id = req.body.channel_id;

    try {
        const deletedChannel = await Channel.deleteOne(
            { _id: channel_id }
            );

        if (deletedChannel.deletedCount === 1) {
            res.status(200).json({ message: 'Channel deleted successfully' });
        } else {
            res.status(404).json({ error: 'Channel not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = { createChannel, getAllChannels, joinChannel, deleteChannel }