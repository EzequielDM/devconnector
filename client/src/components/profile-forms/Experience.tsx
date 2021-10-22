import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { deleteExperience } from "../../actions/profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { IExperience } from "../../actions/types";

interface Props {
  experience: IExperience[];
}

const Experience = ({ experience }: Props) => {
  const dispatch = useDispatch();

  const experiences =
    experience &&
    experience.map((exp: IExperience) => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td className="hide-sm">{exp.title}</td>
        <td>
          {dayjs(exp.from).format("YYYY/MM/DD")} - {exp.to ? dayjs(exp.to).format("YYYY/MM/DD") : " Now"}
        </td>
        <td>
          <button onClick={() => dispatch(deleteExperience(exp._id))} className="btn btn-danger" style={{ borderRadius: "10px 20px" }}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <Link to={`/profile/experience/${exp._id}`} className="btn btn-warning" style={{ borderRadius: "10px 20px" }}>
            <FontAwesomeIcon icon={faPencilAlt} />
          </Link>
        </td>
      </tr>
    ));

  return (
    <>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </>
  );
};

Experience.propTypes = {
  experience: PropTypes.array,
};

export default Experience;
