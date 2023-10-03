import React from "react";
import { getRandomUser } from "./utility/api";
import Instructor from "./instructor";

class CycleOPediaClassPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = JSON.parse(localStorage.getItem("cyclopediastate")) || {
      instructor: undefined,
      studentList: [],
      studentCount: 0,
      hideInstructor: false,
      inputName: "",
      inputFeedback: "",
    };
  }

  async componentDidMount() {
    console.log("Component did mount");
    if (!JSON.parse(localStorage.getItem("cyclopediastate"))) {
      //   // this.setState(JSON.parse(localStorage.getItem("cyclopediastate")));
      // } else {
      const responseFromAPI = await getRandomUser();
      console.log(responseFromAPI);

      this.setState((prevState) => {
        return {
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
    }
  }

  componentDidUpdate = async (prevProps, previousState) => {
    console.log("Component did update");
    localStorage.setItem("cyclopediastate", JSON.stringify(this.state));

    if (previousState.studentCount < this.state.studentCount) {
      const response = await getRandomUser();
      this.setState((prevState) => {
        return {
          studentList: [
            ...prevState.studentList,
            { name: response.data.first_name + " " + response.data.last_name },
          ],
        };
      });
    }
    else if (previousState.studentCount > this.state.studentCount){
      this.setState((prevState) => {
        return {
          studentList: [],
        };
      });
    }
  };

  componentWillUnmount() {
    console.log("Component will unmount");
  }

  handleAddStudent = () => {
    this.setState((prevState) => {
      return {
        studentCount: prevState.studentCount + 1,
      };
    });
  };

  handleRemoveAllStudents = () => {
    this.setState((prevState) => {
      return {
        studentCount: 0,
      };
    });
  };

  handleToggleInstructor = () => {
    this.setState((prevState) => {
      return {
        hideInstructor: !prevState.hideInstructor,
      };
    });
  };

  render() {
    console.log("Render Component");
    return (
      <div>
        <div className="p-3">
          <span className="h4 text-success ">Instructor</span> &nbsp;
          <i
            className={`${
              this.state.hideInstructor ? "bi-toggle-off" : "bi-toggle-on"
            } bi bi-toggle-off btn btn-success btn-sm m-1?`}
            onClick={this.handleToggleInstructor}
          ></i>
          {!this.state.hideInstructor && this.state.instructor ? (
            <Instructor instructor={this.state.instructor}></Instructor>
          ) : null}
        </div>

        <div className="p-3">
          <span className="h4 text-success"> Feedback </span> <br />
          <input
            type="text"
            placeholder="Name"
            value={this.state.inputName}
            onChange={(e) => {
              this.setState({ inputName: e.target.value });
            }}
          ></input>{" "}
          Value: {this.state.inputName}
          <br />
          <textarea
            placeholder="Feedback"
            onChange={(e) => {
              this.setState({ inputFeedback: e.target.value });
            }}
          ></textarea>
          Feedback: {this.state.inputFeedback}
        </div>

        <div className="p-3">
          <span className="h4 text-success">Students</span>
          <div>Students Count : {this.state.studentCount} </div>
          <button
            className="btn btn-success btn-sm"
            onClick={this.handleAddStudent}
          >
            Add Student
          </button>
          <button
            className="btn btn-danger btn-sm m-1"
            onClick={this.handleRemoveAllStudents}
          >
            Remove All Students
          </button>

          {this.state.studentList.map((student, index) => {
            return (
              <div className="text-black" key={index}>
                {student.name}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default CycleOPediaClassPage;
