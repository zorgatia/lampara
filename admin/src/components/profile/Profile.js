import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import { setAlert } from "../../actions/alert";
import Spinner from "../layout/Spinner";

const Profile = ({
    getCurrentProfile,
    auth: { user },
    profile: { profile, loading }
}) => {
    useEffect(() => {
        getCurrentProfile();
        setFormData({
            username: loading || !profile.username ? "" : profile.username,
            nom: loading || !profile.nom ? "" : profile.nom,
            prenom: loading || !profile.prenom ? "" : profile.prenom,

            dateNaissance:
                loading || !profile.dateNaissance ? "" : profile.dateNaissance
        });
    }, [loading]);

    const [formData, setFormData] = useState({
        username: "",
        nom: "",
        prenom: "",
        oldPassword: "",
        newPassword: "",
        newPassword2: "",
        dateNaissance: ""
    });
    const {
        username,
        nom,
        prenom,
        oldPassword,
        newPassword,
        newPassword2,
        dateNaissance
    } = formData;
    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = async e => {
        e.preventDefault();
        if (newPassword !== newPassword2) {
            setAlert("error password don t match", "danger");
        } else {
            // register({username,email,password})
        }
    };
    return loading && profile === null ? (
        <Spinner />
    ) : (
        <Fragment>
            <div className="content-body">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Mon Profile</h4>
                                    <div className="basic-form">
                                        <form onSubmit={e=>onSubmit(e)}>
                                            <div className="form-group">
                                                <label>Username</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="username"
                                                    value={username}
                                                    onChange={e => onChange(e)}
                                                />
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label>Nom</label>
                                                    <input
                                                        type="test"
                                                        className="form-control"
                                                        placeholder="nom"
                                                        value={nom}
                                                        onChange={e =>
                                                            onChange(e)
                                                        }
                                                    />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label>Prenom</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="prenom"
                                                        value={prenom}
                                                        onChange={e =>
                                                            onChange(e)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-md-4">
                                                    <label>ancien mot de passe</label>
                                                    <input
                                                        type="test"
                                                        className="form-control"
                                                        placeholder="nom"
                                                        value={oldPassword}
                                                        onChange={e =>
                                                            onChange(e)
                                                        }
                                                    />
                                                </div>
                                                <div className="form-group col-md-4">
                                                    <label>nouveau mot de passe</label>
                                                    <input
                                                        type="test"
                                                        className="form-control"
                                                        placeholder="nom"
                                                        value={newPassword}
                                                        onChange={e =>
                                                            onChange(e)
                                                        }
                                                    />
                                                </div>
                                                <div className="form-group col-md-4">
                                                    <label>retaper nouveau mot de passe</label>
                                                    <input
                                                        type="test"
                                                        className="form-control"
                                                        placeholder="nom"
                                                        value={newPassword2}
                                                        onChange={e =>
                                                            onChange(e)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label>Address 2</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Apartment, studio, or floor"
                                                />
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label>City</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                    />
                                                </div>
                                                <div className="form-group col-md-4">
                                                    <label>State</label>
                                                    <select
                                                        id="inputState"
                                                        className="form-control"
                                                    >
                                                        <option selected="selected">
                                                            Choose...
                                                        </option>
                                                        <option>
                                                            Option 1
                                                        </option>
                                                        <option>
                                                            Option 2
                                                        </option>
                                                        <option>
                                                            Option 3
                                                        </option>
                                                    </select>
                                                </div>
                                                <div className="form-group col-md-2">
                                                    <label>Zip</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                    />
                                                    <label className="form-check-label">
                                                        Check me out
                                                    </label>
                                                </div>
                                            </div>
                                            <input
                                                type="submit"
                                                className="btn btn-dark"
                                                value="Sign in"   
                                            />
                                                
                                            
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

Profile.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapstateToProps = state => ({
    getCurrentProfile: PropTypes.func.isRequired,
    auth: state.auth,
    profile: state.profile
});

export default connect(
    mapstateToProps,
    { setAlert, getCurrentProfile }
)(Profile);
