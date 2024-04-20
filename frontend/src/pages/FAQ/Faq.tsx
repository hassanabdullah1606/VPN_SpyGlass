import Menu from '../../components/menu/menu';
import Navbar from '../../components/navbar/navbar';
import { questions } from './questions';

import './Faq.scss';
import '../../styles/global.scss';
const Faq = () => {
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
          <div className="faq">
            <h2>Frequently Asked Questions</h2>
            {questions.map((item) => (
              <div className="listItem" key={item.id}>
                {/* <p className="questions">{item.question}</p> */}
                {/* <p>{item.answer}</p> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
