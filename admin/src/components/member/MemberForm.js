import React from "react";
import PropTypes from "prop-types";

const MemberForm = props => {
  return (
    <div className="content-body">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Add User</h4>
                <div className="basic-form">
                  <form onSubmit={e => onSubmit(e)}>
                    <div className="form-row">
                      <div className="form-group col-md-4">
                        <label>Email</label>
                        <input
                          type="text"
                          name="email"
                          className="form-control"
                          placeholder="email"
                          value={email}
                          onChange={e => onChange(e)}
                        />
                      </div>
                      <div className="form-group col-md-4">
                        <label>Password</label>
                        <input
                          type="text"
                          name="password"
                          className="form-control"
                          placeholder="password"
                          value={password}
                          onChange={e => onChange(e)}
                        />
                      </div>
                      <div className="form-group col-md-4">
                        <label>Type Utilisateur</label>
                        <select
                            className="custom-select mr-sm-2-control"
                            id="inlineFormCustomSelect"
                            value={type}
                            name="type"
                            onChange={e => onChange(e)}
                          >
                            <option value="ADMIN">ADMIN</option>
                            
                          </select>
                      </div>
                    </div>
                    <input
                      type="submit"
                      className="btn btn-dark"
                      value="Sauvgarder"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

MemberForm.propTypes = {};

export default MemberForm;
