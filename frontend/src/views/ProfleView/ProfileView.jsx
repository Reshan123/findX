import './ProfileView.css'

import { FaUserCircle } from "react-icons/fa";
import { useUserContext } from '../../context/UserContext';

const ProfileView = () => {

    const { user } = useUserContext()

    return ( 
        <div className="profileView">
            <div className="topContainer">
                <div className="profilePhoto"><FaUserCircle /></div>
                <div className="profileDetails">
                    <div className="userName">{user[1] && (user[1].first_name + " " + user[1].last_name) }</div>
                    <div className="email">{user[1] && user[1].email}</div>
                    <div className="contactNo">{user[1] && user[1].contact_no}</div>
                </div>
            </div>
        </div>
     );
}
 
export default ProfileView;