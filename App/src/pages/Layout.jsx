import {useState} from "react";
import {Outlet} from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import 'bootstrap/dist/css/bootstrap.min.css'
const Layout = () => {
  const [isOpen,setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }
  return <div>
      <Sidebar isOpen={isOpen} toggle={toggle}/>
      <Navbar toggle={toggle} />
      <Outlet />
    </div>
};

export default Layout;