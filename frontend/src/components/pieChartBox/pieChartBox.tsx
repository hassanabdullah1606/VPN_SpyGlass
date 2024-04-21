import React, { useState, useEffect } from 'react';
import './pieChartBox.scss';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface PacketData {
  _id: { $oid: string };
  timestamp: { $date: string };
  source_ip: string;
  destination_ip: string;
  src_port: number;
  dst_port: number;
  packet_size: number;
  protocol: string;
  VPN_Type: string;
}

const api_base = 'https://vpnspyglass-api.vercel.app/';

const PieChartBox: React.FC = () => {
  const [chartData, setChartData] = useState<
    { name: string; value: number; color: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTraffic();
  }, []);

  const getTraffic = () => {
    const endDate = new Date(); // Today's date
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0); // Set to beginning of the day

    fetch(
      `${api_base}/api/network-packets?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
    )
      .then((res) => res.json())
      .then((data: PacketData[]) => {
        const aggregatedData = aggregateData(data);
        setChartData(aggregatedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching traffic data:', err);
        setLoading(false);
      });
  };

  const assignColors = (vpnTypes: string[]): string[] => {
    const colors = [
      'rgb(136, 132, 216)',
      'skyblue',
      'rgb(0, 222, 163)',
      'rgb(189, 33, 0)',
    ]; // Red, Blue, Green, Purple
    const colorMap: { [key: string]: string } = {};
    vpnTypes.forEach((type, index) => {
      colorMap[type] = colors[index % colors.length];
    });
    return vpnTypes.map((type) => colorMap[type]);
  };

  const aggregateData = (
    data: PacketData[]
  ): { name: string; value: number; color: string }[] => {
    const vpnCounts: { [key: string]: number } = {};

    // Aggregate counts for each VPN type
    data.forEach((entry) => {
      const vpnType = entry.VPN_Type;
      vpnCounts[vpnType] = (vpnCounts[vpnType] || 0) + 1;
    });

    // Convert aggregated counts to an array of objects
    const aggregatedData = Object.entries(vpnCounts)
      .map(([vpnType, count]) => ({ name: vpnType, value: count }))
      .sort((a, b) => b.value - a.value) // Sort by count descending
      .slice(0, 4); // Take only the top 4 VPN types

    // Assign colors to VPN types
    const colors = assignColors(aggregatedData.map((item) => item.name));

    // Add color property to aggregated data
    const dataWithColors = aggregatedData.map((item, index) => ({
      ...item,
      color: colors[index],
    }));

    return dataWithColors;
  };

  return (
    <div className="pieChartBox">
      <h2>Leads by Source</h2>
      <div className="chart">
        {loading ? (
          <img src="./loading.png" alt="loading" />
        ) : (
          <ResponsiveContainer width="99%" height={300}>
            <PieChart>
              <Tooltip
                contentStyle={{ background: 'white', borderRadius: '5px' }}
              />
              <Pie
                data={chartData}
                innerRadius={'70'}
                outerRadius={'90%'}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((item, index) => (
                  <Cell key={index} fill={item.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
      <div className="options">
        {chartData.map((item, index) => (
          <div className="option" key={index}>
            <div className="title">
              <div className="dot" style={{ backgroundColor: item.color }} />
              <span>{item.name}</span>
            </div>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartBox;
