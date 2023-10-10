import React, { useEffect } from "react";

const InstructorFunc = (props) => {
  useEffect(() => {
    return () => {
      console.log("functional Instructor unmounted");
    };
  }, []);

  return (
    <div className="p-3">
      <br />
      Name: {props.instructor.name} <br />
      Email: {props.instructor.email} <br />
      phone: {props.instructor.phone}
    </div>
  );
};

export default InstructorFunc;
