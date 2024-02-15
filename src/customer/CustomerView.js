import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function CustomerView() {
    const params = useParams();
    const [cusDet, setCusDet] = useState();
    const [cusAddress, setCusAddress] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        //On Load
        getCustomerDet();
        getCusAddress();
        console.log("welcome to userview");
    }, []);

    let getCustomerDet = async () => {
        try {
            const cus = await axios.get(`http://193.203.163.170:3000/api/customer/${params.id}`);
            // console.log(user);
            setCusDet(cus.data);
            // console.log(userList);
            setLoading(false);
        } catch (error) {
            console.log(error);
            // setLoading(false);
        }
    }

    let getCusAddress = async () => {
        try {
            const cusAddr = await axios.get(`http://193.203.163.170:3000/api/customeraddress/${params.id}`);
            // console.log(user);
            setCusAddress(cusAddr.data);
            // console.log(userList);
            setLoading(false);
        } catch (error) {
            console.log(error);
            // setLoading(false);
        }
    }

    return (
        <>
            <div>Delivery Partner - View</div>
            <div className="card shadow mb-4">
                <div className="card-body">
                    {
                        isLoading ? <div className='card-loader'><img src={require('../assets/images/loader.gif')} /></div>
                            :
                            <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                    <thead>
                                        <tr>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Mobile Number</th>
                                            <th>Email</th>
                                            <th>Is Active</th>
                                            <th>Device</th>
                                            <th>Last Loggedon</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{cusDet.firstName}</td>
                                            <td> {cusDet.lastName}</td>
                                            <td>{cusDet.countryCode} {cusDet.mobileNumber}</td>
                                            <td>{cusDet.email}</td>
                                            <td>{cusDet.isActive == 1 ? 'True' : 'False'}</td>
                                            <td>{cusDet.deviceType}</td>
                                            <td>{cusDet.lastLogInOn}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                    }

                </div>
            </div>

            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Order Details</h6>
                </div>
                <div className="card-body">
                    {
                        isLoading ? <div className='card-loader'><img src={require('../assets/images/loader.gif')} /></div>
                            :
                            <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Customer Name</th>
                                            <th>Mobile No.</th>
                                            <th>Address</th>
                                            <th>Status</th>
                                            <th>Total Price</th>
                                            <th>Total Items</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* <tr>
                                            <td>{userList.id}</td>
                                            <td> {userList.username} </td>
                                            <td>{userList.email}</td>
                                            <td>{userList.city}</td>
                                            <td>{userList.state}</td>
                                            <td>{userList.country}</td>
                                        </tr> */}
                                    </tbody>
                                </table>
                            </div>
                    }
                </div>
            </div>


            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Customer Address</h6>
                </div>
                <div className="card-body">
                    {
                        isLoading ? <div className='card-loader'><img src={require('../assets/images/loader.gif')} /></div>
                            :
                            <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                    <thead>
                                        <tr>
                                            <th>Type</th>
                                            <th>Flat No</th>
                                            <th>Area</th>
                                            <th>Location</th>
                                            <th>Landmark</th>
                                            <th>Map</th>
                                            <th>Is Default</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* <tr>
                                            <td>{userList.id}</td>
                                            <td> {userList.username} </td>
                                            <td>{userList.email}</td>
                                            <td>{userList.city}</td>
                                            <td>{userList.state}</td>
                                            <td>{userList.country}</td>
                                        </tr> */}
                                    </tbody>
                                </table>
                            </div>
                    }
                </div>
            </div>
        </>

    )
}

export default CustomerView