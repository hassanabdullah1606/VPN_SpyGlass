import './Home.scss';
import TopBox from '../../components/TopBox/TopBox';
import ChartBox from '../../components/chartBox/ChartBox';
import History from '../../components/history/history';
import Traffic from '../../components/Traffic/Traffic';
import PieChartBox from '../../components/pieChartBox/pieChartBox';
import Navbar from '../../components/navbar/navbar';
import Menu from '../../components/menu/menu';
import '../../styles/global.scss';

const Home = () => {
  return (
    <div className="container">
      <div className="menuContainer">
        <Menu />
      </div>
      <div className="bodyContainer">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="contentContainer">
          <div className="home">
            <div className="box box1">
              <TopBox />
            </div>
            <div className="box box5">
              <Traffic />
            </div>

            <div className="box box4">
              <PieChartBox />
            </div>

            <div className="box box6">
              <ChartBox />
            </div>
            <div className="box box7">
              <History />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
