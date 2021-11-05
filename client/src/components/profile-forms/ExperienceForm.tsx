import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addExperience, editExperience } from "../../actions/profile";
import { RootState } from "../../reducers";
import dayjs from "dayjs";

const AddExperience = ({ match }: any) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const exp = useSelector((state: RootState) => state.profile.profile?.experience?.filter((exp) => exp._id === match.params.id));
  const experience = exp && exp[0];

  const [formData, setFormData] = useState({ title: "", company: "", location: "", from: "", current: false, to: "", description: "" });

  useEffect(() => {
    if (experience) {
      setFormData((f) => {
        return {
          ...f,
          ...experience,
          from: dayjs(experience.from).format("YYYY-MM-DD"),
          to: experience.to ? dayjs(experience.to).format("YYYY-MM-DD") : "",
        };
      });
    }
  }, [experience]);

  const { title, company, location, from, current, to, description } = formData;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (match.params.id) {
      dispatch(editExperience({ ...formData, from: new Date(formData.from), to: new Date(formData.to), _id: match.params.id }, history));
    } else dispatch(addExperience({ ...formData, from: new Date(formData.from), to: new Date(formData.to), _id: match.params.id }, history));
  };

  return (
    <>
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <FontAwesomeIcon icon={faCodeBranch} /> Add any developer/programming positions that you have had in the past
      </p>
      <span style={{ fontSize: 24 }}>*</span>
      <small> = required field</small>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input type="text" placeholder="* Job Title" name="title" value={title} onChange={onChange} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Company" name="company" value={company} onChange={onChange} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={onChange} />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={onChange} />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              checked={current}
              onChange={(e) => setFormData({ ...formData, current: e.currentTarget.checked })}
            />{" "}
            Current Job
          </p>
        </div>
        {!current && (
          <div className="form-group">
            <h4>To Date</h4>
            <input type="date" name="to" value={to} onChange={onChange} />
          </div>
        )}
        <div className="form-group">
          <textarea
            name="description"
            cols={30}
            rows={5}
            placeholder="Job Description"
            value={description}
            onChange={(e) => onChange(e as any)}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </>
  );
};

export default AddExperience;
