import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SweetAlert from "sweetalert2-react";



const Swal = ({ alerts }) =>
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(alert => (
        <SweetAlert
            show={true}
            title="Demo"
            text={alert.msg}
            key={alert.id}
            
        />
    ));

Swal.propTypes = {
    alerts: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps)(Swal);
