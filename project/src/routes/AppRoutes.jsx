import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Home from '../pages/Home';
import SignIn from '../pages/Auth/SignIn';
import SignUp from '../pages/Auth/SignUp';
import ImageAnalysis from '../pages/ImageAnalysis';
import TwitterPage from '../pages/TwitterPage';
import FacebookPage from '../pages/FacebookPage';
import InstagramPage from '../pages/InstagramPage';
import AnalysisWrapper from '../pages/AnalysisWrapper';
import {Toaster} from 'react-hot-toast'


function AppRoutes() {
  return (
    <>
    <Toaster/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      
      <Route path="/twitter" element={<TwitterPage />} />
       <Route path="/facebook" element={<FacebookPage />} />
        <Route path="/instagram" element={<InstagramPage />} />
      <Route path="/analysis" element={
        // <ProtectedRoute>
        <AnalysisWrapper/>

        // </ProtectedRoute>
      } />
    </Routes>
    </>
  );
}

export default AppRoutes;