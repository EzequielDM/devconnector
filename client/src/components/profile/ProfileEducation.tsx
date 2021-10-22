import PropTypes from "prop-types";
import { IEducation } from "../../actions/types";
import dayjs from "dayjs";

interface Props {
  education: IEducation;
}

const ProfileEducation = ({ education: { school, from, to, current, degree, field, description } }: Props) => {
  return (
    <div>
      <h3>{school}</h3>
      <p>
        {dayjs(from).format("MMM YYYY")} - {current ? <span>Now</span> : dayjs(to).format("MMM YYYY")}
      </p>
      <p>
        <strong>Degree: </strong>
        {degree}
      </p>
      {field && (
        <p>
          <strong>Field Of Study: </strong> <span>{field}</span>
        </p>
      )}
      {description && (
        <p>
          <strong>Description: </strong> <span>{description}</span>
        </p>
      )}
    </div>
  );
};

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired,
};

export default ProfileEducation;
