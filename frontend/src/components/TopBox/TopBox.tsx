import { useState, useEffect } from 'react';
import './TopBox.scss';
import { topVPNsUsers } from '../../data';

interface TopVPNData {
  VPN_Type: string;
  totalPackets: number;
}

interface VPNUserData {
  img: string;
  vpnname: string;
}

const api_base = 'https://vpnspyglass-api.vercel.app';

const TopBox = () => {
  const [topVPNs, setTopVPNs] = useState<TopVPNData[]>([]);
  const [vpnUsers, setVPNUsers] = useState<VPNUserData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTopVPNs();
  }, []);

  useEffect(() => {
    // Fetch VPN user data
    setVPNUsers(topVPNsUsers);
  }, []);

  const getTopVPNs = () => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30); // 30 days ago

    fetch(
      `${api_base}/api/network-packets?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
    )
      .then((res) => res.json())
      .then((data: any[]) => {
        const vpnCounts: { [key: string]: number } = {};

        // Count occurrences of each VPN type
        data.forEach((packet) => {
          if (packet.VPN_Type in vpnCounts) {
            vpnCounts[packet.VPN_Type]++;
          } else {
            vpnCounts[packet.VPN_Type] = 1;
          }
        });

        // Convert counts to array of objects
        const topVPNsData: TopVPNData[] = Object.keys(vpnCounts).map(
          (vpnType) => ({
            VPN_Type: vpnType,
            totalPackets: vpnCounts[vpnType],
          })
        );

        // Sort by totalPackets in descending order
        topVPNsData.sort((a, b) => b.totalPackets - a.totalPackets);

        // Select top 5 VPN types
        const top5VPNs = topVPNsData.slice(0, 5);

        setTopVPNs(top5VPNs);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching top VPN data:', err);
        setLoading(false);
      });
  };

  return (
    <div className="topBox">
      <h1>Top VPNs</h1>

      {loading ? (
        <div className="loading">
          <img src="./loading.png" alt="loading" />
        </div>
      ) : (
        <div className="list">
          {topVPNs.map((vpn, index) => {
            // Find corresponding VPN user data
            const user = vpnUsers.find((user) => user.vpnname === vpn.VPN_Type);
            console.log(user.vpnname);
            console.log(vpn.VPN_Type);

            return (
              <div className="listItem" key={index}>
                <div className="vpn">
                  {user && <img src={user.img} alt={user.vpnname} />}
                  <span className="vpnName">{user?.vpnname}</span>
                  <span className="packetCount">{vpn.totalPackets}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TopBox;
