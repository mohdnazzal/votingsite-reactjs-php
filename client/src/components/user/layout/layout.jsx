import { Outlet } from "react-router-dom";
import {} from '../../../assets/styles/layout.css'; // Importing CSS file for styling
// import Navbar from "../../../components/common/User/Header"
import Footer from "../../../components/common/User/Footer"

export default function Layout() {
  return (
    <>
      <header>
        {/* <Navbar></Navbar> */}
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="footer-bg-color text-center text-md-start">
        <Footer></Footer>
      </footer>
    </>
  );
}
