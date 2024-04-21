import './Traffic.scss';
import { useState, useEffect } from 'react';

interface NetworkPacket {
  timestamp: string;
  source_ip: string;
  destination_ip: string;
  src_port: number;
  dst_port: number;
}

const api_base = 'https://vpnspyglass-api.vercel.app';
const ws_base = 'wss://vpnspyglass-api.vercel.app'; // WebSocket endpoint

const Traffic = () => {
  const [allTraffic, setAllTraffic] = useState<NetworkPacket[]>([]);
  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(false); // Change initial state to false

  useEffect(() => {
    getTraffic();
    setupWebSocket();
  }, []);

  const getTraffic = () => {
    fetch(api_base + '/api/network-packets-current-date')
      .then((res) => res.json())
      .then((data) => {
        const currentDate = new Date().toISOString().split('T')[0];
        const filteredData = data.filter((item: NetworkPacket) => {
          const itemDate = new Date(item.timestamp).toISOString().split('T')[0];
          return itemDate === currentDate;
        });
        if (filteredData.length === 0) {
          // Set noData to true if there is no data for the current date
          setNoData(true);
        } else {
          // Otherwise, set the traffic data
          setAllTraffic(filteredData.map(formatTimestamp));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error: ', err);
        setLoading(false);
      });
  };

  const formatTimestamp = (item: NetworkPacket) => {
    const timestamp = new Date(item.timestamp);
    const hours = timestamp.getHours();
    const minutes = timestamp.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return {
      ...item,
      timestamp: `${formattedHours}:${formattedMinutes} ${ampm}`,
    };
  };

  const setupWebSocket = () => {
    const ws = new WebSocket(ws_base);
    ws.onopen = () => console.log('Connected to WebSocket server');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setAllTraffic(data);
    };

    ws.onerror = (error) => console.error('WebSocket error:', error);

    ws.onclose = () => console.log('WebSocket connection closed');
  };

  return (
    <div className="traffic">
      <div className="heading">
        <img src="./search.svg" alt="" />
        <div className="names">
          <h2>Live Traffic</h2>
        </div>
        <a href="https://192.168.1.1" target="_blank" className="block">
          Block
        </a>
      </div>
      <div className="livetraffic">
        {loading ? (
          <img className="loading" src="./loading.png" alt="loading" />
        ) : noData ? (
          <div className="NoData">
            <img src="./NoData.svg" alt="NoData" />
          </div>
        ) : (
          <table className="traffic-table">
            <thead>
              <tr>
                <th>VPN</th>
                <th>Time</th>
                <th>Source IP</th>
                <th>Dest IP</th>
                <th>Source Port</th>
                <th>Dest Port</th>
              </tr>
            </thead>
            <tbody>
              {allTraffic.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.timestamp}</td>
                  <td>{item.source_ip}</td>
                  <td>{item.destination_ip}</td>
                  <td>{item.src_port}</td>
                  <td>{item.dst_port}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Traffic;
