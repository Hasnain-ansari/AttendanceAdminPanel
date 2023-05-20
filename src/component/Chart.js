import React, { useState, useEffect } from "react";
// import firebase from "firebase/app";
import "firebase/database";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

function MyComponent() {
  const [data, setData] = useState({});

  useEffect(() => {
    const ref = firebase.database().ref("monthsData/4/dayData");
    ref.on("value", (snapshot) => {
      setData(snapshot.val());
    });
  }, []);

  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: "Data",
        data: Object.values(data),
        fill: false,
        borderColor: "rgb(999, 102,84,94)",
        tension: 0.2,
      },
    ],
  };


 

  return (
    <>
    <div>
      <h2>My Component</h2>
      <Line data={chartData} options={{ responsive: true }} />
    </div>

    

    
    </>
    
  );
}

export default MyComponent;
