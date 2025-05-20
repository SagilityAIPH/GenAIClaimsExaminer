import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';

import WordToPDFViewer from './components/WordToPDFViewer';

function App() {
  return (
    <>
    <Router basename="/GenAIClaimsExaminer">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/viewer" element={<WordToPDFViewer />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
    </>
  );
}

export default App;