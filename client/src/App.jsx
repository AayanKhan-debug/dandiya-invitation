import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreatorPage from './pages/CreatorPage';
import InvitationView from './pages/InvitationView';
import InvitationExperience from './components/InvitationExperience';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreatorPage />} />
        <Route path="/i/:inviteId" element={<InvitationView />} />
        {/* Support the old direct URL for legacy purposes if needed, though they don't have a name */}
        <Route path="/demo" element={<InvitationExperience />} />
      </Routes>
    </Router>
  );
}

export default App;
