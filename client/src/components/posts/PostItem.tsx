import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { IPost } from "../../actions/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown, faThumbsUp, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../reducers";
import { deletePost, dislikePost, likePost, clearPost, deletePostAdmin, ghostLikePost } from "../../actions/post";
interface Props {
  post: IPost;
}

const Post = ({ post: { _id, avatar, comments, date, likes, name, text, user } }: Props) => {
  const authUserId = useSelector((state: RootState) => state.auth.user?._id);
  const authUser = useSelector((state: RootState) => state.auth.user);

  const dispatch = useDispatch();

  return (
    <div className="post bg-white p-1 my-1" id={_id}>
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="profile" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">Posted on {dayjs(date).format("MMMM DD, YYYY")}</p>
        <button type="button" className="btn btn-light" onClick={() => dispatch(likePost(_id))}>
          <FontAwesomeIcon icon={faThumbsUp} /> {likes.length > 0 && <span style={{marginLeft: 5}}>{likes.length}</span>}
        </button>
        <button type="button" className="btn btn-light" onClick={() => dispatch(dislikePost(_id))}>
          <FontAwesomeIcon icon={faThumbsDown} />
        </button>
        <Link
          to={`/posts/${_id}`}
          className="btn btn-primary"
          onClick={() => dispatch(clearPost() as any)}>
          Discussion{" "}
          {comments.length > 0 && <span className="comment-count">{comments.length}</span>}
        </Link>
        {authUserId && authUserId === user && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => dispatch(deletePost(_id))}>
            <FontAwesomeIcon icon={faTimesCircle} />
          </button>
        )}
        {authUserId && authUser?.role === "admin" && (
          <button
            type="button"
            className="btn btn-warning"
            style={{marginLeft: 25}}
            onClick={() => dispatch(deletePostAdmin(_id))}
          >
            <FontAwesomeIcon icon={faTimesCircle} />
          </button>
        )}
        {authUserId && authUser?.role === "admin" && (
          <button
            type="button"
            className="btn btn-success"
            onClick={() => dispatch(ghostLikePost(_id))}
          >
            <FontAwesomeIcon icon={faThumbsUp} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Post;
