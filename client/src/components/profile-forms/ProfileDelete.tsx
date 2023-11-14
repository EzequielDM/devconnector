import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteAccountAdmin } from "../../actions/profile";
import { useHistory } from "react-router-dom";

const ProfileDelete = ({ match }: any) => {
  const dispatch = useDispatch();
  const id = match.params.id;

  const history = useHistory();

  useEffect(() => {
    dispatch(deleteAccountAdmin(id));
    history.goBack();
  }, [dispatch, history, id]);

  return <></>;
};

export default ProfileDelete;
