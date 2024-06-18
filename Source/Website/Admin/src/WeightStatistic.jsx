import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function WeightStatistic() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3055/v1/api/admin/weight-statistic?start=20/2/2020&end=20/2/2025`)
      .then(response => {
        const result = response.data;
        if (result.statusCode === 200) {
          const formattedData = Object.keys(result.data).map(weightRange => ({
            name: weightRange,
            value: result.data[weightRange]
          }));
          setData(formattedData);
        }
      })
      .catch(error => console.error('Error fetching weight statistics:', error));
  }, []);

  return (
    <div>
      <h1>Weight Statistics</h1>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </div>
  );
}

export default WeightStatistic;