import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function HeightStatistic() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3055/v1/api/admin/height-statistic?start=20/2/2020&end=20/2/2025')
      .then(response => {
        const result = response.data;
        console.log(result)
        if (result.statusCode === 200) {
          // Chuyển đổi dữ liệu mới thành mảng các đối tượng
          const formattedData = Object.keys(result.data).map((key) => ({
            name: key,
            value: result.data[key]
          }));
          setData(formattedData);
        }
      })
      .catch(error => console.error('Error fetching height statistics:', error));
  }, []);

  return (
    <div>
      <h1>Height Statistics</h1> {/* Cập nhật tiêu đề */}
      <BarChart
        width={600}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
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

export default HeightStatistic;