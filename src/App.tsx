import { Routes, Route } from 'react-router-dom';
import Layout from "./components/Layout";
import Landing from "./pages/Landing";

// Create placeholder components for the new routes
const ChatPage = () => <div className="p-8 text-center">AI Chat Interface - Study, Plan, and Ideation Modes</div>;
const LMRPage = () => <div className="p-8 text-center">LMR Tools - Learning Material Resources and Key Questions Provider</div>;
const ImageGenPage = () => <div className="p-8 text-center">Multilingual Image Generation System - Educational Posters and Visuals</div>;

const App = () => {
  return (
    <Routes>
      <Route path="/" element={
        <Layout>
          <Landing />
        </Layout>
      } />
      <Route path="/chat" element={
        <Layout>
          <ChatPage />
        </Layout>
      } />
      <Route path="/lmr" element={
        <Layout>
          <LMRPage />
        </Layout>
      } />
      <Route path="/image-gen" element={
        <Layout>
          <ImageGenPage />
        </Layout>
      } />
    </Routes>
  );
};

export default App;