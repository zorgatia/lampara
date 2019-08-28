import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getPlage, updatePlage } from "../../actions/plage";
//import { setAlert } from "../../actions/alert";
import Spinner from "../layout/Spinner";
//import Profile from "../profile/Profile";

const EditPlageForm = ({
  getPlage,
  updatePlage,
  plage: { plage, loading }
}) => {

  const [formData, setFormData] = useState({
    nom: "",
    ville: "",
    region: "",
    mainImage: "",
    images: []
  });
  
    useEffect(() => {
      getPlage(plage.id);
      setFormData({
        nom: loading || !plage.nom ? "" : plage.nom
      });

      console.log(plage);
      

    }, []);
  

  let {
    nom,
    ville,
    region,
    mainImage,
    images: []
  } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

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
          folder: "users"
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            //delToken=result.info.delete_token

            console.log("Done! Here is the image info: ", result.info);
          }
        }
      )
      .open();
  };
  return loading && plage === null ? (
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
                      <div className="form-row ">
                        <div className="col-md-8">
                          <div className="bootstrap-carousel">
                            <div
                              data-ride="carousel"
                              className="carousel slide"
                              id="carouselExampleCaptions"
                            >
                              <ol className="carousel-indicators">
                                <li
                                  className=""
                                  data-slide-to="0"
                                  data-target="#carouselExampleCaptions"
                                ></li>
                                <li
                                  data-slide-to="1"
                                  data-target="#carouselExampleCaptions"
                                  className=""
                                ></li>
                                <li
                                  data-slide-to="2"
                                  data-target="#carouselExampleCaptions"
                                  className="active"
                                ></li>
                              </ol>
                              <div className="carousel-inner">
                                <div className="carousel-item">
                                  <img
                                    className="d-block w-100"
                                    height="300px"
                                    src="../../assets/images/big/img5.jpg"
                                    alt=""
                                  />
                                  <div className="carousel-caption d-none d-md-block">
                                    <h5>First slide label</h5>
                                    <p>
                                      Nulla vitae elit libero, a pharetra augue
                                      mollis interdum.
                                    </p>
                                  </div>
                                </div>

                                <div className="carousel-item active">
                                  <img
                                    alt=""
                                    className="d-block w-100"
                                    src="../../assets/images/big/img5.jpg"
                                  />
                                  <div className="carousel-caption d-none d-md-block">
                                    <h5>Third slide label</h5>
                                    <p>
                                      Praesent commodo cursus magna, vel
                                      scelerisque nisl consectetur.
                                    </p>
                                  </div>
                                </div>
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
                        <div className="col-md-8"> </div>
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

EditPlageForm.propTypes = {
  getPlage: PropTypes.func.isRequired,
  updatePlage: PropTypes.func.isRequired,
  plage: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  plage: state.plage.plage
});

export default connect(
  mapStateToProps,
  { getPlage, updatePlage }
)(EditPlageForm);
