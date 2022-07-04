import Modal from '@material-ui/core/Modal';
import addmore from "../assets/images/addmore.png";
import Table from '../components/table/Table';
import '../components/invoice/invoice.css';
// import { Form, Button, Table } from "react-bootstrap";
import React, { useState, createRef} from 'react';
import { useHistory } from 'react-router-dom';
import InvoiceForm from '../components/invoice/InvoiceForm'
import invoiceList from '../assets/JsonData/invoiceList.json';
export default function Invoice() {
  let history = useHistory();
  const [open2, setAdd ] = React.useState(false);
  const handleadd = () => {
    setAdd(false);
  };
  const handleadded = () => {
    setAdd(true);
    
  };
  const handleadding = () => {
    setAdd(true);
    
  };

  const customerTableHead = [
    "",
    "date",
    "purchase item",
    "amount",
    "total"
  
  ]
  
  const renderHead = (item, index) => <th key={index}>{item}</th>
  
  const renderBody = (item, index) => (
      <tr key={index}>
          <td>{item.id}</td>
          <td>{item.date}</td>
          <td>{item.purchaseitem}</td>
          <td>{item.amount}</td>
          <td>{item.total}</td>
          <td><button className='deletebutton' ><i class="fa fa-trash" aria-hidden="true"></i></button></td>
  
      </tr>
  )


  return (
    <div>
      <h2 className="page-header">
        Invoice Generation<div className='class'><button className='addmore' onClick={handleadded}><div className='add'>Add<img className='addmore1' src={addmore}></img></div></button></div>
      </h2>
      <div className='card'>
      <Table
                            headData={customerTableHead}
                            renderHead={(item, index) => renderHead(item, index)}
                            bodyData={invoiceList}
                            renderBody={(item, index) => renderBody(item, index)}
                        />
                        </div>
      <div className="row">
        <div className="col-12">
          
           
              {/* <FaHeart/> */}




              <Modal onClose={handleadd} open={open2} className="state-alert" position="absolute">
              <div className='add-alert'>
                                    <h2 className='add-state'></h2>
                                        <p className='paraedit_6'>
                                            <label className='purchase' for="text" style={{ color: "black" }}>Purchase Item: </label>
                                            <input type="text" className="item-text2" value="Service1"></input>
                                            <label className='purchase_amount' for="text" style={{ color: "black" }}>Amount: </label>
                                            <input type="text" className="amount-text2 "value="Rs 000"></input>
                                            <label className='purchase_tax' for="text" style={{ color: "black" }}>Tax: </label>
                                            <input type="text" className="tax1-text2 "value="Rs 000"></input>
                                            <label className='purchase_total' for="text" style={{ color: "black" }}>Total: </label>
                                            <input type="text" className="total1-text2 "value="Rs 000"></input>
                                          
                                            
                                           </p>
                                    <button className='btn btn-outline-success'onClick={() => { history.push('/invoiceform') }}  type="button" style={{ marginTop: "-100px", marginLeft: "650px" }}>Add</button>
                                    <button className='btn btn-outline-danger' onClick={handleadd} type="button" style={{ marginTop: "-100px", marginLeft: "750px" }}>Cancel</button></div>
                

              </Modal>

             
    


          
        </div>
      </div>
    </div>


  )
}


