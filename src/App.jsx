import { ResumeProvider } from '@/context/ResumeContext';
import Craftfolio from '@/components/Craftfolio';
import LandingPage from '@/components/LandingPage';
import { Toaster } from 'sonner';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <ResumeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/builder" element={<Craftfolio />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster position="top-right" />
        </div>
      </Router>
    </ResumeProvider>
  );
}

export default App;
