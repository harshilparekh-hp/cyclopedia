import React from "react";

class Instructor extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    console.log("Component did mount - Instructor");
  }

  componentDidUpdate() {
    console.log("Component did update - Instructor");
  }

  componentWillUnmount() {
    console.log("Component will unmount - Instructor");
  }

  render() {
    console.log("Render Component - Instructor");
    return (
      <div className="p-3">
        
        <br />
        Name: {this.props.instructor.name} <br />
        Email: {this.props.instructor.email} <br />
        phone: {this.props.instructor.phone}
      </div>
    );
  }
}

export default Instructor;
