import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Pie } from "react-chartjs-2";
import axios from "axios";

const Pipep = ({region}) => {
  const [data, setData] = useState({
    datasets: [
      {
        data: ["0", "10"],
        backgroundColor: [
          "#FFCE56",
          "#FFCE56",
          "#FFCE56",
          "#FFCE56",
          "#FFCE56",
          "#FFCE56",
          "#FFCE56",
          "#FFCE56",
          "#FFCE56",
          "#FFCE56",
          "#FFCE56",
          "#FFCE56",
          "#FFCE56",
          "#FFCE56",
          "#FFCE56"
        ],
        hoverBackgroundColor: [
          "#36A2EB",
          "#36A2EB",
          "#36A2EB",
          "#36A2EB",
          "#36A2EB",
          "#36A2EB",
          "#36A2EB",
          "#36A2EB",
          "#36A2EB",
          "#36A2EB",
          "#36A2EB",
          "#36A2EB",
          "#36A2EB",
          "#36A2EB",
          "#36A2EB"
        ]
      }
    ],
    labels: [
      "Tunis",
      "Ariana",
      "Ben Arous",
      "Manouba",
      "Nabeul",
      "Bizerte",
      "Béja",
      "Jendouba",
      "Sousse",
      "Monastir",
      "Mahdia",
      "Sfax",
      "Gabès",
      "Mednine",
      "Tataouine"
    ]
  });

  useEffect(() => {
    let mounted = true;
    const loadData = async () => {
      const res = await axios("/web/act");
      if (mounted) {
        // setData(response.data);
        setData({
          ...data,
          datasets: [
            {
              ...data.datasets[0],
              data: res.data
            }
          ]
        });
      }
    };
    loadData();
    return () => {
      mounted = false;
    };
  }, []);

  const options = {
    legend: {
      display: false
    }
  };
  const onElementsClick = elems => {
    //setRegion(elems[0]._model.label)
    console.log(elems[0]._model.label);
  };

  return (
    <Fragment>
      <h2>Pie Example</h2>
      <Pie
        data={data}
        options={options}
        onElementsClick={e => onElementsClick(e)}
      />
    </Fragment>
  );
};

Pipep.propTypes = { setRegion: PropTypes.func.isRequired };

export default Pipep;
