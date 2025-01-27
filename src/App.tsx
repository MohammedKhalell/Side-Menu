import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import SideManu from './components/sidemenu';
import './components/sidemenu.scss';
const App: React.FC = () => {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <SideManu />
              </>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
