import React, { Fragment, useEffect ,useState} from "react";
import PropTypes from "prop-types";
import GoogleMapReact from "google-map-react";

import { connect } from "react-redux";
import { getBuoys } from "../../actions/buoy";
import {MY_API_KEY} from '../../utils/keys'
import Spinner from "../layout/Spinner";

const Nap = ({ getBuoys, buoy: { buoys, loading } }) => {
    useEffect(() => {
       // console.log(buoys)
        getBuoys();
      }, [getBuoys]);

    const [center] = useState({
        lat: 36.81897,
        lng: 10.16579
      });
      const [zoom] = useState(11);
      const handleApiLoaded = (map, maps) => {
       // let marker = new maps.Marker({ map: map, position: maps.LatLng(center) });
       // const geocoder = new maps.Geocoder();
        const infowindow = new maps.InfoWindow();
    
        //let autocomplete = new maps.places.Autocomplete(searchInput.current, {types: ['geocode']})
        setMarkers(map,maps)
      };
      const setMarkers = (map,maps)=>{
        const image = {
            url: 'https://res.cloudinary.com/orange-odc/image/upload/v1568968076/utils/buoy_jjdisu.png',
            // This marker is 20 pixels wide by 32 pixels high.
            size: new maps.Size(20, 32),
            // The origin for this image is (0, 0).
            origin: new maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at (0, 32).
            anchor: new maps.Point(0, 32)
          };
          const shape = {
            coords: [1, 1, 1, 20, 18, 20, 18, 1],
            type: 'poly'
          };
          buoys.forEach(b => {
            //  console.log('asd')
            // console.log(b)
            const marker = new maps.Marker({
                position: {lat: b.lat, lng:b.lng},
                map: map,
                icon: image,
                shape: shape,
                title: 'test',
                zIndex: 10
                
              });
          });
      }
  return loading || buoys==null ? <Spinner></Spinner>: (
    <Fragment>
      <div className="content-body">
        <div className="container">
          <div style={{ height: "100vh", width: "100%" }}>
            <GoogleMapReact
              bootstrapURLKeys={MY_API_KEY}
              defaultCenter={center}
              defaultZoom={zoom}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
            >
                
            </GoogleMapReact>
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
