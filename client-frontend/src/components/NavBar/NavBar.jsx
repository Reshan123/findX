import './NavBar.css'
import logo from '../../assets/logo.png'

import { NavLink } from 'react-router-dom';
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

const NavBar = () => {

    const scrollToTop = () => window.scroll(0, 0)

    return ( 
        <nav>
            <div className="topContainer">
                <div>
                    <MdEmail style={{fontSize: '1.1rem'}} /> : <a href="mailto:email@email.com" target='_blank'>email@email.com</a>
                </div>
                <div>
                    <FaPhoneAlt /> : <a href="tel:+94771234567">+94771234567</a>
                </div>
            </div>
            <div className="bottomContainer">
                <div className="logo">
                    <img src={logo} alt="" />
                </div>
                <div className="links">
                    <NavLink to="/" onClick={scrollToTop}>Home</NavLink>
                    <NavLink to="/courses" onClick={scrollToTop}>Courses</NavLink>
                    {/* <NavLink to="/profile" onClick={scrollToTop}><FaUserCircle /></NavLink> */}
                </div>
            </div>
        </nav>
     );
}
 
export default NavBar;