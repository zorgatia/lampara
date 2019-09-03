import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPlage } from "../../actions/plage";
import Spinner from "../layout/Spinner";

const EditPlageForm = ({ getPlage, plage: { plage, loading } }) => {
  useEffect(() => {
    getPlage("5d55b1533a2d0c236c12290b");
    console.log(plage)
    console.log(loading)
    if (!loading) {
      setFormData({
        nom: plage.nom,
        ville: plage.ville,
        region: plage.region
      });
    }
    /* 
    })*/
  }, [loading]);

  const [formData, setFormData] = useState({
    nom: "",
    ville: "",
    region: ""
  });

  let { nom, ville, region } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => e.preventDefault;

  return loading || plage === null ? (
    <Spinner></Spinner>
  ) : (
    <Fragment>
      <div className="content-body">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Edit Beach</h4>
                  <div className="basic-form">
                    <form onSubmit={e => onSubmit(e)} name="fProfile">
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label>name</label>
                          <input
                            type="text"
                            name="nom"
                            className="form-control"
                            placeholder="name"
                            value={nom}
                            onChange={e => onChange(e)}
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label>City</label>
                          <input
                            type="text"
                            name="ville"
                            className="form-control"
                            placeholder="City"
                            value={ville}
                            onChange={e => onChange(e)}
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label>State</label>
                          <input
                            type="text"
                            name="region"
                            className="form-control"
                            placeholder="state"
                            value={region}
                            onChange={e => onChange(e)}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="form-check form-check-inline">
                          <label className="form-check-label">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              value="parking"
                            />
                            Parking
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <label className="form-check-label">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              value="shower"
                            />
                            Shower
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <label className="form-check-label">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              value="resto"
                            />
                            resto
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <label className="form-check-label">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              value="wc"
                            />
                            wc
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <label className="form-check-label">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              value="bar"
                            />
                            bar
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <label className="form-check-label">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              value="cafe"
                            />
                            cafe
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <label className="form-check-label">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              value="beachTennis"
                            />
                            beach Tennis
                          </label>
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
  plage: PropTypes.object.isRequired,
  getPlage: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  plage: state.plage
});

export default connect(
  mapStateToProps,
  { getPlage }
)(EditPlageForm);
