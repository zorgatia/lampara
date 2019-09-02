import React from "react";
import PropTypes from "prop-types";
import {Link} from 'react-router-dom'
import {getPlage} from '../../actions/plage'
import { connect } from "react-redux";


const PlageItem = ({ getPlage, plage: { _id, nom, ville, date, mainImage } }) => {
    
    const onEdit = (e) =>{
        //e.preventDefault()
        //getPlage(_id);
    }
    const onDetails = (e) =>{

    }
    return (
        <div className="col-lg-4 no-card-border">
            <div className="card">
               
                    <img
                        src={mainImage}
                        className="img-fluid"
                        alt=""
                       
                    />
                    <div className="card-body">
                        <h5 className="m-b-0">{nom}</h5>
                        <div>
                            <span className="f-s-12 text-muted">{ville}</span>{" "}
                            <span className="p-l-10 p-r-10 text-muted">|</span>{" "}
                            <span className="f-s-12 text-muted">
                                Last update: 15 April 2018
                            </span>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="row justify-content-end">
                            <div className="col-4">
                                <Link to="/edit-plage" className="btn" onClick={e=>onEdit(e)}>Edit</Link>
                            </div>
                            <div className="col-4">
                               <button className="btn" onClick={e=>onDetails(e)}>details</button>
                            </div>
                        </div>
                    </div>
                
            </div>
        </div>
    );
};

PlageItem.propTypes = {
    plage: PropTypes.object.isRequired,
    getPlage: PropTypes.func.isRequired,
};


export default connect(
    null,{getPlage}
)(PlageItem);
