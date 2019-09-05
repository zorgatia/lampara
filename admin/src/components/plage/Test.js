import React, { useState } from "react";
import GoogleMapReact from "google-map-react";

const MY_API_KEY = "AIzaSyAD3123Nam0a4qQLHom4cx--lY_Q1iSa4I"; // fake

const Test = () => {

  const [center, setCenter] = useState({
    lat: 59.95,
    lng: 30.33
  });
  const [zoom, setZoom] = useState(11);

  const handleApiLoaded = (map, maps) => {
    let marker = new maps.Marker({map:map,position:maps.LatLng(center)});
    maps.event.addListener(map, "click", function (event) {
      var latitude = event.latLng.lat();
      var longitude = event.latLng.lng();
      marker.setPosition(event.latLng)
      console.log( latitude + ', ' + longitude );
  });
  };
  return (
    <div className="content-body">
      <div className="container">
        <div className="row page-titles">
          <div className="col p-0">
            <h4>
              Hello, <span>Welcome to plages</span>
            </h4>
          </div>
        </div>
        <div style={{ height: '100vh', width: '100%' }}>
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
  );
};



export default Test;
