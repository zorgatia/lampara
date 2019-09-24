import React from 'react'
import { setBuoy } from '../../actions/buoy'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
const BuoyItem = ({setBuoy,buoy}) => {
    return (
        <tr>
            <td>{buoy.num}</td>
            <td>{buoy.plage.nom}</td>
            <td>{buoy.plage.ville}</td>
            <td>{buoy.status}</td>
            <td><Link to="/map" onClick={e=>setBuoy(buoy)}>Track</Link></td>
        </tr>
    )
}

export default connect (null,{setBuoy}) (BuoyItem)
