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
import styled from 'styled-components';
import "react-datepicker/dist/react-datepicker.css";

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
    image:""
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


            image=result.info.secure_url;
            document.getElementById('imgprof').src=result.info.secure_url

            console.log("Done! Here is the image info: ", result.info);
          }
        }
      )
      .open();
  };

  const ButtonImg = styled.button`position: absolute;
  top: 50%;
  left: 32%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  background-color: #555;
  color: white;
  font-size: 12px;
  padding: 12px 12px;
  border: none;
  cursor: pointer;
  border-radius: 55px;
  :hover {background-color: black;}`

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
                    <form onSubmit={e => onSubmit(e)} name="fProfile">
                      <div className="form-row">
                        <div className="form-group col-md-4">
                          <img
                          id="imgprof"
                            alt=""
                            className="rounded-circle"
                            src={image?image:'/assets/icons/persone.jpg'}
                            width='60%'
                            height="60%"
                          />
                          <ButtonImg onClick={e => uploadWidget(e)}>
                              ajouter un image
                          </ButtonImg>
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
                            <label>Date de naissance</label>
                            <input
                              type="date"
                              name="dateNaissance"
                              className="form-control"
                              placeholder="dateNaissance"
                              value={moment(dateNaissance).format("YYYY-MM-DD")}
                              onChange={e => onChange(e)}
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label>Nom</label>
                            <input
                              type="text"
                              name="nom"
                              className="form-control"
                              placeholder="nom"
                              value={nom}
                              onChange={e => onChange(e)}
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label>Prenom</label>
                            <input
                              type="text"
                              name="prenom"
                              className="form-control"
                              placeholder="prenom"
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
                          <label>Citee</label>
                          <input
                            type="text"
                            className="form-control"
                            name="cite"
                            value={cite}
                            onChange={e => onChange(e)}
                          />
                        </div>
                        <div className="form-group col-md-4">
                          <label>Region</label>
                          <select
                            className="custom-select mr-sm-2-control"
                            id="inlineFormCustomSelect"
                            value={region}
                            name="region"
                            onChange={e => onChange(e)}
                          >
                            <option value="Tunis">Tunis</option>
                            <option value="Bizert">Bizert</option>
                            <option value="Bizert">Bizert</option>
                          </select>
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
                  <h4>Changer mot de passe</h4>
                  <div className="basic-form">
                    <form onSubmit={e => onSubmit(e)} name="fModifier">
                      <div className="form-row">
                        <div className="form-group col-md-4">
                          <label>ancien mot de passe</label>
                          <input
                            type="password"
                            name="oldPassword"
                            className="form-control"
                            placeholder="nom"
                            value={oldPassword}
                            onChange={e => onChange(e)}
                          />
                        </div>
                        <div className="form-group col-md-4">
                          <label>nouveau mot de passe</label>
                          <input
                            type="password"
                            name="newPassword"
                            className="form-control"
                            placeholder="nom"
                            value={newPassword}
                            onChange={e => onChange(e)}
                          />
                        </div>
                        <div className="form-group col-md-4">
                          <label>retaper nouveau mot de passe</label>
                          <input
                            type="password"
                            name="newPassword2"
                            className="form-control"
                            placeholder="nom"
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
