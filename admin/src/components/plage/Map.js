import React, { Fragment , useEffect } from "react";
import PropTypes from "prop-types";
import GoogleMapReact from "google-map-react";
import styled from "styled-components";
import { connect } from "react-redux";
import {getBuoys} from '../../actions/buoy'
const Wrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 25px;
    height: 25px;
    background-image: url("/assets/icons/buoy.svg");
    user-select: none;
    transform: translate(-50%, -50%);
    &:hover {
        z-index: 1;
    }
`;

const AnyReactComponent = ({ text }) => <Wrapper />;


const getMapBounds = (map, maps, buoys) => {
    const bounds = new maps.LatLngBounds();

    buoys.forEach(buoy => {
        bounds.extend(new maps.LatLng(buoy.lat, buoy.lng));
    });
    return bounds;
};

const bindResizeListener = (map, maps, bounds) => {
    maps.event.addDomListenerOnce(map, "idle", () => {
        maps.event.addDomListener(window, "resize", () => {
            map.fitBounds(bounds);
        });
    });
};

const handleApiLoaded = (map, maps, buoys) => {
    // Get bounds by our places
    const bounds = getMapBounds(map, maps, buoys);
    // Fit map to bounds
    map.fitBounds(bounds);
    // Bind the resize listener
    bindResizeListener(map, maps, bounds);
};

const Map = ({getBuoys,buoy:{buoys,loading}}) => {
    useEffect(() => {
        getBuoys();
    }, [getBuoys]);
    
    return (
        <Fragment>
            <div className="content-body">
                <div className="container">
                    <div style={{ height: "100vh", width: "100%" }}>
                        <GoogleMapReact
                            bootstrapURLKeys={{
                                key: "AIzaSyAD3123Nam0a4qQLHom4cx--lY_Q1iSa4I"
                            }}
                            defaultCenter={{ lat: 33.88, lng: 9.53 }}
                            defaultZoom={10}
                            yesIWantToUseGoogleMapApiInternals
                            onGoogleApiLoaded={({ map, maps }) =>
                                handleApiLoaded(map, maps, buoys)
                            }
                        >
                            {buoys.map(
                                buoy=>(
                                    <AnyReactComponent
                                lat={buoy.lat}
                                lng={buoy.lng}
                                text="My Marker"
                            />
                                )
                            )}
                            
                        </GoogleMapReact>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

Map.propTypes = {
    getBuoys: PropTypes.func.isRequired,
    buoy: PropTypes.object.isRequired,
};

const mapStateToProp = state => ({
    buoy: state.buoy
});

export default connect(mapStateToProp,{getBuoys})(Map);
