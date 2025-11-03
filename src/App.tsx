import { Routes, Route } from 'react-router-dom';
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import AIChatPage from "./components/AIChat/AIChatPage";
import LMRPage from "./components/LMR/LMRPage";
import ImageGenPage from "./components/ImageGen/ImageGenPage";

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
          <AIChatPage />
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