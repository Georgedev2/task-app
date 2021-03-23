import './button.scss';

function button({ label }) {
  //THIS COMPONENT TAKES ONE PROPS WHICH IS A STRING
  return <div className='global-btn '>{label}</div>;
}

export default button;
