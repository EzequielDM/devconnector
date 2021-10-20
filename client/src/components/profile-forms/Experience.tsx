import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { deleteExperience } from "../../actions/profile";

const Experience = ({ experience }: any) => {
  const dispatch = useDispatch();

  const experiences =
    experience &&
    experience.map((exp: any) => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td className="hide-sm">{exp.title}</td>
        <td>
          {dayjs(exp.from).format("YYYY/MM/DD")} - {exp.to ? dayjs(exp.to).format("YYYY/MM/DD") : " Now"}
        </td>
        <td>
          <button onClick={() => dispatch(deleteExperience(exp._id))} className="btn btn-danger">
            Delete
          </button>
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
