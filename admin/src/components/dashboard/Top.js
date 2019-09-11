import React, { Fragment, useState, useEffect } from "react";
import Axios from "axios";
import Spinner from "../layout/Spinner";
import CountUp from "react-countup";

const Top = props => {
  const [data, setData] = useState({ users: 0, plages: 0, buoys: 0 });
  const [load, setLoad] = useState(true);
  useEffect(() => {
    const loadData = async () => {
      const response = await Axios.get(`/web/act/dash`);
      setData(response.data);
      setLoad(false);
    };
    loadData();
  }, []);

  return (
    <Fragment>
      <div className="row">
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <div className="text-center m-t-10">
                <i className="icon-earphones f-s-50 text-success"></i>
                <h2 className="m-t-15 m-b-0">
                  { load ? ( 0 ) : ( <CountUp end={data.buoys} duration={3}></CountUp>) } Buoys
                </h2>
                <p className="f-s-12">deployed</p>
                <a
                  href="#"
                  className="btn btn-success btn-rounded p-l-30 p-r-30 m-t-5 m-b-10"
                >
                  Download now
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <div className="text-center m-t-10">
                <i className="icon-diamond f-s-50 text-warning"></i>
                <h2 className="m-t-15 m-b-0">{ load ? ( 0 ) : ( <CountUp end={data.plages} duration={3}></CountUp>) } Beaches</h2>
                <p className="f-s-12"></p>
                <a
                  href="#"
                  className="btn btn-warning btn-rounded p-l-30 p-r-30 m-t-5 m-b-10"
                >
                  Redeem now
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <div className="text-center m-t-10">
                <i className="icon-user f-s-50 text-primary"></i>
                <h2 className="m-t-15 m-b-0">{ load ? ( 0 ) : ( <CountUp end={data.users} duration={3}></CountUp>) } Users </h2>
                <p className="f-s-12"></p>
                <a
                  href="#"
                  className="btn btn-primary btn-rounded p-l-30 p-r-30 m-t-5 m-b-10"
                >
                  Add more
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Top.propTypes = {};

export default Top;
