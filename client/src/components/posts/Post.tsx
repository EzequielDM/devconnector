import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../../reducers/index";
import Spinner from "../layout/Spinner";
import { useEffect } from "react";
import { getPost, clearPost } from "../../actions/post";
import { Link } from "react-router-dom";
import CommentItem from "./CommentItem";
import AddComment from "./AddComment";

const Post = ({ match }: any) => {
  const dispatch = useDispatch();
  const id = match.params.id;

  const isLoading = useSelector((state: RootState) => state.post.loading);
  const post = useSelector((state: RootState) => state.post.post);

  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);

  if (isLoading) return <Spinner />;

  if (!post)
    return (
      <div>
        <h2>This post could not be found. 🤔🔍</h2>
      </div>
    );

  return (
    <>
      <Link to="/posts" className="btn" onClick={() => dispatch(clearPost() as any)}>
        Back To Posts
      </Link>
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${post.user}`}>
            <img className="round-img" src={post.avatar} alt="" />
            <h4>{post.name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{post.text}</p>
        </div>
      </div>

      {/* TODO: Add comment form */}
      <AddComment />

      {post.comments && post.comments.length > 0 && (
        <>
          <p className="lead">Comments</p>
          <div className="comments">
            {post.comments.map((comment) => (
              <CommentItem comment={comment} key={comment._id} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Post;
