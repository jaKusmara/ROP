import React, { useState } from "react";

import NavBar from "../components/NavBar";
import SideMenu from "../components/SideMenu";
import Chat from "../components/Chat";
import DashboardHome from "../components/DashboardHome";
import CreateProjectForm from "../components/CreateProjectForm";

function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isHomeOpen, setIsHomeOpen] = useState(true);
  const [isCreateProjectShow, setIsCreateProjectShow] = useState(false);
  const [isAddProjectClicked, setAddProject] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(true);
    setIsHomeOpen(false);
  };

  const toggleHome = () => {
    setIsHomeOpen(true);
    setIsChatOpen(false);
  };

  const toggleCreateProject = () => {
    setIsCreateProjectShow(!isCreateProjectShow);
  };

  const toggleAddProject = () => {
    setAddProject(!isAddProjectClicked);
  };

  return (
    <div className="relative z-0 flex flex-col h-screen w-screen">
      <NavBar />
      <div className="relative flex h-full">
        <SideMenu
          onChatClick={toggleChat}
          onHomeClick={toggleHome}
          onCreateProjectClick={toggleCreateProject}
          onAddProjectClick={toggleAddProject}
          isAddProjectClicked={isAddProjectClicked}
        />
        {isChatOpen ? <Chat /> : null}
        {isHomeOpen ? <DashboardHome /> : null}
      </div>
      {isCreateProjectShow ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70">
          <div className="w-1/2 h-1/2 bg-slate-600 rounded-md z-10">
            <CreateProjectForm onCreateProjectClick={toggleCreateProject} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Home;
