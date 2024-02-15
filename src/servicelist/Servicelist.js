import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { faEdit, faShirt, faTrashCan, faTruckFast } from '@fortawesome/free-solid-svg-icons'

function Servicelist() {

    const [serviceList, setServiceList] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        //On Load
        getServiceLists();
        console.log("welcome");
    }, []);

    let getServiceLists = async () => {
        try {
            const services = await axios.get("http://193.203.163.170:3000/api/servicelist");
            setServiceList(services.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    let handleDelete = async (id) => {
        try {
            const confirmDelete = window.confirm("Are you sure do you want to delete the service?");
            if (confirmDelete) {
                const data = await axios.delete(`http://193.203.163.170:3000/api/service/${id}`);
                console.log(data);
                getServiceLists();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Service List</h1>
                <Link to="/portal/service-create" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                    <FontAwesomeIcon icon={faTruckFast} className="creatinguser mr-2" />
                    Create Service
                </Link>
            </div>
            {/* <!-- DataTables --> */}
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Service List</h6>
                </div>
                <div className="card-body">
                    {
                        isLoading ? <div className='card-loader'><img src={require('../assets/images/loader.gif')}/></div>
                            : <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Image</th>
                                            <th>Sorting Order</th>
                                            <th>Is Active</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Image</th>
                                            <th>Sorting Order</th>
                                            <th>Is Active</th>
                                            <th>Action</th>
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                        {serviceList.map((serv) => {
                                            return (
                                                <tr>
                                                    <td>{serv.name}</td>
                                                    <td>{serv.description}</td>
                                                    <td>{serv.imageUrl}</td>
                                                    <td>{serv.sortingOrder}</td>
                                                    <td>{serv.isActive == 1 ? 'True' : 'False'}</td>
                                                    <th>
                                                        <div className='table-actions'>
                                                        <Link to={`/portal/service-edit/${serv._id}`} className='btn btn-primary btn-sm mr-1'> <FontAwesomeIcon icon={faEdit} className="creatinguser" /></Link>
                                                        <button onClick={() => handleDelete(serv._id)} className='btn btn-danger btn-sm mr-1'><FontAwesomeIcon icon={faTrashCan} className="creatinguser" /></button>
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

export default Servicelist