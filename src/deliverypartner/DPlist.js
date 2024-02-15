import { faEdit, faEye, faTrashCan, faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { faPersonWalkingLuggage } from '@fortawesome/free-solid-svg-icons'

function DPlist() {

  const [dpList, setDPList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    //On Load
    getDPList();
    console.log("welcome");
  }, []);

  let getDPList = async () => {
    try {
      const dpData = await axios.get("http://193.203.163.170:3000/api/dplist/");
      setDPList(dpData.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  let handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure do you want to delete the Delivery Partner?");
      if (confirmDelete) {
        await axios.delete(`http://193.203.163.170:3000/api/dp/${id}`);
        getDPList();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Delivery Partner</h1>
        <Link to="/portal/create-dp" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
          <FontAwesomeIcon icon={faPersonWalkingLuggage} className="creatinguser mr-2" />
          Create Delivery Partner
        </Link>
      </div>
      {/* <!-- DataTables --> */}
      <div className="card shadow mb-4">
        <div className="card-body">
          {
            isLoading ? <div className='card-loader'><img src={require('../assets/images/loader.gif')} /></div>
              : <div className="table-responsive">
                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Mobile Number</th>
                      <th>Email</th>
                      <th>Last Order</th>
                      <th>Is Active</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>Name</th>
                      <th>Mobile Number</th>
                      <th>Email</th>
                      <th>Last Order</th>
                      <th>Is Active</th>
                      <th>Action</th>
                    </tr>
                  </tfoot>
                  <tbody>
                    {dpList.map((dp) => {
                      return (
                        <tr>
                          <td>{dp.firstName} {dp.lastName}</td>
                          <td>{dp.countryCode} {dp.mobileNumber}</td>
                          <td>{dp.email}</td>
                          <td>#123456 - Processing</td>
                          <td>{dp.isActive == 1 ? 'True' : 'False'}</td>
                          <th>
                            <div className='table-actions'>
                            <Link to={`/portal/dp-view/${dp._id}`} className='btn btn-primary btn-sm mr-1'> <FontAwesomeIcon icon={faEye} className="creatinguser" /></Link>
                              <Link to={`/portal/dp-edit/${dp._id}`} className='btn btn-primary btn-sm mr-1'> <FontAwesomeIcon icon={faEdit} className="creatinguser" /></Link>
                              <button onClick={() => handleDelete(dp._id)} className='btn btn-danger btn-sm mr-1'><FontAwesomeIcon icon={faTrashCan} className="creatinguser" /></button>
                            </div>
                          </th>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
          }

        </div>
      </div>
    </>
  )
}

export default DPlist