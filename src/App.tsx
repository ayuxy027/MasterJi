import { Routes, Route } from 'react-router-dom';
import Layout from "./components/Layout";
import Landing from "./pages/Landing";

// Create placeholder components for the new routes
const ProductsPage = () => <div className="p-8 text-center">Products Page - Coming Soon</div>;
const AboutPage = () => <div className="p-8 text-center">About Page - Multilingual AI for Indian Education</div>;
const ChallengePage = () => <div className="p-8 text-center">Challenge Details - Building AI for 22 Indian Languages</div>;
const DocsPage = () => <div className="p-8 text-center">Documentation Page - Technical Details</div>;
const SignupPage = () => <div className="p-8 text-center">Join the Challenge - Register Now</div>;

const App = () => {
  return (
    <Routes>
      <Route path="/" element={
        <Layout>
          <Landing />
        </Layout>
      } />
      <Route path="/products" element={
        <Layout>
          <ProductsPage />
        </Layout>
      } />
      <Route path="/about" element={
        <Layout>
          <AboutPage />
        </Layout>
      } />
      <Route path="/challenge" element={
        <Layout>
          <ChallengePage />
        </Layout>
      } />
      <Route path="/docs" element={
        <Layout>
          <DocsPage />
        </Layout>
      } />
      <Route path="/signup" element={
        <Layout>
          <SignupPage />
        </Layout>
      } />
    </Routes>
  );
};

export default App;