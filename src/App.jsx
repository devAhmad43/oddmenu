import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loader from './Components/Loader/Loader';

const Navbar = lazy(() => import('./Components/Navbar/Navbar'));
const Layout = lazy(() => import('./Components/Layout'));
const Footer = lazy(() => import('./Components/Footer/Footer'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>{Loader}</div>}>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Layout />} />
        </Routes>
        <Footer/>
      </Suspense>
    </Router>
  );
}

export default App;

