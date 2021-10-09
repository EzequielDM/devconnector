import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { faFacebook, faInstagram, faLinkedin, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { loadUser } from "../../actions/auth";
import { getCurrentProfile, updateProfile } from "../../actions/profile";
import { RootState } from "../../reducers";

const ProfileForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    bio: "",
    githubusername: "",
    social: {
      youtube: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      instagram: "",
    },
  });

  const { company, website, location, status, skills, bio, githubusername, social } = formData;

  const profile = useSelector((state: RootState) => state.profile.profile);
  profile && profile.skills && (profile.skills = profile.skills?.toString());

  useEffect(() => {
    dispatch(loadUser());
    if (!profile) dispatch(getCurrentProfile());
    if (profile)
      setFormData((f) => {
        return { ...f, ...(profile as any) };
      });
  }, [dispatch, profile]);

  const [displaySocialInputs, setDisplaySocialInputs] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onChangeSocial = (e: ChangeEvent<HTMLInputElement>) =>
    setFormData({
      ...formData,
      social: { ...social, [e.target.name]: e.target.value },
    });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    dispatch(updateProfile(formData));
  };

  return (
    <>
      <h1 className="large text-primary">Update Your Profile</h1>
      <p className="lead">
        <FontAwesomeIcon icon={faUser} /> Let's get some information to make your profile stand out
      </p>
      <span style={{ fontSize: 24 }}>*</span>
      <small> = required field</small>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <select name="status" value={status} onChange={(e) => onChange(e as any)}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">Give us an idea of where you are at in your career</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Company" name="company" value={company} onChange={onChange} />
          <small className="form-text">Could be your own company or one you work for</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Website" name="website" value={website} onChange={onChange} />
          <small className="form-text">Could be your own or a company website</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={onChange} />
          <small className="form-text">City & state suggested (eg. Boston, MA)</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={onChange} />
          <small className="form-text">Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Github Username" name="githubusername" value={githubusername} onChange={onChange} />
          <small className="form-text">If you want your latest repos and a Github link, include your username</small>
        </div>
        <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={(e) => onChange(e as any)}></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button type="button" className="btn btn-light" onClick={() => setDisplaySocialInputs(!displaySocialInputs)}>
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <>
            <div className="form-group social-input">
              <FontAwesomeIcon icon={faTwitter} size="2x" fixedWidth />
              <input type="text" placeholder="Twitter URL" name="twitter" value={social.twitter} onChange={onChangeSocial} />
            </div>

            <div className="form-group social-input">
              <FontAwesomeIcon icon={faFacebook} size="2x" fixedWidth />
              <input type="text" placeholder="Facebook URL" name="facebook" value={social.facebook} onChange={onChangeSocial} />
            </div>

            <div className="form-group social-input">
              <FontAwesomeIcon icon={faYoutube} size="2x" fixedWidth />
              <input type="text" placeholder="YouTube URL" name="youtube" value={social.youtube} onChange={onChangeSocial} />
            </div>

            <div className="form-group social-input">
              <FontAwesomeIcon icon={faLinkedin} size="2x" fixedWidth />
              <input type="text" placeholder="Linkedin URL" name="linkedin" value={social.linkedin} onChange={onChangeSocial} />
            </div>

            <div className="form-group social-input">
              <FontAwesomeIcon icon={faInstagram} size="2x" fixedWidth />
              <input type="text" placeholder="Instagram URL" name="instagram" value={social.instagram ?? ""} onChange={onChangeSocial} />
            </div>
          </>
        )}

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </>
  );
};

export default ProfileForm;
