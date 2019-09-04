import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPlage } from "../../actions/plage";
import Spinner from "../layout/Spinner";
import Select from 'react-select'
import { Carousel } from "react-bootstrap";
const options = [
  { value: "Tunis", label: "Tunis" },
  { value: "Ariana", label: "Ariana" },
  { value: "Ben Arous", label: "Ben Arous" },
  { value: "Manouba", label: "Manouba" },
  { value: "Nabeul", label: "Nabeul" },
  //{ value: 'Zaghouan', label: 'Zaghouan' },
  { value: "Bizerte", label: "Bizerte" },
  { value: "Béja", label: "Béja" },
  { value: "Jendouba", label: "Jendouba" },
  // { value: 'Kef', label: 'Kef' },
  //{ value: 'Siliana', label: 'Siliana' },
  { value: "Sousse", label: "Sousse" },
  { value: "Monastir", label: "Monastir" },
  { value: "Mahdia", label: "Mahdia" },
  { value: "Sfax", label: "Sfax" },
  //{ value: 'Kairouan', label: 'Kairouan' },
  //{ value: 'Kasserine', label: 'Kasserine' },
  //  { value: 'Sidi Bouzid', label: 'Sidi Bouzid' },
  { value: "Gabès", label: "Gabès" },
  { value: "Mednine", label: "Mednine" },
  { value: "Tataouine", label: "Tataouine" }
  //{ value: 'Gafsa', label: 'Gafsa' },
  //  { value: 'Tozeur', label: 'Tozeur' },
  // { value: 'Kebili', label: 'Kebili' },
];

const EditPlageForm = ({ history, getPlage, plage: { plage, loading } }) => {
  useEffect(() => {
    getPlage("5d55b1533a2d0c236c12290b");
    console.log(plage);
    console.log(loading);
    if (!loading) {
      setFormData({
        nom: plage.nom,
        ville: plage.ville,
        region: plage.region,
        mainImage: plage.mainImage,
        images: plage.images,
        detail: {
          parking: plage.detail.parking,
          shower: plage.detail.shower,
          resto: plage.detail.resto,
          wc: plage.detail.wc,
          bar: plage.detail.bar,
          cafe: plage.detail.cafe,
          beachTennis: plage.detail.beachTennis,
          beachVolley: plage.detail.beachVolley,
          chienAdmis: plage.detail.chienAdmis,
        }
      });
    }
    /* 
    })*/
  }, [loading]);

  const [formData, setFormData] = useState({
    nom: "",
    ville: "",
    region: "",
    mainImage:
      "https://res.cloudinary.com/orange-odc/image/upload/v1567503140/plages/no-image-selected_e4g058.png",
    images: [],
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

  const onSubmit = e => e.preventDefault;


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
            ) {
              console.log("test dselele");
              setFormData({ ...formData, images: [] });
            }
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

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    setDirection(e.direction);
  };

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
                          <Select options={options} onChange={v => setFormData({ ...formData, region: v.value })} />
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
                          <Carousel
                            activeIndex={index}
                            direction={direction}
                            onSelect={handleSelect}
                          >
                            {images.length === 0 ? (
                              <Carousel.Item>
                                <img
                                  className="d-block w-100"
                                  src="https://res.cloudinary.com/orange-odc/image/upload/v1567503140/plages/no-image-selected_e4g058.png"
                                  alt=" "
                                />
                              </Carousel.Item>
                            ) : (
                              images.map((img, idx) => (
                                <Carousel.Item>
                                  <img
                                    className="d-block w-100"
                                    src={img}
                                    alt=" "
                                  />
                                </Carousel.Item>
                              ))
                            )}
                          </Carousel>
                        </div>
                        <div className="col-md-4">
                          <button type="button" onClick={e => uploadWidget2(e)}>
                            Upload Second Images
                          </button>
                        </div>
                      </div>
                    
                    <button className="btn" onClick={e=>onSubmit(e)}> Add Beach</button>
                    
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
