import React from 'react'

function parseDate(date) {
  let year = date.substring(0,4)
  let month = date.substring(4,6)
  let day = date.substring(6,8)
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  let UTCDate = new Date(Date.UTC(year, month, day))

  const formatedDate = new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: '2-digit',
    timeZone: 'UTC', 
  }).format(UTCDate)

  return formatedDate
}

function Threats(props) {
  const threats = props.threatData;
  const threatList = threats.map((threat, index) =>
    <li className="threat-list--detail" key={index}>
      <p className="threat-list--detail-state">{threat.city}, {threat.state}</p>
      <p className="threat-list--detail-date">{parseDate(threat.report_date)}</p>
      <p className="threat-list--detail-description">{threat.product_description}</p>
      <p className="threat-list--detail-recall">{threat.reason_for_recall}</p>
    </li>
  );
  return (
    <ul className="threat-list">{threatList}</ul>
  );
}

export default Threats;
