import { lazy, Suspense } from 'react';

const Hero = lazy(() => import('./Hero/Hero'));
const Product = lazy(() => import('./Products/Products'));
const Layout = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Hero />
        <Product />
      </Suspense>
    </div>
  );
};

export default Layout;

