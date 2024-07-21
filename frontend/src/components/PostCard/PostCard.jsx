import './PostCard.css'
import courseImage from '../../assets/courseImage.jpg'

import { FaComment } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { FaShareAlt } from "react-icons/fa";

const PostCard = ({ post }) => {
    return ( 
        <div className="postCard">
            <img src={post.imagePath || courseImage} alt="" />
            <div className="bottomContainer">
                <div className="interactiveContainer">
                    <div><BiLike />  <span>1.1k+</span></div>
                    <div><FaRegComment /> <span>100+</span></div>
                    {/* <FaShareAlt /> */}
                </div>
                <div className="postCaption">{post.description || ("Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur quo unde modi minus perspiciatis exercitationem doloremque suscipit et vel aliquam! Esse numquam possimus autem, quae molestiae harum mollitia omnis? Architecto. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste voluptates a praesentium ab tempore quia, ea unde corrupti atque incidunt quasi voluptatum voluptatem! Laudantium asperiores unde distinctio incidunt veniam velit. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut ipsam reiciendis tempora, asperiores repellendus ab magnam. Vero repudiandae veniam earum. Eos sed tempora neque culpa voluptate alias accusamus, ut sapiente? Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo laudantium debitis molestiae in sequi! Aliquid eos amet aspernatur autem sint illo, mollitia nisi provident esse dolore sunt maxime unde iusto! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique veritatis nobis dolor corporis eaque dolores, cupiditate eveniet? Cum beatae amet dolor corporis voluptatum placeat maxime asperiores incidunt, vero ipsam exercitationem.")}</div>
                <div className="postedOn">{post.postedOn || ("2024 June 15")}</div>
            </div>
        </div>
     );
}
 
export default PostCard;