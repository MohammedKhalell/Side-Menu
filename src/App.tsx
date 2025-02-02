import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import MainLayout from "./components/MainLayout";
import KnowledgeBasePage from "./components/KnowledgeBasePage";

import "./styles/sidemenu.scss";
import "./styles/Main.scss";
import "./styles/AddNewCollection.scss";


const App: React.FC = () => {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <MainLayout>
                  <KnowledgeBasePage />
                </MainLayout>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
