import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPosts } from "../../actions/post";
import { RootState } from "../../reducers";
import Spinner from "../layout/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import PostItem from "./PostItem";

const Posts = () => {
  const dispatch = useDispatch();

  const loading = useSelector((state: RootState) => state.post.loading);
  const posts = useSelector((state: RootState) => state.post.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  if (loading) return <Spinner />;

  return (
    <>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <FontAwesomeIcon icon={faUserCircle} /> Welcome to the community!
      </p>

      {/* PostForm */}
      <div className="posts">
        {posts && posts.map((post) => <PostItem key={post._id} post={post} />)}
      </div>
    </>
  );
};

export default Posts;
