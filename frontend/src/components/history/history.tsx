import React, { useEffect, useState } from 'react';
import './history.scss';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const api_base = 'https://vpnspyglass-api.vercel.app';

const History: React.FC = () => {
  const [chartData, setChartData] = useState<
    { name: string; Traffic: number }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTraffic();
  }, []);

  const getTraffic = () => {
    const endDate = new Date(); // Today's date
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7); // 7 days ago

    fetch(
      `${api_base}/api/network-packets?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
    )
      .then((res) => res.json())
      .then((data) => {
        const aggregatedData = aggregateData(data);
        setChartData(aggregatedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching traffic data:', err);
        setLoading(false);
      });
  };

  const aggregateData = (data: any[]) => {
    const vpnTypeCounts: { [key: string]: number } = {};

    // Count occurrences of each VPN type
    data.forEach((packet) => {
      const vpnType = packet.VPN_Type;
      if (vpnTypeCounts[vpnType]) {
        vpnTypeCounts[vpnType]++;
      } else {
        vpnTypeCounts[vpnType] = 1;
      }
    });

    // Sort VPN types by count in descending order
    const sortedVpnTypes = Object.keys(vpnTypeCounts).sort(
      (a, b) => vpnTypeCounts[b] - vpnTypeCounts[a]
    );

    // Take top 5 VPN types
    const top3VpnTypes = sortedVpnTypes.slice(0, 3);

    // Generate chart data
    const chartData = top3VpnTypes.map((vpnType) => ({
      name: vpnType,
      Traffic: vpnTypeCounts[vpnType],
    }));

    return chartData;
  };

  return (
    <div className="history">
      <div className="boxInfo">
        <div className="title">
          <img src="/history.svg" alt="" />
          <div className="names">History</div>
        </div>
      </div>
      <div className="chartInfo">
        <div className="chart">
          {loading ? (
            <img src="./loading.png" alt="loading" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={chartData}
                margin={{
                  top: 0,
                  right: 0,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Traffic" fill="rgb(136, 132, 216)" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
