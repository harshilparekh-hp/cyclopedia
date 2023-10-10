import React, { useEffect, useRef, useState } from "react";
import { getRandomUser } from "./utility/api";
import InstructorFunc from "./instructorfunc";

const CycleOPediaClassPageFunc = () => {
  // constructor(props) {
  //   super(props);
  //   this.state = JSON.parse(localStorage.getItem("cyclopediastate")) || {
  //     instructor: undefined,
  //     studentList: [],
  //     studentCount: 0,
  //     hideInstructor: false,
  //     inputName: "",
  //     inputFeedback: "",
  //   };
  //}

  const [state, setState] = useState(() => {
    return {
      instructor: undefined,
      studentList: [],
      studentCount: 0,
      hideInstructor: false,
    };
  });

  //const[totalRender, setTotalRender] = useState(0);

  const totalRender  = useRef(0);

  const prevStudentCount  = useRef(0);

  const inputFeedbackRef  = useRef(null);

  const [inputName, setInputNameState] = useState(() => {
    return "";
  });
  const [inputFeedback, setInputFeedbackState] = useState(() => {
    return "";
  });



  useEffect(() => {
    totalRender.current = totalRender.current + 1
    // setTotalRender((prevState) => prevState + 1);
  })



  useEffect(() => {
    const getUser = async () => {
      const responseFromAPI = await getRandomUser();
      setState((prevState) => {
        return {
          ...prevState,
          instructor: {
            name:
              responseFromAPI.data.first_name +
              " " +
              responseFromAPI.data.last_name,
            email: responseFromAPI.data.email,
            phone: responseFromAPI.data.phone_number,
          },
        };
      });
    };
    if (state.hideInstructor) getUser();
  }, [state.hideInstructor]);

  useEffect(() => {
    const getUser = async () => {
      const responseFromAPI = await getRandomUser();
      setState((prevState) => {
        return {
          ...prevState,
          studentList: [
            ...prevState.studentList,
            {
              name:
                responseFromAPI.data.first_name +
                " " +
                responseFromAPI.data.last_name,
            },
          ],
        };
      });
    };
    if (prevStudentCount.current < state.studentCount){
      getUser();
    }
    else if(prevStudentCount.current > state.studentCount){
      setState((prevState) => {
        return {
          ...prevState, studentList:[]
        }
      })
    }
  }, [state.studentCount]);

  useEffect(() => {
    prevStudentCount.current = state.studentCount
    // setTotalRender((prevState) => prevState + 1);
  },[state.studentCount])


  // THIS WILL BE CALLED WHEN THE COMPONENT RENDERS FOR THE FIRST TIME
  useEffect(() => {
    inputFeedbackRef.current.focus();
    return() => {};
  },[])

  const handleAddStudent = () => {
    setState((prevState) => {
      return {
        ...prevState,
        studentCount: prevState.studentCount + 1,
      };
    });
  };

  const handleRemoveAllStudents = () => {
    setState((prevState) => {
      return {
        ...prevState,
        studentCount: 0,
      };
    });
  };

  const handleToggleInstructor = () => {
    setState((prevState) => {
      return {
        ...prevState,
        hideInstructor: !prevState.hideInstructor,
      };
    });
  };

  return (
    <div>
      <div className="p-3">
        <span className="h4 text-success ">Instructor</span> &nbsp;
        <i
          className={`${
            state.hideInstructor ? "bi-toggle-off" : "bi-toggle-on"
          } bi bi-toggle-off btn btn-success btn-sm m-1?`}
          onClick={handleToggleInstructor}
        ></i>
        {!state.hideInstructor && state.instructor ? (
          <InstructorFunc instructor={state.instructor} />
        ) : null}
      </div>

      <div className="p-3">
        <div className="p-3">Total Render: {totalRender.current}</div>
        <span className="h4 text-success"> Feedback </span> <br />
        <input
          type="text"
          placeholder="Name"
          value={inputName}
          onChange={(e) => {
            setInputNameState(e.target.value);
          }}
        ></input>{" "}
        Value: {inputName}
        <br />
        <textarea
          placeholder="Feedback"
          onChange={(e) => {
            setInputFeedbackState(e.target.value);
          }}
          ref = {inputFeedbackRef}
        ></textarea>
        Feedback: {inputFeedback}
      </div>

      <div className="p-3">
        <span className="h4 text-success">Students</span>
        <div>Students Count : {state.studentCount} </div>
        <button className="btn btn-success btn-sm" onClick={handleAddStudent}>
          Add Student
        </button>
        <button
          className="btn btn-danger btn-sm m-1"
          onClick={handleRemoveAllStudents}
        >
          Remove All Students
        </button>

        {state.studentList.map((student, index) => {
          return (
            <div className="text-black" key={index}>
              {student.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CycleOPediaClassPageFunc;
