import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import GoogleMapReact from "google-map-react";

import { connect } from "react-redux";
import { getBuoys, removeBuoy } from "../../actions/buoy";
import { MY_API_KEY } from "../../utils/keys";
import Spinner from "../layout/Spinner";

const Nap = ({ getBuoys, buoy: { buoys,buoy, loading } }) => {
  useEffect(() => {
    // console.log(buoys)
    getBuoys();
    
  }, [getBuoys]);
  const [searchB, setSearchB] = useState("");
  const onChange = e => {
    setSearchB(e.target.value);
  };
  const onSubmit = e => {
    e.preventDefault();
    const buoy = buoys.find(b=>b.num===searchB);
    console.log(buoy)
    
  };
  const [center,setCenter] = useState({
    lat: 36.81897,
    lng: 10.16579
  });
  const [zoom] = useState(11);
  const handleApiLoaded = (map, maps) => {
    // let marker = new maps.Marker({ map: map, position: maps.LatLng(center) });
    // const geocoder = new maps.Geocoder();
    const infowindow = new maps.InfoWindow();

    //let autocomplete = new maps.places.Autocomplete(searchInput.current, {types: ['geocode']})
    console.log(buoy)
    setMarkers(map, maps);
    if(buoy){
      map.panTo({lat:buoy.lat,lng:buoy.lng})
      removeBuoy()
    }
    
    
  };
  const setMarkers = (map, maps) => {
    const image = {
      url:
        "https://res.cloudinary.com/orange-odc/image/upload/v1568969768/utils/buoy_2_rckag0.png",
      // This marker is 20 pixels wide by 32 pixels high.
      size: new maps.Size(32, 32),
      // The origin for this image is (0, 0).
      origin: new maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new maps.Point(0, 32)
    };
    const shape = {
      coords: [1, 1, 1, 20, 18, 20, 18, 1],
      type: "poly"
    };
    buoys.forEach(b => {
      //  console.log('asd')
      // console.log(b)
      const marker = new maps.Marker({
        position: { lat: b.lat, lng: b.lng },
        map: map,
        icon: image,

        title: "test",
        zIndex: 10
      });
      marker.addListener("click", function() {
        const infowindow = new maps.InfoWindow({
          content: b.status,
          maxWidth: 200
        });
        infowindow.open(map, marker);
      });
    });
  };
  return loading || buoys == null ? (
    <Spinner></Spinner>
  ) : (
    <Fragment>
      <div className="content-body">
        <div className="container">
          <div>
            <form onSubmit={e => onSubmit(e)}>
              <input
                type="text"
                name="searchB"
                value={searchB}
                onChange={e => onChange(e)}
              />
              <input type="submit"></input>
            </form>
          </div>
          <div style={{ height: "100vh", width: "100%" }}>
            <GoogleMapReact
              bootstrapURLKeys={MY_API_KEY}
              defaultCenter={center}
              defaultZoom={zoom}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
            ></GoogleMapReact>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
Nap.propTypes = {
  getBuoys: PropTypes.func.isRequired,
  buoy: PropTypes.object.isRequired
};

const mapStateToProp = state => ({
  buoy: state.buoy
});

export default connect(
  mapStateToProp,
  { getBuoys }
)(Nap);
