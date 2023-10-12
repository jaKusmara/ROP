const mongoose = require('mongoose');

const Project = require('../models/projectModel');
const randomToken = require('random-token').create('abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');

//  CREATE PROJECT
const createProject = async (req, res) => {
    const { title, description } = req.body;
    const user_id = req.user._id;

    try {
        const connectionString = randomToken(8);

        const project = await Project.create({
            members: [{ user_id }],
            title,
            description,
            connectionString,
        });

        res.status(200).json(project);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// GET PROJECTS FOR A USER
const getAllUserProjects = async (req, res) => {
    const user_id = req.user._id;

    try {
        const projects = await Project.find({
            "members.user_id": user_id
        });

        if (!projects || projects.length === 0) {
            return res.status(404).json({ error: 'No projects found for the user' });
        }

        res.status(200).json(projects);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// JOIN PROJECT
const joinProject = async (req, res) => {
    const connectionString = req.body.connectionString;
    const user_id = req.user._id;

    try {
        const updatedProject = await Project.findOneAndUpdate(
            { connectionString: connectionString, "members.user_id": { $ne: user_id } },
            { $push: { "members": { user_id: user_id } } },
            { new: true }
        );

        if (!updatedProject) {
            return res.status(404).json({ error: 'Project not found or user is already a member' });
        }

        res.status(200).json({ message: "Successfully joined the project" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// LEAVE PROJECT
const leaveProject = async (req, res) => {
    const connectionString = req.body.connectionString
    const user_id = req.user._id

    try{

        const updatedProject = await Project.findOneAndUpdate(
            { connectionString: connectionString },
            { $pull: { "members": { user_id: user_id } } },
            { new: true }
        );

        if (!updatedProject) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.status(200).json(updatedProject);
    }catch(error){
        res.status(401).json({error: error.message})
    }
}

//  DELETE PROJECT
const deleteProject = async (req, res) => {
    const project_id = req.body.project_id;

    try {
        const deletedProject = await Project.deleteOne(
            { _id: project_id }
            );

        if (deletedProject.deletedCount === 1) {
            res.status(200).json({ message: 'Project deleted successfully' });
        } else {
            res.status(404).json({ error: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



//test1
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI3MTExODJjMjU3YzIxYWZhZDZlMjAiLCJpYXQiOjE2OTcwOTc3OTgsImV4cCI6MTY5NzM1Njk5OH0.Ow4-94Gqg2aSkgrmJTO6djTSmAVOwzV9017RCx1g0Vo

//janko panko
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI3MTE1MDM4NGE0MWY1NDgzMWNjNzYiLCJpYXQiOjE2OTcwNTkxNTIsImV4cCI6MTY5NzMxODM1Mn0.Ta4fv2eDJNjpjF7yNwvzH9-Zb9_BdEnMngh_lIaXrTE

module.exports = { createProject, getAllUserProjects, joinProject, leaveProject, deleteProject }