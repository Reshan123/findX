import './ProfileView.css'

import { FaUserCircle } from "react-icons/fa";

const ProfileView = () => {
    return ( 
        <div className="profileView">
            <div className="topContainer">
                <div className="profilePhoto"><FaUserCircle /></div>
                <div className="profileDetails">
                    <div className="userName">Firstname Lastname</div>
                    <div className="email">email@something.com</div>
                    <div className="contactNo">+94 77 123 4567</div>
                </div>
            </div>
        </div>
     );
}
 
export default ProfileView;