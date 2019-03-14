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
    <AccordionItem className="recall-list--item usa-accordion-bordered" key={index}>
      <AccordionItemTitle className="recall-list--item-detail usa-accordion-button" aria-expanded="false">
        <time className="recall-list--item-detail_date" dateTime={recall.report_date}>{parseDate(recall.report_date)}</time>
        <h3 className="recall-list--item-detail_state">
          {recall.city}
          {!recall.state ? null : ', ' }{recall.state}
          {recall.country === 'United States' ? null : ', ' }{recall.country === 'United States' ? null : recall.country}
        </h3>
        <span className="recall-list--item-detail_tag usa-label">{recall.classification}</span>
        <span className="recall-list--item-detail_tag usa-label">{recall.status}</span>
        <p className="recall-list--item-detail_description">{recall.product_description}</p>
      </AccordionItemTitle>
      <AccordionItemBody className="recall-list--item-detail_content usa-accordion-content">
        <table>
          <caption className="recall-list--item-detail_table-caption">Recall Details</caption>
          <thead>
            <tr>
              {!recall.event_id ? null : <th scope="col">Event ID</th>}
              {!recall.recall_number ? null : <th scope="col">Recall Number</th>}
              {!recall.code_info ? null : <th scope="col">Code Info</th>}
              {!recall.product_type ? null : <th scope="col">Product Type</th>}
              {!recall.postal_code ? null : <th scope="col">Postal Code</th>}
              {!recall.distribution_pattern ? null : <th scope="col">Product Distribution Pattern</th>}
              {!recall.product_quantity ? null : <th scope="col">Product Quantity</th>}
            </tr>
          </thead>
          <tbody>
            <tr>
              {!recall.event_id ? null : <th scope="row">{recall.event_id}</th>}
              {!recall.recall_number ? null : <td>{recall.recall_number}</td>}
              {!recall.code_info ? null : <td>{recall.code_info}</td>}
              {!recall.product_type ? null : <td>{recall.product_type}</td>}
              {!recall.postal_code ? null : <td>{recall.postal_code}</td>}
              {!recall.distribution_pattern ? null : <td>{recall.distribution_pattern}</td>}
              {!recall.product_quantity ? null : <td>{recall.product_quantity}</td>}
            </tr>
          </tbody>
        </table>
        <h4 className="recall-list--item-detail_content-heading">Reason for recall</h4>
        <p className="recall-list--item-detail_content-reason">{recall.reason_for_recall}</p>
        <div>
          <span className="recall-list--item-detail_content-initiated">{recall.voluntary_mandated}{!recall.state ? null : '. ' }</span>
          <span className="recall-list--item-detail_content-notification">{recall.initial_firm_notification}{!recall.state ? null : '.' }</span>
        </div>
      </AccordionItemBody>
    </AccordionItem>
  );
  return (
    <Accordion className="recall-list usa-unstyled-list" accordion={false}>{recallList}</Accordion>
  );
}

export default Recalls;
