import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import MainLayout from "./components/MainLayout";
import KnowledgeBasePage from "./components/KnowledgeBasePage";

import "./components/sidemenu.scss";
import "./components/Main.scss";
import "./components/AddNewCollection.scss";


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
