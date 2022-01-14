import { IComment } from "../../actions/types";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers/index";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteComment } from "../../actions/post";
interface Props {
  comment: IComment;
}

const CommentItem = ({ comment }: Props) => {
  const { avatar, name, text, user, date, _id } = comment;
  const auth = useSelector((state: RootState) => state.auth.user?._id);
  const postID = useSelector((state: RootState) => state.post.post?._id);

  const dispatch = useDispatch();

  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <a href={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </a>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">Posted on {dayjs(date).format("DD/MM/YYYY HH:mm:ss")}</p>
        {user === auth && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={(e) => dispatch(deleteComment(postID || "", _id))}>
            <FontAwesomeIcon icon={faTimes} fixedWidth />
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
