import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPlage ,editPlage} from "../../actions/plage";
import Spinner from "../layout/Spinner";
import Select from "react-select";
import { Carousel } from "react-bootstrap";
import styled from 'styled-components'
import Autocomplete from "react-google-autocomplete";
import GoogleMapReact from "google-map-react";
import {FormControl} from 'react-bootstrap'
import { MY_API_KEY } from "../../utils/keys";
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

const EditPlageForm = ({ history,editPlage, getPlage, plage: { plage, loading } }) => {
  useEffect(() => {
    
    console.log(plage);
    console.log(loading);
    if (!loading) {
      setFormData({
        id: plage._id,
        nom: plage.nom,
        ville: plage.ville,
        region: plage.region,
        mainImage: plage.mainImage,
        images: plage.images,
        lat: plage.lat,
        lng: plage.lng,
        detail: {
          parking: plage.detail.parking,
          shower: plage.detail.shower,
          resto: plage.detail.resto,
          wc: plage.detail.wc,
          bar: plage.detail.bar,
          beachVolley: plage.detail.beachVolley,
          chienAdmis: plage.detail.chienAdmis,
          parasol: plage.detail.parasol
        }
      });
    }
    /* 
    })*/
  }, [loading]);

  const [formData, setFormData] = useState({
    id:"",
    nom: "",
    ville: "",
    region: "",
    mainImage:
      "https://res.cloudinary.com/orange-odc/image/upload/v1567503140/plages/no-image-selected_e4g058.png",
    images: [],
    lat: 0,
    lng: 0,
    desc:"",
    detail: {
      parking: false,
      shower: false,
      resto: false,
      wc: false,
      bar: false,
      beachVolley: false,
      chienAdmis: false,
      parasol:false
    }
  });

  let {id, nom, ville, region, mainImage, images,lat,lng, detail,desc } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onClickD = e =>
    setFormData({
      ...formData,
      detail: { ...detail, [e.target.name]: e.target.checked }
    });

  const onSubmit = e =>{
    e.preventDefault()
    if(editPlage({id, nom, ville, region, mainImage, images,lat,lng, detail,desc }))
    history.push("/beaches");
  };

  const uploadWidget = e => {
    // if(delToken!==""){
    //  window.cloudinary.delete_by_token(delToken)  }
    // console.log(window.cloudinary)
    e.preventDefault()

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
    e.preventDefault()

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

  const deleteImg = e => {
    e.preventDefault()
    setFormData({
      ...formData,
      images: images.filter(img=>img!==e.target.value)
    });

  }


  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    setDirection(e.direction);
  };


  // google map
  const [center ] = useState({
    lat: 36.81897,
    lng: 10.16579
  });
  const [zoom ] = useState(11);

  
  const handleApiLoaded = (map, maps) => {
    let marker = new maps.Marker({ map: map, position: maps.LatLng(center) });
    const geocoder = new maps.Geocoder;
    const infowindow = new maps.InfoWindow;
   
    //let autocomplete = new maps.places.Autocomplete(searchInput.current, {types: ['geocode']})
    maps.event.addListener(map, "click", function(event) {
      setFormData({...formData,lat:event.latLng.lat(),lng: event.latLng.lng()})

     // var latitude = event.latLng.lat();
     // var longitude = event.latLng.lng();
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
  const ButtonImg = styled.button`position: absolute;
  top: 50%;
  left: 45%;
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

  const ButtonImg2 = styled.button`position: absolute;
  top: 50%;
  left: 45%;
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
                      {/* Mainimage */}
                      <div className="form-row">
                        
                        <div className="from-group col-6">
                          <img id="mainImg" src={mainImage} alt="" style={{height:'300px',inlineSize: 'inherit'}}></img>

                          <ButtonImg onClick={e => uploadWidget(e)}>
                            Upload Main Image
                          </ButtonImg>
                        </div>
                        <div className="form-row col-6">
                        <div className="form-group col-md-12">
                            <label>Name</label>
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
                            <label>Description</label>
                            <FormControl as="textarea" aria-label="With textarea" placeholder="Description" style={{height: '172px'}} />
                          </div>
                        </div>
                      </div>

                      <br />
                      <div className="form-row">
                        <div className="col-md-6">
                          
                          <div className="form-group ">
                            <label>City</label>
                            <input
                              type="text"
                              name="ville"
                              className="form-control"
                              placeholder="ville"
                              value={ville}
                              onChange={e => onChange(e)}
                            />
                          </div>
                          <div className="form-group">
                            <label>State</label>
                            <Select
                              options={options}
                              onChange={v =>
                                setFormData({ ...formData, region: v.value })
                              }
                            />
                          </div>

                          {/* Detail */}
                          <div className="form-group ">
                          <label>Details</label>
                            <div className="form-row col-md-12">
                              <div className="form-check col-6">
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
                              <div className="form-check col-6">
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
                              <div className="form-check col-6">
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
                              <div className="form-check col-6">
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
                              <div className="form-check col-6">
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

                              <div className="form-check col-6">
                                <label className="form-check-label">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="beachVolley"
                                    value="beachVolley"
                                    onClick={e => onClickD(e)}
                                  />
                                  Beach Volley
                                </label>
                              </div>
                              <div className="form-check col-6">
                                <label className="form-check-label">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="chienAdmis"
                                    value="chienAdmis"
                                    onClick={e => onClickD(e)}
                                  />
                                  chien Admis
                                </label>
                              </div>
                              <div className="form-check col-6">
                                <label className="form-check-label">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="parasol"
                                    value="parasol"
                                    onClick={e => onClickD(e)}
                                  />
                                  Parasol
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-row col-6">
                          <div>
                          <label>Select location on map:</label>
                            <Autocomplete
                              style={{ width: "90%" }}
                              onPlaceSelected={place => {
                                console.log(place);
                              }}
                              types={["(regions)"]}
                              componentRestrictions={{ country: "tu" }}
                            /> 
                          </div>
                          <div style={{ height: "50vh", width: "100%" }}>
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

                      <br />
                      <br />
                      <br />
                      <br />
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
                                  <Carousel.Caption>
                                    <button
                                      value={img}
                                      className="btn btn-danger"
                                      type="button"
                                      onClick={e => deleteImg(e)}
                                    >
                                      Delete
                                    </button>
                                  </Carousel.Caption>
                                </Carousel.Item>
                              ))
                            )}
                          </Carousel>
                        </div>
                        <div className="col-md-4">
                          <ButtonImg2 onClick={e => uploadWidget2(e)}>
                            Upload Others Images
                          </ButtonImg2>
                        </div>
                      </div>

                      <button className="btn" onClick={e => onSubmit(e)}>
                        {" "}
                        Edit
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

EditPlageForm.propTypes = {
  plage: PropTypes.object.isRequired,
  getPlage: PropTypes.func.isRequired,
  editPlage: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  plage: state.plage
});

export default connect(
  mapStateToProps,
  { getPlage,editPlage }
)(EditPlageForm);
