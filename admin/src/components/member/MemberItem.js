import React ,{Fragment} from "react";
import PropTypes from "prop-types";

import {removeMember} from '../../actions/member'
import {connect} from 'react-redux'

const MemberItem = ({member , removeMember}) => {


  const onDelete = (e)=>{

    removeMember(member._id)
  }


  return (
    <tr>
      <td>
        <img
          src={member.image}
          className="w-30px rounded-circle m-r-10"
          alt=""
        />
        {member.username}
      </td>
      <td>
        <span className="f-s-13">{member.email}</span>
      </td>
      <td>
       {member.type}
      </td>
      <td>
        {member.comfirmed?(<Fragment><i className="fa fa-circle-o text-success f-s-12 m-r-10"></i> Actif</Fragment>): <Fragment><i className="fa fa-circle-o text-success f-s-12 m-r-10"></i> Actif</Fragment>}
      </td>
      
      <td>
        <button className="btn btn-danger" onClick={e=>onDelete(e)}>Delete</button>
      </td>
    </tr>
  );
};

MemberItem.propTypes = {
  member: PropTypes.object.isRequired,
  removeMember: PropTypes.func.isRequired,
};



export default connect(null , {removeMember})(MemberItem);
