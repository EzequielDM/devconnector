import { ChangeEvent, useState, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../actions/post";
import { RootState } from "../../reducers";
const AddComment = () => {
  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const _id = useSelector((state: RootState) => state.post.post?._id);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);

    return true;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    dispatch(addComment(_id ? _id : "", text));
    setText("");
  };

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave A Comment</h3>
      </div>
      <form className="form my-1" onSubmit={onSubmit}>
        <textarea
          name="text"
          cols={30}
          rows={5}
          placeholder="Comment on this post"
          value={text}
          onChange={onChange}
          required></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

export default AddComment;
