import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Select from "react-select";
import Autocomplete from "react-google-autocomplete";

import { addPlage } from "../../actions/plage";
import { Carousel } from "react-bootstrap";
//import { setAlert } from "../../actions/alert";
//import Spinner from "../layout/Spinner";
//import Profile from "../profile/Profile";

import GoogleMapReact from "google-map-react";

const MY_API_KEY = "AIzaSyAD3123Nam0a4qQLHom4cx--lY_Q1iSa4I"; // fake

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

const AddPlageForm = ({ history, addPlage }) => {
  const [formData, setFormData] = useState({
    nom: "",
    ville: "",
    region: "",
    mainImage:
      "https://res.cloudinary.com/orange-odc/image/upload/v1567503140/plages/no-image-selected_e4g058.png",
    images: [],
    lat:0,
    lng:0,
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

  let { nom, ville, region, mainImage, images,lat,lng, detail } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onClickD = e =>
    setFormData({
      ...formData,
      detail: { ...detail, [e.target.name]: e.target.checked }
    });

  const onSubmit = async e => {
    e.preventDefault();
    if (addPlage({ nom, ville, region, mainImage, images,lat,lng, detail }))
      history.push("/plages");
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

  // google map

  const [center, setCenter] = useState({
    lat: 36.81897,
    lng: 10.16579
  });
  const [zoom, setZoom] = useState(11);

  const handleApiLoaded = (map, maps) => {
    let marker = new maps.Marker({ map: map, position: maps.LatLng(center) });
    const geocoder = new maps.Geocoder;
    const infowindow = new maps.InfoWindow;
   
    //let autocomplete = new maps.places.Autocomplete(searchInput.current, {types: ['geocode']})
    maps.event.addListener(map, "click", function(event) {
      setFormData({...formData,lat:event.latLng.lat(),lng: event.latLng.lng()})

      var latitude = event.latLng.lat();
      var longitude = event.latLng.lng();
      marker.setPosition(event.latLng);

      geocoder.geocode({'location': event.latLng}, function(results, status) {
        if (status === 'OK') {
          if (results[0]) {
            map.setZoom(11);
            
            infowindow.setContent(results[0].formatted_address);
            infowindow.open(map, marker);
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      });
      //console.log(latitude + ", " + longitude);
      console.log(maps)
    });
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
                        <div className="form-row col-md-6">
                          <div className="form-group col-md-12">
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
                          <div className="form-group col-md-12">
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
                          <div className="form-group col-md-12">
                            <label>region</label>
                            <Select
                              options={options}
                              onChange={v =>
                                setFormData({ ...formData, region: v.value })
                              }
                            />
                          </div>

                          {/* Detail */}
                      <div className="form-group col-md-12">
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

                        </div>
                        <div className="form-row col-6">
                          <div>
                            <Autocomplete
                              style={{ width: "90%" }}
                              onPlaceSelected={place => {
                                console.log(place);
                              }}
                              types={["(regions)"]}
                              componentRestrictions={{ country: "tu" }}
                            />
                          </div>
                          <div style={{ height: "100vh", width: "100%" }}>
                            <GoogleMapReact
                              bootstrapURLKeys={MY_API_KEY}
                              defaultCenter={center}
                              defaultZoom={zoom}
                              yesIWantToUseGoogleMapApiInternals
                              onGoogleApiLoaded={({ map, maps }) =>
                                handleApiLoaded(map, maps)
                              }
                            ></GoogleMapReact>
                          </div>
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

                      <button className="btn" onClick={e => onSubmit(e)}>
                        {" "}
                        Add Beach
                      </button>
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
