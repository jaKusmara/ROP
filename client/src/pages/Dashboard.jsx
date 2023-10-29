import React, { useState, useEffect } from "react";

import { useAuthContext } from "../hooks/useAuthContext";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { createProject } from "../controllers/projectControllers/createProjectController";
import { getAllUserProjects } from "../controllers/projectControllers/getAllUserProjects";
import { getAllProjectTasks } from "../controllers/taskController/getAllProjectTasks";
import { createTask } from "../controllers/taskController/createTask";
import { joinProject } from "../controllers/projectControllers/joinProject";
import { leaveProject } from "../controllers/projectControllers/leaveProject";
import { getUserTasks } from "../controllers/taskController/getUsersTasks";
import { getTaskById } from "../controllers/taskController/getTaskById";
import { leaveTask } from "../controllers/taskController/leaveTask";

import NavBar from "../components/NavBar";
import SideMenu from "../components/SideMenu";
import Chat from "../components/Chat";
import DashboardHome from "../components/DashboardHome";
import CreateProjectForm from "../components/CreateProjectForm";
import ProjectHome from "../components/ProjectHome";
import CreateTaskForm from "../components/CreateTaskForm";
import JoinProjectForm from "../components/JoinProjectForm";
import ShowedTask from "../components/ShowedTask";

function Dashboard() {
  const { user } = useAuthContext();

  {
    /*     HANDLE STATES      */
  }
  const [userProjects, setUserProjects] = useState([]);
  const [userTasks, setUserTasks] = useState([]);
  const [projectTasks, setProjectTasks] = useState([]);
  const [showedTask, setShowedTask] = useState({});

  const [projectId, setProjectId] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [showedTaskId, setShowedTaskId] = useState("");
  const [showedTaskTitle, setShowedTaskTitle] = useState("");

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

  const [isTaskShow, setIsTaskShow] = useState(false);

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

      if (response.isLeaving) {
        removeProjectFromUserProjects(projectId);
        setProjectId("");
      }
    } catch (error) {
      console.error("Error leaving project:", error);
    }
  };

  const handleLeaveTask = async () => {
    try {
      const response = await leaveTask(user, showedTaskId);

      if (response.isLeaving) {
        removeTaskFromUserTasks(showedTaskId);
        setShowedTaskId("");
      }
    } catch (error) {
      console.error("Error leaving project:", error);
    }
  };

  const handleJoinProject = async (data) => {
    const connectionString = data.connectionString;
    setConnectionString(connectionString);

    try {
      const newProject = await joinProject(user, connectionString);
      setUserProjects([...userProjects, newProject]);
      setIsJoinProjectShow(false);
    } catch (error) {
      console.error("Error joining project:", error);
    }
  };

  const removeProjectFromUserProjects = (projectId) => {
    const updatedUserProjects = userProjects.filter(
      (project) => project._id !== projectId
    );
    setUserProjects(updatedUserProjects);
  };

  const removeTaskFromUserTasks = (showedTaskId) => {
    const updatedUserTasks = userTasks.filter(
      (task) => task._id !== showedTaskId
    );
    setUserTasks(updatedUserTasks);
  };

  {
    /*     TOGGLE FUNCTIONS      */
  }
  const toggleChat = () => {
    setIsChatOpen(true);
    setIsHomeOpen(false);
    setIsprojectOpen(false);
    setIsProjectTasksOpen(false);
  };

  const toggleHome = () => {
    setIsHomeOpen(true);
    setIsChatOpen(false);
    setIsprojectOpen(false);
    setIsProjectTasksOpen(false);
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

  const toggleShowTask = (taskId, taskTitle) => {
    setShowedTaskId(taskId);
    setShowedTaskTitle(taskTitle);
    setIsTaskShow(!isTaskShow);
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


  {
    /*     PROJECT TASKS      */
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
  }, [user, projectId, isProjectTasksOpen]);

  {
    /*     USER PROJECTS      */
  }

  useEffect(() => {
    if (user && user.token) {
      try {
        const fetchData = async () => {
          const response = await getAllUserProjects(user);

          console.log(response);

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
  }, [user, projectId]);

  {
    /*     USER TASKS      */
  }

  useEffect(() => {
    if (user && user.token) {
      try {
        const fetchData = async () => {
          const response = await getUserTasks(user);

          if (response.tasks && response.message) {
            const { message, tasks } = response;

            setUserTasks([...tasks]);
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
  }, [user, isHomeOpen]);

  {
    /*     TASK BY ID      */
  }

  useEffect(() => {
    if (user && user.token && showedTaskId) {
      try {
        const fetchData = async () => {
          console.log(showedTaskId);
          const response = await getTaskById(user, showedTaskId);

          console.log(response);

          if (response.task && response.message) {
            const { message, task } = response;
            console.log(task.project_id)
            setShowedTask(task);
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
  }, [user, showedTaskId]);

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
        {isHomeOpen ? (
          <DashboardHome
            userProjects={userProjects}
            userTasks={userTasks}
            onOpenProjectClick={toggleOpenProject}
            onShowedTask={toggleShowTask}
          />
        ) : null}
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
            onShowTask={toggleShowTask}
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
      {isTaskShow ? (
        <div
          onClick={toggleShowTask}
          className="absolute inset-0 flex items-center justify-center bg-black/70"
        >
          <div className="w-1/2 h-1/2 bg-slate-600 rounded-md z-10">
            <ShowedTask
              showedTask={showedTask}
              projectTitle={projectTitle}
              handleLeaveTask={handleLeaveTask}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Dashboard;
