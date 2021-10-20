import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { deleteEducation } from "../../actions/profile";

const Education = ({ education }: any) => {
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
          <button onClick={() => dispatch(deleteEducation(edu._id))} className="btn btn-danger">
            Delete
          </button>
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

Education.propTypes = {
  education: PropTypes.array.isRequired,
};

export default Education;
