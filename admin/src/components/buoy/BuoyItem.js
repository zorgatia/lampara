import React from 'react'

const BuoyItem = ({buoy}) => {
    return (
        <tr>
            <td>{buoy.num}</td>
            <td>{buoy.plage.nom}</td>
            <td>{buoy.ville}</td>
            <td>{buoy.status}</td>
            <td>delte</td>
        </tr>
    )
}

export default BuoyItem
