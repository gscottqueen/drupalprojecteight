import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';

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

function Recalls(props) {
  const recalls = props.recallData;
  const recallList = recalls.map((recall, index) =>
    <AccordionItem className="recall-list--item usa-accordion" key={index}>
      <AccordionItemTitle className="recall-list--item-detail usa-accordion-button" aria-expanded="false">
        <span className="recall-list--item-detail_state">{recall.city}, {recall.state} </span>
        <span className="recall-list--item-detail_date">({parseDate(recall.report_date)})</span>
      </AccordionItemTitle>
      <AccordionItemBody className="recall-list--item-detail_content usa-accordion-content">
        <p className="recall-list--item-detail_description">{recall.product_description}</p>
        <p className="recall-list--item-detail_recall">{recall.reason_for_recall}</p>
      </AccordionItemBody>
    </AccordionItem>
  );
  return (
    <Accordion className="recall-list usa-unstyled-list" accordion={false}>{recallList}</Accordion>
  );
}

export default Recalls;
