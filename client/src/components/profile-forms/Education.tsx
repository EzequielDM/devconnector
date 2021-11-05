import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteEducation } from "../../actions/profile";
import { IEducation } from "../../actions/types";

interface Props {
  education?: IEducation[];
}

const Education = ({ education }: Props) => {
  const dispatch = useDispatch();

  const educations =
    education &&
    education.map((edu: any) => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td className="hide-sm">{edu.degree}</td>
        <td>
          {dayjs(edu.from).format("YYYY/MM/DD")} - {edu.to ? dayjs(edu.to).format("YYYY/MM/DD") : " Now"}
        </td>
        <td>
          <button onClick={() => dispatch(deleteEducation(edu._id))} className="btn btn-danger" style={{ borderRadius: "10px 20px" }}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <Link to={`/profile/education/${edu._id}`} className="btn btn-warning" style={{ borderRadius: "10px 20px" }}>
            <FontAwesomeIcon icon={faPencilAlt} />
          </Link>
        </td>
      </tr>
    ));

  return (
    <>
      <h2 className="my-2">Education Information</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </>
  );
};

export default Education;
