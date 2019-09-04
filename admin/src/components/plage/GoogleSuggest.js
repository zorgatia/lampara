import React, { Component } from "react";
import GoogleMapLoader from "react-google-maps-loader";
import GooglePlacesSuggest from "react-google-places-suggest";

const MY_API_KEY = "AIzaSyAD3123Nam0a4qQLHom4cx--lY_Q1iSa4I"; // fake

export default class GoogleSuggest extends React.Component {
  state = {
    search: "",
    value: ""
  };

  handleInputChange = e => {
    this.setState({ search: e.target.value, value: e.target.value });
  };

  handleSelectSuggest = (geocodedPrediction, originalPrediction) => {
    console.log(geocodedPrediction, originalPrediction); // eslint-disable-line
    this.setState({ search: "", value: geocodedPrediction.formatted_address });
  };

  handleNoResult = () => {
    console.log("No results for ", this.state.search);
  };

  handleStatusUpdate = status => {
    console.log(status);
  };

  render() {
    const { search, value } = this.state;
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
          <GoogleMapLoader
            params={{
              key: MY_API_KEY,
              libraries: "places,geocode"
            }}
            render={googleMaps =>
              googleMaps && (
                <GooglePlacesSuggest
                  googleMaps={googleMaps}
                  autocompletionRequest={{
                    input: search
                    // Optional options
                    // https://developers.google.com/maps/documentation/javascript/reference?hl=fr#AutocompletionRequest
                  }}
                  // Optional props
                  onNoResult={this.handleNoResult}
                  onSelectSuggest={this.handleSelectSuggest}
                  onStatusUpdate={this.handleStatusUpdate}
                  textNoResults="My custom no results text" // null or "" if you want to disable the no results item
                  customRender={prediction => (
                    <div className="customWrapper">
                      {prediction
                        ? prediction.description
                        : "My custom no results text"}
                    </div>
                  )}
                >
                  <input
                    type="text"
                    value={value}
                    placeholder="Search a location"
                    onChange={this.handleInputChange}
                  />
                </GooglePlacesSuggest>
              )
            }
          />
        </div>
      </div>
    );
  }
}
