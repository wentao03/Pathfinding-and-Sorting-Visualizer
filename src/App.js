import React from 'react';
import './App.css';
import PathfindingVisualizer from './PathfindingVisualizer/PathfindingVisualizer';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route exact path="/" element={<PathfindingVisualizer/>}/>
        <Route path="/sorting" element={<SortingVisualizer/>}/>

      </Routes>
    </Router>
    </>
  );
}

export default App;
