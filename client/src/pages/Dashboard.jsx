import React, { useState, useEffect } from "react";

import { useAuthContext } from "../hooks/useAuthContext";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { createProject } from "../controllers/projectControllers/createProjectController";
import { getAllUserProject } from "../controllers/projectControllers/getAllUserProjects";
import { getAllProjectTasks } from "../controllers/taskController/getAllProjectTasks";
import { createTask } from "../controllers/taskController/createTask";
import { joinProject } from "../controllers/projectControllers/joinProject";
import { leaveProject } from "../controllers/projectControllers/leaveProject";

import NavBar from "../components/NavBar";
import SideMenu from "../components/SideMenu";
import Chat from "../components/Chat";
import DashboardHome from "../components/DashboardHome";
import CreateProjectForm from "../components/CreateProjectForm";
import ProjectHome from "../components/ProjectHome";
import CreateTaskForm from "../components/CreateTaskForm";
import JoinProjectForm from "../components/JoinProjectForm";

function Home() {
  const { user } = useAuthContext();

  {
    /*     HANDLE STATES      */
  }
  const [userProjects, setUserProjects] = useState([]);
  const [projectTasks, setProjectTasks] = useState([]);

  const [projectId, setProjectId] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [connectionString, setConnectionString] = useState("")

  {
    /*     TOGGLE STATES   */
  }
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isHomeOpen, setIsHomeOpen] = useState(true);
  const [isCreateProjectShow, setIsCreateProjectShow] = useState(false);
  const [isJoinProjectShow, setIsJoinProjectShow] = useState(false);
  const [isProjectOpen, setIsprojectOpen] = useState(false);

  const [isProjectTasksOpen, setIsProjectTasksOpen] = useState(false);
  const [isProjectDashboardOpen, setIsProjectDashboardOpen] = useState(true);
  const [isProjectCreateTaskShow, setIsProjectCreateTaskShow] = useState(false);

  const [isProjectLeave, setIsProjectLeave] = useState(false)

  const [isAddProjectClicked, setAddProject] = useState(false);

  {
    /*     HANDLE FUNCTIONS      */
  }
  const handleCreateProject = async (data) => {
    const title = data.title;
    const description = data.description;

    try {
      const newProject = await createProject(user, title, description);
      setUserProjects([...userProjects, newProject]);
      setIsCreateProjectShow(false);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const handleCreateTask = async (data) => {
    const title = data.title;
    const description = data.description;
    const project_id = data.project_id;
    try {
      const newTask = await createTask(user, title, description, project_id);
      setProjectTasks([...projectTasks, newTask]);
      setIsProjectCreateTaskShow(false);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const handleLeaveProject = async () => {
    try {
      const response = await leaveProject(user, projectId);
  
      
    } catch (error) {
      console.error("Error leaving project:", error);
      setIsProjectLeave(false);
    }
  };
  

  const handleJoinProject = async (data) => {
    const connectionString = data.connectionString
    setConnectionString(connectionString)

    try {
      const newProject = await joinProject(user, connectionString);
      setUserProjects([...userProjects, newProject]);
      setIsJoinProjectShow(false);
    } catch (error) {
      console.error("Error joining project:", error);
    }
  };

  {
    /*     TOGGLE FUNCTIONS      */
  }
  const toggleChat = () => {
    setIsChatOpen(true);
    setIsHomeOpen(false);
    setIsprojectOpen(false);
  };

  const toggleHome = () => {
    setIsHomeOpen(true);
    setIsChatOpen(false);
    setIsprojectOpen(false);
  };

  const toggleCreateProject = () => {
    setIsCreateProjectShow(!isCreateProjectShow);
  };

  const toggleJoinProject = () => {
    setIsJoinProjectShow(!isJoinProjectShow);
  };

  const toggleAddProject = () => {
    setAddProject(!isAddProjectClicked);
  };

  const toggleOpenProject = (projectId, projectTitle) => {
    setIsprojectOpen(true);
    setProjectId(projectId);
    setProjectTitle(projectTitle);

    setIsHomeOpen(false);
    setIsChatOpen(false);
    setIsProjectDashboardOpen(true);
    setIsProjectTasksOpen(false);
    setProjectTasks([]);
  };

  {
    /*     PROJECT TOGGLE      */
  }

  const toggleShowProjectTasks = () => {
    setIsProjectTasksOpen(true);
    setIsProjectDashboardOpen(false);
  };

  const toggleShowProjectDashboard = () => {
    setIsProjectDashboardOpen(true);
    setIsProjectTasksOpen(false);
  };

  const toggleCreateProjectTask = () => {
    setIsProjectCreateTaskShow(!isProjectCreateTaskShow);
  };

  {
    /*     RECEIVE FUNCTIONS      */
  }
  const receiveBodyCreateProject = (data) => {
    handleCreateProject(data);
  };

  const receiveBodyJoinProject = (data) => {
    handleJoinProject(data);
  };

  const receiveBodyCreateTask = (data) => {
    handleCreateTask(data);
  };

  const receiveLeaveStatus = (data) => {
    setIsProjectLeave(data.leave)

    console.log(isProjectLeave)
  }

  useEffect(() => {
    if (user && user.token) {
      try {
        const fetchData = async () => {
          const response = await getAllProjectTasks(user, projectId);

          if (response.tasks && response.message) {
            const { message, tasks } = response;
            setProjectTasks([...tasks]);
            toast.success(message);
          } else {
            console.error("Response does not contain a valid message.");
          }
        };

        fetchData();
      } catch (error) {
        toast.error(error.response);
      }
    }
  }, [user, projectId]);

  useEffect(() => {
    if (user && user.token) {
      try {
        const fetchData = async () => {
          const response = await getAllUserProject(user);
          if (response.projects && response.message) {
            const { message, projects } = response;
            setUserProjects([...projects]);
            toast.success(message);
          } else {
            console.error("Response does not contain a valid message.");
          }
        };

        fetchData();
      } catch (error) {
        toast.error(error.response);
      }
    }
  }, [user, connectionString, projectId, isProjectLeave]);

  return (
    <div className="relative z-0 flex flex-col h-screen w-screen">
      <NavBar />
      <div className="relative h-full w-full flex">
        <SideMenu
          onChatClick={toggleChat}
          onHomeClick={toggleHome}
          onCreateProjectClick={toggleCreateProject}
          onJoinProjectClick={toggleJoinProject}
          onAddProjectClick={toggleAddProject}
          onOpenProjectClick={toggleOpenProject}
          isAddProjectClicked={isAddProjectClicked}
          userProjects={userProjects}
        />

        {isChatOpen ? <Chat /> : null}
        {isHomeOpen ? <DashboardHome /> : null}
        {isProjectOpen ? (
          <ProjectHome
            onShowProjectTasks={toggleShowProjectTasks}
            isProjectTasksOpen={isProjectTasksOpen}
            onShowProjectDashboard={toggleShowProjectDashboard}
            isProjectDashboardOpen={isProjectDashboardOpen}
            projectTasks={projectTasks}
            onCreateTask={toggleCreateProjectTask}
            handleLeaveProject={handleLeaveProject}
            onHomeClick={toggleHome}
            sendLeaveData={receiveLeaveStatus}
          />
        ) : null}
      </div>
      {isCreateProjectShow ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70">
          <div className="w-1/2 h-1/2 bg-slate-600 rounded-md z-10">
            <CreateProjectForm
              onCreateProjectClick={toggleCreateProject}
              sendDataToCreateProject={receiveBodyCreateProject}
            />
          </div>
        </div>
      ) : null}
      {isJoinProjectShow ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70">
          <div className="w-1/2 h-1/2 bg-slate-600 rounded-md z-10">
            <JoinProjectForm
              onJoinProjectClick={toggleJoinProject}
              sendDataToJoinProject={receiveBodyJoinProject}
            />
          </div>
        </div>
      ) : null}
      {isProjectCreateTaskShow ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70">
          <div className="w-1/2 h-1/2 bg-slate-600 rounded-md z-10">
            <CreateTaskForm
              onCreateTaskClick={toggleCreateProjectTask}
              sendDataToCreateTask={receiveBodyCreateTask}
              projectId={projectId}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Home;
