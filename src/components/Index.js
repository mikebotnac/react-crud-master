import React, { Component } from "react";
import toastr from "cogo-toast";
import Create from "./Create";
import Edit from "./Edit";

class Index extends Component {
  constructor() {
    super();
    //--- Declare state variable for this component ---//
    this.state = {
      users: [
        {
          id: 11,
          username: "Moazzam Hossain",
          mobile_no: "88018 29887799",
          email: "moazzam@gmail.com",
        },
        {
          id: 22,
          username: "Azim Uddin",
          mobile_no: "88017 23665544",
          email: "azim@gmail.com",
        },
        {
          id: 33,
          username: "Sojol Kaisar",
          mobile_no: "88016 26332211",
          email: "sojol@gmail.com",
        },
      ],
      editUser: {},
    };
    //--- Declare method for this component ---//
    this.handleUpdateState = this.handleUpdateState.bind(this);
  }
  //--- Update state variable while any user insert or update ---//
  handleUpdateState(data, operation) {
    //--- 'operation==1' means update user ---//
    if (operation === 1) {
      this.setState((prevState) => ({
        users: prevState.users.filter((user) => {
          if (user.id === data.id) return Object.assign(user, data);
          else return user;
        }),
      }));
      return;
    }
    //--- 'operation==0' means insert user ---//
    var new_users = this.state.users.concat(data);
    this.setState({
      users: new_users,
    });
  }
  //--- Find editable user and update state variable ---//
  handleEditUser(userId) {
    this.setState({
      editUser: this.state.users.find((x) => x.id === userId),
    });
  }
  //--- Delete user and update state ---//
  handleDeleteUser(id) {
    this.setState((prevState) => ({
      users: prevState.users.filter((user, i) => {
        return i !== id;
      }),
    }));
    toastr.error("User has been deleted successfully!", {
      position: "top-right",
      heading: "Done",
    });
  }

  render() {
    return (
      <div className="card mt-4">
        <div className="card-header">
          <h4 className="card-title"> Users </h4>
          <button
            type="button"
            className="btn btn-primary btn-sm pull-right"
            data-toggle="modal"
            data-target="#addModal"
          >
            {" "}
            Add User{" "}
          </button>
        </div>
        <div className="card-body">
          <div className="col-md-12">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th> Id </th>
                  <th> Full Name </th>
                  <th> Mobile No </th>
                  <th> Email </th>
                  <th> Action </th>
                </tr>
              </thead>
              <tbody>
                {this.state.users.map((user, i) => (
                  <tr key={i}>
                    <td> {user.id} </td>
                    <td> {user.username} </td>
                    <td> {user.mobile_no} </td>
                    <td> {user.email} </td>
                    <td>
                      <button
                        className="btn btn-info btn-sm mr-2"
                        onClick={this.handleEditUser.bind(this, user.id)}
                        data-toggle="modal"
                        data-target="#editModal"
                      >
                        {" "}
                        Edit{" "}
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={this.handleDeleteUser.bind(this, i)}
                      >
                        {" "}
                        Delete{" "}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Create updateState={this.handleUpdateState} />
        <Edit updateState={this.handleUpdateState} user={this.state.editUser} />
      </div>
    );
  }
}
export default Index;
