const Project = require('../models/projectModel')

const createProject = async (req, res) => {
    const { title, description } = req.body;

    try {
        const user_id = req.user._id

        const project = await Project.create({ user_id, title, description });
        
        res.status(200).json(project);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllProjects = async(req, res) => {
    const user_id = req.user._id

    try{
        const projects = await Project.find({ user_id }); 

        res.status(200).json(projects)
    }catch(error){
        res.status(400).json({ error: error.message });
    }
}


module.exports = { createProject, getAllProjects }