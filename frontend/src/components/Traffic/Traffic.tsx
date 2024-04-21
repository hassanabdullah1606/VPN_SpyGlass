import { useState, useEffect, useRef } from 'react';
import { topVPNsUsers } from '../../data';
import './Traffic.scss';

interface NetworkPacket {
  timestamp: string;
  source_ip: string;
  destination_ip: string;
  src_port: number;
  dst_port: number;
  VPN_Type: string;
}

interface VPNUserData {
  img: string;
  vpnname: string;
}

const api_base = 'https://vpnspyglass-api.vercel.app';


const Traffic = () => {
  const [allTraffic, setAllTraffic] = useState<NetworkPacket[]>([]);
  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(false);
  const [vpnUsers, setVPNUsers] = useState<VPNUserData[]>([]);
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    getTraffic();
    // Scroll to the bottom when allTraffic changes
    scrollToBottom();
  }, [allTraffic]); // Add allTraffic to the dependency array

  useEffect(() => {
    // Fetch VPN user data
    // Assuming topVPNsUsers contains VPN user data similar to VPNUserData interface
    setVPNUsers(topVPNsUsers);
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
          setNoData(true);
        } else {
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
    let hours = timestamp.getUTCHours();
    const minutes = timestamp.getUTCMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return {
      ...item,
      timestamp: `${hours}:${formattedMinutes} ${ampm}`,
    };
  };

  const scrollToBottom = () => {
    if (tableRef.current) {
      tableRef.current.scrollTop = tableRef.current.scrollHeight;
    }
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
      <div className="livetraffic" ref={tableRef}>
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
              {allTraffic.map((item, index) => {
                const user = vpnUsers.find((user) => user.vpnname === item.VPN_Type);
                return (
                  <tr key={index}>
                    <td>
                      {user && <img className={'logoimg'} src={user.img} alt={user.vpnname} />}
                    </td>
                    <td>{item.timestamp}</td>
                    <td>{item.source_ip}</td>
                    <td>{item.destination_ip}</td>
                    <td>{item.src_port}</td>
                    <td>{item.dst_port}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Traffic;
