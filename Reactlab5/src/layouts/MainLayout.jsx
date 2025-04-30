import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <>
      <Header />
      <main style={{ padding: '20px', minHeight: '75vh' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
