import React, { useRef, useState } from "react";

const ControlledForm = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profession: "",
    gender: "male",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profession: "",
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const [submitted, setSubmitted] = useState(false);

  const firstNameRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, profession } = userData;
    firstNameRef.current.focus();

    const userErrors = {
      firstName: "",
      lastName: "",
      email: "",
      profession: "",
    };

    let isError = false;

    if (firstName === "") {
      isError = true;
      userErrors.firstName = "First Name is Required";
    }
    if (lastName === "") {
      isError = true;
      userErrors.lastName = "Last Name is Required";
    }

    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (email === "" || !regexEmail.test(email)) {
      isError = true;
      userErrors.email = "valid Email is Required";
    }
    if (profession === "") {
      isError = true;
      userErrors.profession = "Profession is Required";
    }

    setErrors(userErrors);
    if (isError) return;
    setSubmitted(true);
    setUserData({
      firstName: "",
      lastName: "",
      email: "",
      profession: "",
      gender: "male",
    });
    // if (userErrors.values().some((elm) => elm.length > 0)) {
    //   return;
    // }
  };

  const { firstName, lastName, email, profession, gender } = userData;

  return (
    <div className="form">
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            First Name
          </label>
          <input
            name="firstName"
            ref={firstNameRef}
            type="text"
            className={`form-control shadow-none ${
              errors.firstName ? "border-danger" : ""
            }`}
            id="exampleInputEmail1"
            onChange={handleChange}
            value={firstName}
          />
          <span className="text-danger">{errors.firstName}</span>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail2" className="form-label">
            Last Name
          </label>
          <input
            name="lastName"
            type="text"
            className={`form-control shadow-none ${
              errors.lastName && "border-danger"
            }`}
            id="exampleInputEmail2"
            onChange={handleChange}
            value={lastName}
          />
          <span className="text-danger">{errors.lastName}</span>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail3" className="form-label">
            Email Address
          </label>
          <input
            name="email"
            type="text"
            className={`form-control shadow-none ${
              errors.email && "border-danger"
            }`}
            id="exampleInputEmail3"
            onChange={handleChange}
            value={email}
          />
          <span className="text-danger">{errors.email}</span>
        </div>{" "}
        <div className="mb-3">
          <label htmlFor="profession" className="form-label">
            Email Address
          </label>
          <select
            id="profession"
            name="profession"
            className={`form-select shadow-none ${
              errors.profession && "border-danger"
            }`}
            value={profession}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Profession
            </option>
            <option value="webDeveloper">Web Developer</option>
            <option value="softwareDeveloper">Software Developer</option>
            <option value="designer">Designer</option>
          </select>
          <span className="text-danger">{errors.profession}</span>
        </div>
        <div className="mb-3">
          <div className="form-check">
            <input
              onChange={handleChange}
              className="form-check-input"
              type="radio"
              name="gender"
              id="male"
              value="male"
              checked={gender === "male"}
            />
            <label className="form-check-label" htmlFor="male">
              Male
            </label>
          </div>
          <div className="form-check">
            <input
              onChange={handleChange}
              className="form-check-input"
              type="radio"
              name="gender"
              id="female"
              value="female"
              checked={gender === "female"}
            />
            <label className="form-check-label" htmlFor="female">
              Female
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ControlledForm;
