import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import BuoyItem from "./BuoyItem";
import Spinner from "../layout/Spinner";

import { getBuoys } from "../../actions/buoy";
import { connect } from "react-redux";


const Buoys = ({ getBuoys, buoy: { buoys, loading } }) => {
  useEffect(() => {
    getBuoys();
  }, [loading]);

  function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach(item => {
      // console.log(item)
      const key = keyGetter(item);
      //  console.log(key)
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    let r = [];
    map.forEach((v, k) => r.push({ k, v }));
    console.log(r);
    return r;
  }

  return loading ? (
    <Spinner />
  ) : (
    <div className="content-body">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
           

            {groupBy(buoys, b => b.plage.region).map(r => (
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title"> {r.k}</h4>
                  <div className="basic-form">
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Serial Number</th>
                            <th scope="col">Beach</th>
                            <th scope="col">Ville</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {r.v.map(buoy => (
                            <BuoyItem key={buoy._id} buoy={buoy} />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

Buoys.propTypes = {};

const mapStateToProp = state => ({
  buoy: state.buoy
});
export default connect(
  mapStateToProp,
  { getBuoys }
)(Buoys);
