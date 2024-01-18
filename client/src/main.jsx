import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { AuthContextProvider } from "./context/AuthContext.jsx";
import { ProjectContextProvider } from "./context/ProjectContext.jsx";
import { ShowFormContextProvider } from "./context/ShowFormContext.jsx";
import { TaskContextProvider } from "./context/TaskContext.jsx";
import { ChatContextProvider } from "./context/ChatContext.jsx";
import { MessageContextProvider } from "./context/MessageContext.jsx";
import { ChannelContextProvider } from "./context/ChannelContext.jsx";
import { BoardContextProvider } from "./context/BoardContext.jsx";
import { IdContextProvider } from "./context/IdContext.jsx";
import { SearchContextProvider } from "./context/SearchContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SearchContextProvider>
      <IdContextProvider>
        <BoardContextProvider>
          <ChannelContextProvider>
            <MessageContextProvider>
              <ChatContextProvider>
                <ProjectContextProvider>
                  <TaskContextProvider>
                    <AuthContextProvider>
                      <ShowFormContextProvider>
                        <App />
                      </ShowFormContextProvider>
                    </AuthContextProvider>
                  </TaskContextProvider>
                </ProjectContextProvider>
              </ChatContextProvider>
            </MessageContextProvider>
          </ChannelContextProvider>
        </BoardContextProvider>
      </IdContextProvider>
    </SearchContextProvider>
  </React.StrictMode>
);
