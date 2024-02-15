import { faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { faEye } from '@fortawesome/free-solid-svg-icons'

function Customerlist() {

  const [customerList, setCustomerList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    //On Load
    getCustomerList();
    console.log("welcome");
  }, []);

  let getCustomerList = async () => {
    try {
      const cusList = await axios.get("http://193.203.163.170:3000/api/customerlist/");
      setCustomerList(cusList.data);
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
        getCustomerList();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Customers</h1>
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
                      <th>Profession</th>
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
                      <th>Profession</th>
                      <th>Last Order</th>
                      <th>Is Active</th>
                      <th>Action</th>
                    </tr>
                  </tfoot>
                  <tbody>
                    {customerList.map((cus) => {
                      return (
                        <tr>
                          <td>{cus.firstName} {cus.lastName}</td>
                          <td>{cus.countryCode} {cus.mobileNumber}</td>
                          <td>{cus.email}</td>
                          <th>Profession</th>
                          <td>#123456 - Processing</td>
                          <td>{cus.isActive == 1 ? 'True' : 'False'}</td>
                          <th>
                            <div className='table-actions'>
                              <Link to={`/portal/customer-view/${cus._id}`} className='btn btn-primary btn-sm mr-1'> <FontAwesomeIcon icon={faEye} className="creatinguser" /></Link>
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

export default Customerlist