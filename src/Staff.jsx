import React, { useEffect, useState } from 'react'
import Modal from '@material-ui/core/Modal';
import Table from '../components/table/Table';
import '../components/table/table.css';
import Center from '../assets/JsonData/centerdrop.json'
import staffList from "../assets/JsonData/staffList.json";
import tick from '../assets/images/right.png';
import addmore from "../assets/images/addmore.png";
import image_map from '../assets/images/map.svg';
// import { FaHeart } from 'react-icons/fa';
import { toHaveClass } from '@testing-library/jest-dom/dist/matchers';


import { getCenterListAPI } from '../api/api calls/centers';
import { getDistrictListAPI } from '../api/api calls/district';

import {
  getStaffListAPI,
  deleteStaffAPI,
  postStaffAPI,
  putStaffAPI
} from '../api/api calls/staff';







export default function Staff() {



  //pre data fetchings
  const [centerList, setCenterList] = useState([])
  const [districtList, setDistrictList] = useState([])

  const getPreData = async () => {
    try {
      const center = await getCenterListAPI()
      const district = await getDistrictListAPI();
      setCenterList(center);
      setDistrictList(district[0].districts)
    } catch (error) {
      console.log(error, "error");
    }
  };


  //staff data fetching
  const [staffDataList, setStaffDataList] = useState([])
  const getStaffDataList = async () => {
    try {
      let res = await getStaffListAPI();
      setStaffDataList(res);
    } catch (error) {
      console.log(error, "error");
    }
  };


  //add staff data
  const [addStaffData, setAddStaffData] = useState({})
  const addStaffDataHandler = (i) => {
    setAddStaffData({
      ...addStaffData,
      state: centerList[i].state,
      district: centerList[i].district,
      taluk: centerList[i].taluk,
      village: centerList[i].villege,
      center: centerList[i].id
    })
  }

  const addStaff = async () => {
    try {
      await postStaffAPI(addStaffData);
      getStaffDataList()
      setAdd(false)
      console.log(staffDataList, "staff")
    } catch (error) {
      console.log(error, "error");
    }
  };



  // delete staff
  const [deleteStaffData, setDeleteStaffData] = useState()

  const handleDel = (id) => {
    setDeleteStaffData(id);
    setOpen(true);
  };

  const deleteStaff = async () => {
    try {
      await deleteStaffAPI(deleteStaffData);
      setDeleteStaffData({})
      setOpen(false);
      getStaffDataList()

    } catch (error) {
      console.log(error, "error");
    }
  };






  //edit staff
  const [editStaffData, setEditStaffData] = useState({});

  const handleUpdate = (e) => {
    e.password = ""
    setEditStaffData(e)
    setHandle(true)

  }


  const updateStaff = async () => {
    try {
      putStaffAPI(editStaffData.id, editStaffData);
      setEditStaffData({});
      setTimeout(() => {
        getStaffDataList()
      }, 500);
      setHandle(false)

    } catch (error) {
      console.log(error, "error");
    }
  };


  //filter by district
  const [filterId, setFilterId] = useState(1);
  const [tableData, setTabledata] = useState()



  //pop up handlers
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const [open1, setHandle] = React.useState(false);
  const handleedit = () => {
    setHandle(false);
  };
  const handleedited = () => {
    setHandle(true);
  };
  const [open2, setAdd] = React.useState(false);
  const handleadd = () => {
    setAdd(false);
  };
  const handleadded = () => {
    setAdd(true);
  };




  useEffect(() => {
    getPreData()
    getStaffDataList()

  }, [])



  return (
    <div>
      <h2 className="page-header">
        Staff<div className='class'><button className='addmore' onClick={handleadded}><div className='add'>Add<img className='addmore1' src={addmore}></img></div></button></div>
      </h2>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              {/* <FaHeart/> */}

              <div>
                <h3 className="table-header">State</h3>
                <div className="dropdown_statedrop">
                  <select
                    className="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                    style={{ width: "200px" }}
                  > <option >Select State</option>
                  </select></div>
                {/* <h3 className='staff_center'>Center: District Industries Centre</h3> */}
                <h3 className="table-header">Districts</h3>
                  <div className="dropdown_centerdrop">
                    <select
                      className="form-select form-select-sm"
                      aria-label=".form-select-sm example"
                      style={{ width: "200px" }}
                     
                    >
                      <option selected>Select District</option>
                      {districtList.map((result) => (
                        <option key={result.id} value={result.id}>
                          {result.name}
                        </option>
                      ))}
                    </select>
                  </div>


              </div>


              <Modal onClose={handleClose} open={open} className="state-alert">
                <div className='delete-alert'>
                  <img src={tick} className='tick-icon'></img>
                  <h2 className='delete-state'>Are You Sure?
                    <p className='undone'>Do you really want to delete these records? This process cannot be undone</p></h2>
                  <button className='btn btn-outline-success' onClick={handleClose} type="button" style={{ marginTop: "103px", marginLeft: "94px" }}>Cancel</button>
                  <button className='btn btn-outline-danger' onClick={deleteStaff} type="button" style={{ marginTop: "103px", marginLeft: "250px" }}>Delete</button></div>

              </Modal>

              <div className='edit-box' >
                <Modal onClose={handleedit} open={open1} className="state-alert" position="absolute">
                  <div className='edit-alert'>
                    <h2 className='edit-state'></h2>
                    <p className='paraedit5'>
                      <label className='states123' htmlFor="text" style={{ color: "black" }}>State: </label>
                      <select className="form-select form-select-md" aria-label=".form-select-sm example" style={{ marginTop: "25px", marginLeft: "190px" }}
                        onChange={(event) => {
                          addStaffDataHandler(event.target.value)
                        }}>
                        <option>select state</option>
                        {centerList?.map((e, i) => (
                          <option key={e.id} value={i}>{e.center_name}</option>
                        ))}

                      </select>


                      <label className='districts123' htmlFor="text" style={{ color: "black" }}>District: </label>
                      <select className="form-select form-select-md" aria-label=".form-select-sm example" style={{ marginTop: "73px", marginLeft: "190px" }}
                        onChange={(event) => {
                          addStaffDataHandler(event.target.value)
                        }}>
                        <option>select district</option>
                        {centerList?.map((e, i) => (
                          <option key={e.id} value={i}>{e.center_name}</option>
                        ))}
                      </select>
                      <label className='centers123' htmlFor="text" style={{ color: "black" }}>Center: </label>
                      <select className="form-select form-select-md" aria-label=".form-select-sm example" style={{ marginTop: "119px", marginLeft: "190px" }}
                        onChange={(event) => {
                          addStaffDataHandler(event.target.value)
                        }}>
                        <option>select center</option>
                        {centerList?.map((e, i) => (
                          <option key={e.id} value={i}>{e.center_name}</option>
                        ))}

                      </select>
                      <label className='villages123' htmlFor="text" style={{ color: "black" }}>Village: </label>
                      <select className="form-select form-select-md" aria-label=".form-select-sm example" style={{ marginTop: "165px", marginLeft: "190px" }}
                        onChange={(event) => {
                          addStaffDataHandler(event.target.value)
                        }}>
                        <option>select village</option>
                        {centerList?.map((e, i) => (
                          <option key={e.id} value={i}>{e.center_name}</option>
                        ))}

                      </select>
                      <label className='taluks123' htmlFor="text" style={{ color: "black" }}>Taluk: </label>
                      <select className="form-select form-select-md" aria-label=".form-select-sm example" style={{ marginTop: "215px", marginLeft: "190px" }}
                        onChange={(event) => {
                          addStaffDataHandler(event.target.value)
                        }}>
                        <option>select taluk</option>
                        {centerList?.map((e, i) => (
                          <option key={e.id} value={i}>{e.center_name}</option>
                        ))}

                      </select>
                      <label className='centers_name' htmlFor="text" style={{ color: "black" }}>Username: </label>
                      <input type="text" className="username_text" value={editStaffData?.username}
                        onChange={(e) =>
                          setEditStaffData({ ...editStaffData, username: e.target.value })
                        }></input>
                      <label className='centers_email' htmlFor="text" style={{ color: "black" }}>Email Id: </label>
                      <input type="text" className="email_text" value={editStaffData?.email}
                        onChange={(e) =>
                          setEditStaffData({ ...editStaffData, email: e.target.value })
                        }></input>
                      <label className='centers_mobile' htmlFor="text" style={{ color: "black" }}>Mobile: </label>
                      <input type="numbert" className="mobile_text" value={editStaffData?.mobile}
                        onChange={(e) =>
                          setEditStaffData({ ...editStaffData, mobile: e.target.value })
                        }></input>
                      <label className='centers_password' htmlFor="text" style={{ color: "black" }}>Password: </label>
                      <input type="password" className="password_text"
                        onChange={(e) =>
                          setEditStaffData({ ...editStaffData, password: e.target.value })
                        }></input>
                      {/* <label className='centers_state' htmlFor="text" style={{ color: "black" }}>State: </label> */}
                      {/* <input type="text" className="state123" value="Kerala"></input>
                                            <label className='centers_district' htmlFor="text" style={{ color: "black" }}>District: </label>
                                            <input type="text" className="district123" value="Kannur"></input>
                                            <label className='centers_taluk' htmlFor="text" style={{ color: "black" }}>Taluk: </label>
                                            <input type="text" className="taluk123" value="Thaliparamba"></input>
                                            <label className='centers_village' htmlFor="text" style={{ color: "black" }}>Village: </label>
                                            <input type="text" className="village123" value="Peringalam"></input> */}
                    </p>


                    <button className='btn btn-outline-success' onClick={updateStaff} type="button" style={{ marginTop: "-100px", marginLeft: "650px" }}>Save</button>
                    <button className='btn btn-outline-danger' onClick={handleedit} type="button" style={{ marginTop: "-100px", marginLeft: "750px" }}>Cancel</button></div>

                </Modal></div>
              <Modal onClose={handleadd} open={open2} className="state-alert" position="absolute">
                <div className='add-alert'>
                  <h2 className='add-state'></h2>
                  <p className='paraedit5'>
                    <label className='states123' htmlFor="text" style={{ color: "black" }}>State: </label>
                    <select className="form-select form-select-md" aria-label=".form-select-sm example" style={{ marginTop: "25px", marginLeft: "190px" }}
                      onChange={(event) => {
                        addStaffDataHandler(event.target.value)
                      }}>
                      <option>select center</option>
                      {centerList?.map((e, i) => (
                        <option key={e.id} value={i}>{e.center_name}</option>
                      ))}

                    </select>
                    <label className='districts123' htmlFor="text" style={{ color: "black" }}>District: </label>
                    <select className="form-select form-select-md" aria-label=".form-select-sm example" style={{ marginTop: "73px", marginLeft: "190px" }}
                      onChange={(event) => {
                        addStaffDataHandler(event.target.value)
                      }}>
                      <option>select center</option>
                      {centerList?.map((e, i) => (
                        <option key={e.id} value={i}>{e.center_name}</option>
                      ))}

                    </select>
                    <label className='centers123' htmlFor="text" style={{ color: "black" }}>Center: </label>
                    <select className="form-select form-select-md" aria-label=".form-select-sm example" style={{ marginTop: "119px", marginLeft: "190px" }}
                      onChange={(event) => {
                        addStaffDataHandler(event.target.value)
                      }}>
                      <option>select center</option>
                      {centerList?.map((e, i) => (
                        <option key={e.id} value={i}>{e.center_name}</option>
                      ))}

                    </select>
                    <label className='villages123' htmlFor="text" style={{ color: "black" }}>Village: </label>
                    <select className="form-select form-select-md" aria-label=".form-select-sm example" style={{ marginTop: "165px", marginLeft: "190px" }}
                      onChange={(event) => {
                        addStaffDataHandler(event.target.value)
                      }}>
                      <option>select center</option>
                      {centerList?.map((e, i) => (
                        <option key={e.id} value={i}>{e.center_name}</option>
                      ))}

                    </select>
                    <label className='taluks123' htmlFor="text" style={{ color: "black" }}>Taluk: </label>
                    <select className="form-select form-select-md" aria-label=".form-select-sm example" style={{ marginTop: "215px", marginLeft: "190px" }}
                      onChange={(event) => {
                        addStaffDataHandler(event.target.value)
                      }}>
                      <option>select center</option>
                      {centerList?.map((e, i) => (
                        <option key={e.id} value={i}>{e.center_name}</option>
                      ))}

                    </select>

                    <label className='centers_name' htmlFor="text" style={{ color: "black" }}>Username: </label>
                    <input type="text" className="username_text"
                      onChange={(e) =>
                        setAddStaffData({ ...addStaffData, username: e.target.value })
                      }></input>
                    <label className='centers_email' htmlFor="text" style={{ color: "black" }}>Email Id: </label>
                    <input type="text" className="email_text"
                      onChange={(e) =>
                        setAddStaffData({ ...addStaffData, email: e.target.value })
                      }></input>
                    <label className='centers_mobile' htmlFor="text" style={{ color: "black" }}>Mobile: </label>
                    <input type="numbert" className="mobile_text"
                      onChange={(e) =>
                        setAddStaffData({ ...addStaffData, mobile: e.target.value })
                      }></input>
                    <label className='centers_password' htmlFor="text" style={{ color: "black" }}>Password: </label>
                    <input type="password" className="password_text"
                      onChange={(e) =>
                        setAddStaffData({ ...addStaffData, password: e.target.value })
                      }></input>
                    {/* <label className='centers_state' htmlFor="text" style={{ color: "black" }}>State: </label>
                                        <input type="text" className="state123"></input>
                                        <label className='centers_district' htmlFor="text" style={{ color: "black" }}>District: </label>
                                        <input type="text" className="district123"></input>
                                        <label className='centers_taluk' htmlFor="text" style={{ color: "black" }}>Taluk: </label>
                                        <input type="text" className="taluk123"></input>
                                        <label className='centers_village' htmlFor="text" style={{ color: "black" }}>Village: </label>
                                        <input type="text" className="village123"></input> */}
                  </p>
                  <button className='btn btn-outline-success' onClick={addStaff} type="button" style={{ marginTop: "-100px", marginLeft: "650px" }}>Add</button>
                  <button className='btn btn-outline-danger' onClick={handleadd} type="button" style={{ marginTop: "-100px", marginLeft: "750px" }}>Cancel</button></div>

              </Modal>

            </div>


            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Mobile</th>

                </tr>
              </thead>
              <tbody>
                {staffDataList.map((item, i) => (
                  <tr key={item.id}>
                    <td>{i + 1}</td>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item.mobile}</td>
                    <td><button className='editbutton' onClick={() => handleUpdate(item)}><i className="fa fa-pencil" aria-hidden="true"></i></button></td>
                    <td><button className='deletebutton' onClick={() => handleDel(item.id)}><i className="fa fa-trash" aria-hidden="true"></i></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>


  )
}


