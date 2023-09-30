import React from "react";
import { getRandomUser } from "./utility/api";

class CycleOPediaClassPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instructor: undefined,
      studentList: [],
      studentCount: 0,
      hideInstructor: false,
    };
  }

  async componentDidMount() {
    console.log("Component did mount");
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

  componentDidUpdate() {
    console.log("Component did update");
  }

  componentWillUnmount() {
    console.log("Component will unmount");
  }

  handleAddStudent = () => {
    this.setState((prevState) => {
      return {
        studentCount: prevState.studentCount + 1
      }
    })
  }

  handleRemoveAllStudents = () => {
    this.setState((prevState) => {
      return {
        studentCount: 0
      }
      
    })
  }

  render() {
    console.log("Render Component");
    return (
      <div>
        {
          this.state.instructor && (
            <div className="p-3">
              <span className="h4 text-success ">Instructor</span>
              <i className="bi bi-toggle-off btn btn-success btn-sm m-1"></i>
              <br />
              Name: {this.state.instructor.name} <br />
              Email: {this.state.instructor.email} <br />
              phone: {this.state.instructor.phone}
            </div>
          )
        }

        <div className="p-3">
          <span className="h4 text-success">Students</span>
          <div>Students Count : {this.state.studentCount} </div>
          <button className="btn btn-success btn-sm" onClick={this.handleAddStudent}>Add Student</button>
          <button className="btn btn-danger btn-sm m-1" onClick={this.handleRemoveAllStudents}>Remove All Students</button>
        </div>
      </div>
    )
  }
}

export default CycleOPediaClassPage;
