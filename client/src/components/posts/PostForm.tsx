import { ChangeEvent, useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../../actions/post";
import { IPost } from "../../actions/types";

const PostForm = () => {
  const dispatch = useDispatch();

  const [text, setText] = useState("");

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const post: IPost = {
      _id: "",
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
  };

  return (
    <form className="form my-1" onSubmit={onSubmit}>
      <textarea
        name="text"
        cols={30}
        rows={5}
        placeholder="Create a post"
        value={text}
        onChange={onChange}
        required></textarea>
      <input type="submit" className="btn btn-dark my-1" value="Submit" />
    </form>
  );
};

export default PostForm;
