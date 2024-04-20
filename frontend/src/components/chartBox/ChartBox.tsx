import './chartBoxNew.scss';
import { useState, useEffect } from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts';

interface NetworkPacket {
  timestamp: string;
  source_ip: string;
  destination_ip: string;
  src_port: number;
  dst_port: number;
  VPN_Type: string; // Adjusted to accept different VPN types
}

// credits: Ali Mazhar

const api_base = 'http://localhost:5000';

const ChartBox = () => {
  const [totalPackets, setTotalPackets] = useState<number>(0);
  const [percentageChange, setPercentageChange] = useState<number>(0);
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTraffic();
  }, []);

  const getTraffic = () => {
    fetch(api_base + '/api/network-packets')
      .then((res) => res.json())
      .then((data) => {
        calculatePacketStatistics(data);
        updateChartData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching traffic data:', err);
        setLoading(false);
      });
  };

  const calculatePacketStatistics = (data: NetworkPacket[]) => {
    const currentDate = new Date().toISOString().split('T')[0];
    const packetsToday = data.filter(
      (packet) => packet.timestamp.split('T')[0] === currentDate
    ).length;
    setTotalPackets(packetsToday);

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const previousDate = yesterday.toISOString().split('T')[0];
    const packetsYesterday = data.filter(
      (packet) => packet.timestamp.split('T')[0] === previousDate
    ).length;

    const percentage =
      ((packetsToday - packetsYesterday) / packetsYesterday) * 100;
    setPercentageChange(percentage);
  };

  const updateChartData = (data: NetworkPacket[]) => {
    const currentDate = new Date();
    const chartData = [];

    for (let i = 1; i <= 5; i++) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const packetsOnDate = data.filter(
        (packet) => packet.timestamp.split('T')[0] === dateStr
      ).length;
      chartData.push({ timeinterval: i, VpnTraffic: packetsOnDate });
    }

    setChartData(chartData.reverse());
  };

  const chartBoxVpn = {
    color: 'purple',
    icon: '/vpntraffic.svg',
    title: 'Total Vpn Traffic',
    dataKey: 'VpnTraffic',
    chartData: chartData,
  };

  return (
    <div className="chartBox">
      <div className="boxInfo">
        <div className="title">
          <img src={chartBoxVpn.icon} alt="" />
          <div className="names">{chartBoxVpn.title}</div>
        </div>
        <span className="heading">{totalPackets}</span>
      </div>
      <div className="chartInfo">
        <div className="chart">
          {loading ? (
            <img src="./loading.png" alt="loading" />
          ) : (
            <ResponsiveContainer width="99%" height="70%">
              <LineChart data={chartBoxVpn.chartData}>
                <Tooltip
                  contentStyle={{ background: 'transparent', border: 'none' }}
                  labelStyle={{ display: 'none' }}
                  position={{ x: 10, y: 70 }}
                />
                <Line
                  type="monotone"
                  dataKey={chartBoxVpn.dataKey}
                  stroke={chartBoxVpn.color}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="texts">
          <span className="percentage">{percentageChange.toFixed(2)}%</span>
          <span className="duration">this Month</span>
        </div>
      </div>
    </div>
  );
};

export default ChartBox;
