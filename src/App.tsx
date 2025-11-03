import { Routes, Route } from 'react-router-dom';
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import AIChatPage from "./components/AIChat/AIChatPage";
import LMRPage from "./components/LMR/LMRPage";
import PostersPage from "./components/Posters/PostersPage";

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
      <Route path="/posters" element={
        <Layout>
          <PostersPage />
        </Layout>
      } />
    </Routes>
  );
};

export default App;