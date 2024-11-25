import React from "react";
import { addInfo, setRole, validate } from "../Redux/Slices/SignupSlice";
import { useDispatch, useSelector } from "react-redux";
function Signup() {
  const dispatch = useDispatch();
  const { role, classes, subjects, error } = useSelector(
    (state) => state.signupslice
  );
  return (
    <form>
      <div>
        <p>Signup as a </p>
        <select
          name="role"
          onChange={(e) => dispatch(setRole(e.target.value))}
          required
        >
          <option value="not selected">Select</option>
          <option value="Teacher">Teacher</option>
          <option value="Student">Student</option>
        </select>
      </div>
      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={(e) =>
          dispatch(addInfo({ name: e.target.name, value: e.target.value }))
        }
        onBlur={(e) => {
          dispatch(validate(e.target.name));
        }}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={(e) =>
          dispatch(addInfo({ name: e.target.name, value: e.target.value }))
        }
        onBlur={(e) => {
          dispatch(validate(e.target.name));
        }}
      />
      <label htmlFor="DOB">DOB</label>
      <input
        type="date"
        name="dob"
        placeholder="DOB"
        id="DOB"
        onChange={(e) =>
          dispatch(addInfo({ name: e.target.name, value: e.target.value }))
        }
        onBlur={(e) => {
          dispatch(validate(e.target.name));
        }}
      />
      <div>
        <select name="country-code">
          <option value="+91">+91 (IND)</option>
        </select>
        <input
          type="tel"
          name="mobile"
          placeholder="Mobile Number"
          onChange={(e) =>
            dispatch(addInfo({ name: e.target.name, value: e.target.value }))
          }
          onBlur={(e) => {
            dispatch(validate(e.target.name));
          }}
        />
      </div>
      <br />
      <label>
        <input
          type="radio"
          name="gender"
          value="male"
          required
          onChange={(e) =>
            dispatch(addInfo({ name: e.target.name, value: e.target.value }))
          }
          onBlur={(e) => {
            dispatch(validate(e.target.name));
          }}
        />
        Male
      </label>
      <label>
        <input
          type="radio"
          name="gender"
          value="female"
          onChange={(e) =>
            dispatch(addInfo({ name: e.target.name, value: e.target.value }))
          }
          onBlur={(e) => {
            dispatch(validate(e.target.name));
          }}
        />
        Female
      </label>
      <label htmlFor="class-select">Select Class: </label>
      <select
        name="class"
        id="class-select"
        onChange={(e) =>
          dispatch(addInfo({ name: e.target.name, value: e.target.value }))
        }
        onBlur={(e) => {
          dispatch(validate(e.target.name));
        }}
      >
        <option value="Select-class">Select-Class</option>
        {classes.map((val, index) => (
          <option value={val} key={index}>
            Class - {val}
          </option>
        ))}
      </select>
      {role === "Teacher" ? (
        <div>
          <label htmlFor="select-subject">Select Subject: </label>
          <select
            name="subject"
            id="select-subject"
            onChange={(e) =>
              dispatch(addInfo({ name: e.target.name, value: e.target.value }))
            }
            onBlur={(e) => {
              dispatch(validate(e.target.name));
            }}
          >
            <option value="Select-Subject">Select-Subject</option>
            {subjects.map((val, index) => (
              <option value={val} key={index}>
                {val}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div></div>
      )}
      {role === "Teacher" || role === "Student" ? (
        <input type="Submit"></input>
      ) : (
        <div></div>
      )}
    </form>
  );
}

export default Signup;
