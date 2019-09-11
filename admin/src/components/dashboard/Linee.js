import React, { useEffect,useState } from 'react'
import PropTypes from 'prop-types'
import {Line} from 'react-chartjs-2';
import Axios from 'axios'

const Linee = ({region}) => {
    
    const [data, setdata] = useState({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'My First dataset',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40]
          }
        ]
      })

      useEffect(
        () => {
          let mounted = true;
          const loadData = async () => {
            const response = await Axios.get(`/web/act/${region}`);
            if (mounted) {
             // setData(response.data);
             console.log(response.data)
             console.log(region)
            }
          };
          loadData();
    
          return () => {
            mounted = false;
          };
        },
        [region]
      );
    



    
    return (
        <Line data={data} />
    )
}

Linee.propTypes = {

}

export default Linee
