import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function GenderStatistic() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3055/v1/api/admin/gender-statistic?period=month')
      .then(response => {
        const result = response.data;
        if (result.statusCode === 200) {
          const formattedData = [
            { name: 'Male', value: result.data.male },
            { name: 'Female', value: result.data.female },
            { name: 'Other', value: result.data.other }
          ];
          setData(formattedData);
        }
      })
      .catch(error => console.error('Error fetching gender statistics:', error));
  }, []);

  return (
    <div>
      <h1>Gender Statistics</h1>
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

export default GenderStatistic;