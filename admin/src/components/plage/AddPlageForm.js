import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { addPlage } from "../../actions/plage";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
//import { setAlert } from "../../actions/alert";
//import Spinner from "../layout/Spinner";
//import Profile from "../profile/Profile";

const AddPlageForm = ({ addPlage }) => {
  const [formData, setFormData] = useState({
    nom: "",
    ville: "",
    region: "",
    mainImage:
      "https://res.cloudinary.com/orange-odc/image/upload/v1567503140/plages/no-image-selected_e4g058.png",
    images: [
      "https://res.cloudinary.com/orange-odc/image/upload/v1567503140/plages/no-image-selected_e4g058.png","https://res.cloudinary.com/orange-odc/image/upload/v1567503140/plages/no-image-selected_e4g058.png"
    ],
    detail: {
      parking: false,
      shower: false,
      resto: false,
      wc: false,
      bar: false,
      cafe: false,
      beachTennis: false,
      beachVolley: false,
      chienAdmis: false
    }
  });

  let { nom, ville, region, mainImage, images, detail } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onClickD = e =>
    setFormData({
      ...formData,
      detail: { ...detail, [e.target.name]: e.target.checked }
    });

  const onSubmit = async e => {
    e.preventDefault();
  };

  const uploadWidget = e => {
    // if(delToken!==""){
    //  window.cloudinary.delete_by_token(delToken)  }
    // console.log(window.cloudinary)
    window.cloudinary
      .createUploadWidget(
        {
          cloudName: "orange-odc",
          uploadPreset: "ml_default",
          googleApiKey: "AIzaSyAu_NOKqvOUmQMB5XJtnNfysTeRt90L56c",
          searchBySites: ["all", "cloudinary.com"],
          searchByRights: true,
          folder: "plage"
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            setFormData({ ...formData, mainImage: result.info.secure_url });
            document.getElementById("mainImg").src = result.info.secure_url;
            // console.log("Done! Here is the image info: ", result.info);
          }
        }
      )
      .open();
  };
  const uploadWidget2 = e => {
    // if(delToken!==""){
    //  window.cloudinary.delete_by_token(delToken)  }
    // console.log(window.cloudinary)
    window.cloudinary
      .createUploadWidget(
        {
          cloudName: "orange-odc",
          uploadPreset: "ml_default",
          googleApiKey: "AIzaSyAu_NOKqvOUmQMB5XJtnNfysTeRt90L56c",
          searchBySites: ["all", "cloudinary.com"],
          searchByRights: true,
          folder: "plage"
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            //delToken=result.info.delete_token
            if (
              images.length === 1 &&
              images[0] ===
                "https://res.cloudinary.com/orange-odc/image/upload/v1567503140/plages/no-image-selected_e4g058.png"
            )
              images.split(0, 1);
            setFormData({
              ...formData,
              images: [...images, result.info.secure_url]
            });
            console.log("Done! Here is the image info: ", result.info);
          }
        }
      )
      .open();
  };
  return (
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
                        <div className="form-group col-md-6">
                          <label>nom</label>
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
                          <label>ville</label>
                          <input
                            type="text"
                            name="ville"
                            className="form-control"
                            placeholder="ville"
                            value={ville}
                            onChange={e => onChange(e)}
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label>region</label>
                          <input
                            type="text"
                            name="region"
                            className="form-control"
                            placeholder="region"
                            value={region}
                            onChange={e => onChange(e)}
                          />
                        </div>
                      </div>
                      {/* Detail */}
                      <div className="form-group">
                        <div className="form-check form-check-inline">
                          <label className="form-check-label">
                            <input
                              type="checkbox"
                              name="parking"
                              className="form-check-input"
                              value="parking"
                              onClick={e => onClickD(e)}
                            />
                            Parking
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <label className="form-check-label">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              name="shower"
                              value="shower"
                              onClick={e => onClickD(e)}
                            />
                            Shower
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <label className="form-check-label">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              name="resto"
                              value="resto"
                              onClick={e => onClickD(e)}
                            />
                            resto
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <label className="form-check-label">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              name="wc"
                              value="wc"
                              onClick={e => onClickD(e)}
                            />
                            wc
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <label className="form-check-label">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              name="bar"
                              value="bar"
                              onClick={e => onClickD(e)}
                            />
                            bar
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <label className="form-check-label">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              name="cafe"
                              value="cafe"
                              onClick={e => onClickD(e)}
                            />
                            cafe
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <label className="form-check-label">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              name="beachTennis"
                              value="beachTennis"
                              onClick={e => onClickD(e)}
                            />
                            beach Tennis
                          </label>
                        </div>
                      </div>

                      {/* Mainimage */}
                      <div className="form-row">
                        <div className="from-group">
                          <img id="mainImg" src={mainImage}></img>
                          <button type="button" onClick={e => uploadWidget(e)}>
                            Upload Main Image
                          </button>
                        </div>
                      </div>

                      {/* images */}

                      <div className="form-row ">
                        <div className="col-md-8">
                          <div className="bootstrap-carousel">
                            <div
                              data-ride="carousel"
                              className="carousel slide"
                              id="carouselExampleCaptions"
                            >
                              <ol className="carousel-indicators">
                                {images.map((img, idx) => {
                                  return (
                                    <li
                                      className={
                                        idx === images.length - 1
                                          ? "active"
                                          : ""
                                      }
                                      data-slide-to={idx}
                                      data-target="#carouselExampleCaptions"
                                    ></li>
                                  );
                                })}
                              </ol>
                              <div className="carousel-inner">
                                {images.map((img, idx) => {
                                  return (
                                    <div
                                      className={
                                        idx === images.length - 1
                                          ? "carousel-inner active"
                                          : "carousel-inner"
                                      }
                                    >
                                      <img
                                        className="d-block w-100"
                                        height="300px"
                                        src={img}
                                        alt=""
                                      />
                                      <div className="carousel-caption d-none d-md-block">
                                        <h5>hello</h5>
                                        <p>
                                          Nulla vitae elit libero, a pharetra
                                          augue mollis interdum.
                                        </p>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                              <a
                                data-slide="prev"
                                href="#carouselExampleCaptions"
                                className="carousel-control-prev"
                              >
                                <span className="carousel-control-prev-icon"></span>{" "}
                                <span className="sr-only">Previous</span>{" "}
                              </a>
                              <a
                                data-slide="next"
                                href="#carouselExampleCaptions"
                                className="carousel-control-next"
                              >
                                <span className="carousel-control-next-icon"></span>{" "}
                                <span className="sr-only">Next</span>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <button type="button" onClick={e => uploadWidget2(e)}>
                            Upload Second Images
                          </button>
                        </div>
                      </div>
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

AddPlageForm.propTypes = {
  addPlage: PropTypes.func.isRequired
};

export default connect(
  null,
  { addPlage }
)(AddPlageForm);
