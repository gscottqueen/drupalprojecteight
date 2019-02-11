import React from 'react'

function Threats(props) {
  const threats = props.threatData;
  console.log(threats)
  const threatList = threats.map((threat, index) =>
    <li className="threat-list--detail" key={threat.recall_number}>
      <p className="threat-list--detail-state">{threat.state}</p>
      <p className="threat-list--detail-city">{threat.city}</p>
      <p className="threat-list--detail-type">{threat.product_type}</p>
      <p className="threat-list--detail-description">{threat.product_description}</p>
      <p className="threat-list--detail-recall">{threat.reason_for_recall}</p>
    </li>
  );
  return (
    <ul className="threat-list">{threatList}</ul>
  );
}

export default Threats;
