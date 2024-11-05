// import Header from './Header';
import Navigation from '../pages/Auth/Navigation';
import { Outlet } from 'react-router';
// import Footer from './Footer';

export default function Layout() {
  return (
    <div>
      {/* <Header/> */}
      <Navigation/>
      <main className='py-3'>
      <Outlet/>
      </main>
      {/* <Footer/> */}
    </div>
  );
}
