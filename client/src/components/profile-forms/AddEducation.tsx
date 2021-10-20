import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addEducation } from "../../actions/profile";

const AddEducation = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    field: "",
    from: "",
    current: false,
    to: "",
    description: "",
  });

  const { school, degree, field, from, current, to, description } = formData;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    dispatch(addEducation(formData, history));
  };

  return (
    <>
      <h1 className="large text-primary">Add Your Education</h1>
      <p className="lead">
        <FontAwesomeIcon icon={faGraduationCap} /> Add any school, bootcamp, etc that you have attended
      </p>
      <span style={{ fontSize: 24 }}>*</span>
      <small> = required field</small>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input type="text" placeholder="* School or Bootcamp" name="school" value={school} onChange={onChange} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Degree or Certificate" name="degree" value={degree} onChange={onChange} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Field Of Study" name="field" value={field} onChange={onChange} />
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
            Current School or Bootcamp
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
            placeholder="Program Description"
            value={description}
            onChange={(e) => onChange(e as any)}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-light my-1" href="dashboard.html">
          Go Back
        </a>
      </form>
    </>
  );
};

export default AddEducation;
