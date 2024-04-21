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
let socket: WebSocket | null = null;

const Traffic = () => {
  const [allTraffic, setAllTraffic] = useState<NetworkPacket[]>([]);
  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    // Establish WebSocket connection
    socket = new WebSocket('https://vpnspyglass-api.vercel.app'); // Adjust URL accordingly

    // Listen for messages from the WebSocket server
    socket.onmessage = (event) => {
      const newData: NetworkPacket = JSON.parse(event.data);
      setAllTraffic((prevTraffic) => [...prevTraffic, newData]);
    };

    // Cleanup function
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  useEffect(() => {
    getTraffic();
  }, []);

  const getTraffic = () => {
    fetch(api_base + '/api/network-packets-current-date')
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          setNoData(true);
        } else {
          setAllTraffic(data.map(formatTimestamp));
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

