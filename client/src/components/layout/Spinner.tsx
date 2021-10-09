import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const Spinner = () => {
  return (
    <div className="grid">
      <FontAwesomeIcon icon={faCircleNotch} size="4x" spin />
      <span>Wait while the page loads....</span>
    </div>
  );
};

export default Spinner;
