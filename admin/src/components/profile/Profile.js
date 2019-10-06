import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getCurrentProfile,
  updateCurrentProfile,
  changePassword
} from "../../actions/profile";
import { setAlert } from "../../actions/alert";
import Spinner from "../layout/Spinner";
import moment from "moment";
import styled from "styled-components";
import Select from "react-select";
//import "react-datepicker/dist/react-datepicker.css";
const options = [
  { value: "Tunis", label: "Tunis" },
  { value: "Ariana", label: "Ariana" },
  { value: "Ben Arous", label: "Ben Arous" },
  { value: "Manouba", label: "Manouba" },
  { value: "Nabeul", label: "Nabeul" },
  { value: 'Zaghouan', label: 'Zaghouan' },
  { value: "Bizerte", label: "Bizerte" },
  { value: "Béja", label: "Béja" },
  { value: "Jendouba", label: "Jendouba" },
  { value: 'Kef', label: 'Kef' },
  { value: 'Siliana', label: 'Siliana' },
  { value: "Sousse", label: "Sousse" },
  { value: "Monastir", label: "Monastir" },
  { value: "Mahdia", label: "Mahdia" },
  { value: "Sfax", label: "Sfax" },
  { value: 'Kairouan', label: 'Kairouan' },
  { value: 'Kasserine', label: 'Kasserine' },
  { value: 'Sidi Bouzid', label: 'Sidi Bouzid' },
  { value: "Gabès", label: "Gabès" },
  { value: "Mednine", label: "Mednine" },
  { value: "Tataouine", label: "Tataouine" },
  { value: 'Gafsa', label: 'Gafsa' },
  { value: 'Tozeur', label: 'Tozeur' },
  { value: 'Kebili', label: 'Kebili' }
];
const Profile = ({
  setAlert,
  getCurrentProfile,
  updateCurrentProfile,
  changePassword,
  auth: { user },
  profile: { profile, loading }
}) => {
  const [formData, setFormData] = useState({
    username: "",
    nom: "",
    prenom: "",
    oldPassword: "",
    newPassword: "",
    newPassword2: "",
    dateNaissance: "",
    adress: "",
    cite: "",
    region: "",
    zip: "",
    image: "",
    delToken: ""
  });

  useEffect(() => {
    getCurrentProfile();
    setFormData({
      username: loading || !profile.username ? "" : profile.username,
      nom: loading || !profile.nom ? "" : profile.nom,
      prenom: loading || !profile.prenom ? "" : profile.prenom,
      oldPassword: "",
      newPassword: "",
      newPassword2: "",
      dateNaissance:
        loading || !profile.dateNaissance ? "" : profile.dateNaissance,
      adress: loading || !profile.adress.adress ? "" : profile.adress.adress,
      cite: loading || !profile.adress.cite ? "" : profile.adress.cite,
      region: loading || !profile.adress.region ? "" : profile.adress.region,
      zip: loading || !profile.adress.zip ? "" : profile.adress.zip,
      image: loading || !profile.image ? "" : profile.image
    });
  }, [loading]);

  let {
    username,
    nom,
    prenom,
    oldPassword,
    newPassword,
    newPassword2,
    dateNaissance,
    adress,
    cite,
    region,
    zip,
    image
    //delToken
  } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    if (e.target.name === "fModifier") {
      if (newPassword !== newPassword2) {
        setAlert("error password don t match", "danger");
      } else {
        changePassword({ oldPassword, newPassword });
      }
    } else if (e.target.name === "fProfile") {
      console.log(image);
      updateCurrentProfile({
        username,
        dateNaissance,
        nom,
        prenom,
        region,
        cite,
        zip,
        adress,
        image
      });
    }
  };

  const uploadWidget = e => {
    // if(delToken!==""){
    //  window.cloudinary.delete_by_token(delToken)  }
    console.log(window.cloudinary);
    window.cloudinary
      .createUploadWidget(
        {
          cloudName: "orange-odc",
          uploadPreset: "ml_default",
          googleApiKey: "AIzaSyAu_NOKqvOUmQMB5XJtnNfysTeRt90L56c",
          searchBySites: ["all", "cloudinary.com"],
          searchByRights: true,
          folder: "users"
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            setFormData({ ...formData, image: result.info.secure_url });

            document.getElementById("imgprof").src = result.info.secure_url;

            //delToken=result.info.delete_token

            console.log("Done! Here is the image info: ", result.info);
          }
        }
      )
      .open();
  };

  const ButtonImg = styled.button`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  background-color: #5559;
  color: white;
  font-size: 12px;
  padding: 12px 12px;
  border: none;
  cursor: pointer;
  border-radius: 55px;
  :hover {
    background-color: black;
  }
`;

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
                  <h4 className="card-title">My Profile</h4>
                  <div className="basic-form">
                    <form onSubmit={e => onSubmit(e)} name="fProfile">
                      <div className="form-row">
                        <div className="form-group col-md-4">
                          <div style={{height:'220px',width:'auto'}}>
                          <img
                            id="imgprof"
                            alt=""
                            className="rounded-circle"
                            src={image}
                           
                            
                          />
                          <ButtonImg onClick={e => uploadWidget(e)}>
                            Add Profile Image
                          </ButtonImg>
                        </div>
                        </div>
                        <div className="form-row col-md-8">
                          <div className="form-group col-md-6">
                            <label>Username</label>
                            <input
                              type="text"
                              name="username"
                              className="form-control"
                              placeholder="username"
                              value={username}
                              onChange={e => onChange(e)}
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label>birthday</label>
                            <input
                              type="date"
                              name="dateNaissance"
                              className="form-control"
                              placeholder="birthday"
                              value={moment(dateNaissance).format("YYYY-MM-DD")}
                              onChange={e => onChange(e)}
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label>Last Name</label>
                            <input
                              type="text"
                              name="nom"
                              className="form-control"
                              placeholder="Last Name"
                              value={nom}
                              onChange={e => onChange(e)}
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label>First Name</label>
                            <input
                              type="text"
                              name="prenom"
                              className="form-control"
                              placeholder="First Name"
                              value={prenom}
                              onChange={e => onChange(e)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-row" />
                      <div className="form-group">
                        <label>Address</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Apartment, studio, or floor"
                          name="adress"
                          value={adress}
                          onChange={e => onChange(e)}
                        />
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label>City</label>
                          <input
                            type="text"
                            className="form-control"
                            name="cite"
                            value={cite}
                            onChange={e => onChange(e)}
                          />
                        </div>
                        <div className="form-group col-md-4">
                          <label>State</label>
                          <Select
                            options={options}
                            value={options.find(p => p.value === region)}
                            onChange={v =>
                              setFormData({ ...formData, region: v.value })
                            }
                          />
                        </div>
                        <div className="form-group col-md-2">
                          <label>Zip</label>
                          <input
                            type="number"
                            className="form-control "
                            name="zip"
                            value={zip}
                            onChange={e => onChange(e)}
                          />
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
              <div className="card">
                <div className="card-body">
                  <h4>Change password</h4>
                  <div className="basic-form">
                    <form onSubmit={e => onSubmit(e)} name="fModifier">
                      <div className="form-row">
                        <div className="form-group col-md-4">
                          <label>Current Password</label>
                          <input
                            type="password"
                            name="oldPassword"
                            className="form-control"
                            placeholder="Current Password"
                            value={oldPassword}
                            onChange={e => onChange(e)}
                          />
                        </div>
                        <div className="form-group col-md-4">
                          <label>New Password</label>
                          <input
                            type="password"
                            name="newPassword"
                            className="form-control"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={e => onChange(e)}
                          />
                        </div>
                        <div className="form-group col-md-4">
                          <label>Confirm New Password</label>
                          <input
                            type="password"
                            name="newPassword2"
                            className="form-control"
                            placeholder="Confirm New Password"
                            value={newPassword2}
                            onChange={e => onChange(e)}
                          />
                        </div>
                      </div>
                      <input
                        type="submit"
                        className="btn btn-dark"
                        value="Modifier"
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
  updateCurrentProfile: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapstateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapstateToProps,
  { setAlert, getCurrentProfile, updateCurrentProfile, changePassword }
)(Profile);
