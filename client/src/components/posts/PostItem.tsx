import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { IPost } from "../../actions/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown, faThumbsUp, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../reducers";
import { dislikePost, likePost } from "../../actions/post";
interface Props {
  post: IPost;
}

const Post = ({ post: { _id, avatar, comments, date, likes, name, text, user } }: Props) => {
  const authUser = useSelector((state: RootState) => state.auth.user?._id);

  const dispatch = useDispatch();

  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to="/profile">
          <img className="round-img" src={avatar} alt="profile" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">Posted on {dayjs(date).format("MMMM DD, YYYY")}</p>
        <button
          type="button"
          className="btn btn-light"
          onClick={(e) => dispatch(likePost(_id)) as any}>
          <FontAwesomeIcon icon={faThumbsUp} /> {likes.length > 0 && <span>{likes.length}</span>}
        </button>
        <button
          type="button"
          className="btn btn-light"
          onClick={(e) => dispatch(dislikePost(_id)) as any}>
          <FontAwesomeIcon icon={faThumbsDown} />
        </button>
        <Link to={`/post/${_id}`} className="btn btn-primary">
          Discussion{" "}
          {comments.length > 0 && <span className="comment-count">{comments.length}</span>}
        </Link>
        {authUser && authUser === user && (
          <button type="button" className="btn btn-danger">
            <FontAwesomeIcon icon={faTimesCircle} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Post;
