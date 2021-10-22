import PropTypes from "prop-types";
import dayjs from "dayjs";
import { IExperience } from "../../actions/types";

interface Props {
  experience: IExperience;
}

const ProfileExperience = ({ experience: { company, title, from, current, to, description } }: Props) => {
  return (
    <div>
      <h3 className="text-dark">{company}</h3>
      <p>
        {dayjs(from).format("MMM YYYY")} - {current ? <span>Now</span> : dayjs(to).format("MMM YYYY")}
      </p>
      <p>
        <strong>Position: </strong>
        {title}
      </p>
      {description && (
        <p>
          <strong>Description: </strong>
          {description}
        </p>
      )}
    </div>
  );
};

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default ProfileExperience;
