import { ChangeEvent, useState, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../actions/post";
import { IPost } from "../../actions/types";
import { RootState } from "../../reducers";

const PostForm = () => {
  const dispatch = useDispatch();

  const userAuth = useSelector((state: RootState) => state.auth.user);

  const [text, setText] = useState("");
  const [_id, setIdField] = useState("");

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const onChangeId = (e: ChangeEvent<HTMLInputElement>) => {
    setIdField(e.target.value);
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const post: IPost = {
      _id: _id,
      avatar: "",
      comments: [],
      date: new Date(),
      likes: [],
      name: "",
      text,
      user: "",
    };

    dispatch(addPost(post));
    setText("");
    setIdField("");
  };

  return (
    <form className="form my-1" onSubmit={onSubmit}>
      <div className="form-group">
        <textarea
          name="text"
          cols={30}
          rows={5}
          placeholder="Create a post"
          value={text}
          onChange={onChange}
          required></textarea>
      </div>
      {userAuth && userAuth.role === "admin" && (
      <div className="form-group">
        <input type="text" name="_id" placeholder="Sudo user ID (Admin)" value={_id} onChange={onChangeId} />
      </div>
      )}  
      <input type="submit" className="btn btn-dark my-1" value="Submit" />
    </form>
  );
};

export default PostForm;
