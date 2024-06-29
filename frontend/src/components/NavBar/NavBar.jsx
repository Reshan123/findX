import './NavBar.css'
import logo from '../../assets/logo.png'

import { NavLink } from 'react-router-dom';
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";

const NavBar = ({ user }) => {

    const scrollToTop = () => window.scroll(0, 0)

    // const user = true;

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
                    {!user && (
                        <>
                            <NavLink to="/" onClick={scrollToTop}>Home</NavLink>
                            <NavLink to="/courses" onClick={scrollToTop}>Courses</NavLink>
                        </>
                    )}

                    {user && (
                        <>
                            <NavLink to="/" onClick={scrollToTop}>Home</NavLink>
                            <NavLink to="/courses" onClick={scrollToTop}>Courses</NavLink>
                            <div className='profileIcon'><FaUserCircle /><FaAngleDown className='arrowIcon' /></div>
                            <div className="dropDownMenu">
                                <NavLink to="/profile" onClick={scrollToTop}>Profile</NavLink>
                                <NavLink to="/settings" onClick={scrollToTop}>Settings</NavLink>
                                <NavLink to="/logout" onClick={scrollToTop}>Logout</NavLink>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </nav>
     );
}
 
export default NavBar;