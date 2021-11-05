import { IRepo } from "../../actions/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faStar, faCodeBranch } from "@fortawesome/free-solid-svg-icons";

interface Props {
  repo: IRepo;
}

const ProfileRepo = ({ repo: { name, html_url, description, forks_count, stargazers_count, watchers_count } }: Props) => {
  return (
    <div className="repo bg-white p-1 my-1">
      <div>
        <h4>
          <a href={html_url} rel="noopener noreferrer" target="_blank">
            {name}
          </a>
        </h4>
        <p>{description}</p>
      </div>
      <div>
        <ul>
          <li className="badge badge-primary">
            <FontAwesomeIcon icon={faStar} /> <span>{stargazers_count}</span>
          </li>
          <li className="badge badge-dark">
            <FontAwesomeIcon icon={faEye} /> <span>{watchers_count}</span>
          </li>
          <li className="badge badge-light">
            <FontAwesomeIcon icon={faCodeBranch} /> <span>{forks_count}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileRepo;
