import { Link } from 'react-router-dom';

import './menu.scss';
import { menu } from './data';

const Menu = () => {
  return (
    <div className="menu">
      <div className="logo">
        <img className="logoDim" src="vpnlogo.svg" alt="" />
      </div>
      <div className="item">
        {menu.map((item) => (
          <Link to={item.url} className="listItem" key={item.id}>
            <img src={item.icon} alt="" />
            <span className="listItemTitle">{item.title}</span>
          </Link>
        ))}
      </div>

      <div className="signature">
        <img src="signature.svg" alt="" />
      </div>
    </div>
  );
};

export default Menu;
