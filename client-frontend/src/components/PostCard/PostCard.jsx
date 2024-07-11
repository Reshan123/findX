import './PostCard.css'
import courseImage from '../../assets/courseImage.jpg'

import { FaRegComment } from "react-icons/fa";
// import { BiLike } from "react-icons/bi";
// import { TiPin } from "react-icons/ti";

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PushPinIcon from '@mui/icons-material/PushPin';

const PostCard = ({ post }) => {

    const date = new Date(post.createdAt)
    const backendServerURL = import.meta.env.VITE_SERVER_URL
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const day = String(date.getDate()).padStart(2, '0')

    return (
        <>
            <Card>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="course">
                            A
                        </Avatar>
                    }
                    action={post.pinned && (
                        <IconButton aria-label="settings">
                            <PushPinIcon sx={{ rotate: '45deg' }} />
                        </IconButton>
                    )}
                    title={post.title}
                    subheader={(date.getFullYear() + " " + months[date.getMonth()] + " " + day) || ("2024 June 15")}
                />
                <CardMedia
                    component="img"
                    width={'100%'}
                    image={`${backendServerURL}/${post.image}`}
                    alt="Paella dish"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {post.description || ("Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur quo unde modi minus perspiciatis exercitationem doloremque suscipit et vel aliquam! Esse numquam possimus autem, quae molestiae harum mollitia omnis? Architecto. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste voluptates a praesentium ab tempore quia, ea unde corrupti atque incidunt quasi voluptatum voluptatem! Laudantium asperiores unde distinctio incidunt veniam velit. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut ipsam reiciendis tempora, asperiores repellendus ab magnam. Vero repudiandae veniam earum. Eos sed tempora neque culpa voluptate alias accusamus, ut sapiente? Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo laudantium debitis molestiae in sequi! Aliquid eos amet aspernatur autem sint illo, mollitia nisi provident esse dolore sunt maxime unde iusto! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique veritatis nobis dolor corporis eaque dolores, cupiditate eveniet? Cum beatae amet dolor corporis voluptatum placeat maxime asperiores incidunt, vero ipsam exercitationem.")}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon /> <Typography>1.2k</Typography>
                    </IconButton>
                    <IconButton aria-label="comment" sx={{ display: 'flex', gap: '3px'}}>
                        <FaRegComment /> <Typography>50</Typography>
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </>
    );
}

export default PostCard;

// <div className="postCard" key={post._id}>
//     <div className="topContainer">
//         <div className="leftContainer">
//             <div className="postTitle">{post.title}</div>
//             <div className="postedOn">{(date.getFullYear() + " " + months[date.getMonth()] + " " + day) || ("2024 June 15")}</div>
//         </div>
//         <div className="rightContainer">
//             {post.pinned && <TiPin />}
//         </div>
//     </div>
//     <img src={post.imagePath || courseImage} alt="" />
//     <div className="bottomContainer">
//         <div className="interactiveContainer">
//             <div><BiLike />  <span>1.1k+</span></div>
//             <div><FaRegComment /> <span>100+</span></div>
//             <FaShareAlt />
//         </div>
//         <div className="postCaption">{post.description || ("Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur quo unde modi minus perspiciatis exercitationem doloremque suscipit et vel aliquam! Esse numquam possimus autem, quae molestiae harum mollitia omnis? Architecto. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste voluptates a praesentium ab tempore quia, ea unde corrupti atque incidunt quasi voluptatum voluptatem! Laudantium asperiores unde distinctio incidunt veniam velit. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut ipsam reiciendis tempora, asperiores repellendus ab magnam. Vero repudiandae veniam earum. Eos sed tempora neque culpa voluptate alias accusamus, ut sapiente? Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo laudantium debitis molestiae in sequi! Aliquid eos amet aspernatur autem sint illo, mollitia nisi provident esse dolore sunt maxime unde iusto! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique veritatis nobis dolor corporis eaque dolores, cupiditate eveniet? Cum beatae amet dolor corporis voluptatum placeat maxime asperiores incidunt, vero ipsam exercitationem.")}</div>
//     </div>
// </div>