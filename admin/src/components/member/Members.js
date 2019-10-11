import React, {  useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MemberItem from "./MemberItem";
import Spinner from "../layout/Spinner";

import { getMembers , registerMember } from "../../actions/member";

//import MemberForm from './MemberForm'

const Members = ({ getMembers,registerMember, member: { members, loading } }) => {
  useEffect(() => {
    getMembers();
  }, []);

  const [search, setSearch] = useState("");

  const [formData,setFormData] = useState({
    email:"",
    type:"ADMIN"
  })

  let {
    email,
    type
  } = formData

  const onSubmit = async e => {
    e.preventDefault();
    registerMember({email,type})
  };

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSearch = e => {
    setSearch(e.target.value);
  };

  const filteredCountries = members.filter(member => {
    return member.email.toLowerCase().indexOf(search.toLowerCase()) !== -1;
  });

  return loading ? (
    <Spinner />
  ) : (
    <div className="content-body">
      <div className="container">
        <div className="row page-titles">
          <div className="col p-0">
            <h4>
              Hello, <span>Welcome here</span>
            </h4>
          </div>
          <div className="col p-0">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                
              </li>
              <li className="breadcrumb-item active">Stats</li>
            </ol>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Add member</h4>
                <div className="basic-form">
                  <form onSubmit={e => onSubmit(e)} name="fProfile">
                    <div className="form-row col-md-10">
                      <div className="form-group col-md-6">
                        <label>Username</label>
                        <input
                          type="text"
                          name="email"
                          className="form-control"
                          placeholder="email"
                          value={email}
                          onChange={e => onChange(e)}
                        />
                      </div>
                      {/*
                          <div className="form-group col-md-4">
                            <label>password</label>
                            <input
                              type="password"
                              name="password"
                              className="form-control"
                              placeholder="dateNaissance"
                              //value={moment(dateNaissance).format("YYYY-MM-DD")}
                              onChange={e => onChange(e)}
                            />
                          </div>
                         */}
                      <div className="form-group col-md-4">
                        <label>type</label>
                        <select
                          className="custom-select mr-sm-2-control"
                          id="inlineFormCustomSelect"
                         // value={type}
                          name="type"
                          onChange={e => onChange(e)}
                        >
                          <option value="ADMIN">ADMIN</option>
                          <option value="MUNIC">MUNICIPAL</option>
                          <option value="ECO">ECOSYSTEM</option>
                          
                        </select>
                      </div>
                      <div className="form-group col-md-2">
                        <br />
                        <input
                          type="submit"
                          className="btn btn-dark"
                          value="Add"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">
                  <div className="row">
                    <div className="col-md-8">
                      <input
                        className="form-control"
                        type="text"
                        value={search}
                        onChange={e => onSearch(e)}
                        placeholder="search"
                      />
                    </div>
                    
                  </div>
                </h4>
                <div className="table-responsive">
                  <table className="table table-striped table-bordered verticle-middle zero-configuration">
                    <thead>
                      <tr>
                        <th scope="col">Agent Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCountries.map(member => (
                        <MemberItem key={member._id} member={member} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Members.propTypes = {
  getMembers: PropTypes.func.isRequired,
  registerMember: PropTypes.func.isRequired,
  member: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  member: state.member
});

export default connect(
  mapStateToProps,
  { getMembers,registerMember }
)(Members);
