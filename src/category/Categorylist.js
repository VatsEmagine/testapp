import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { faEdit, faShirt, faTrashCan } from '@fortawesome/free-solid-svg-icons'

function Categorylist() {

    const [categoryList, setCategoryList] = useState([]);
    const [serviceList, setServiceList] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getCategoryLists();
        getServiceLists();
    }, []);

    let getCategoryLists = async () => {
        try {
            const category = await axios.get("http://193.203.163.170:3000/api/categories");
            setCategoryList(category.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    let getServiceLists = async () => {
        try {
            const servicelist = await axios.get("http://193.203.163.170:3000/api/servicelist");
            setServiceList(servicelist.data);
        } catch (error) {
            console.log(error);
        }
    }

    let handleDelete = async (id) => {
        try {
            const confirmDelete = window.confirm("Are you sure do you want to delete the category?");
            if (confirmDelete) {
                const data = await axios.delete(`http://193.203.163.170:3000/api/category/${id}`);
                console.log(data);
                getCategoryLists();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Category List</h1>
                <Link to="/portal/category-create" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                    <FontAwesomeIcon icon={faShirt} className="creatinguser mr-2" />
                    Create Category
                </Link>
            </div>
            {/* <!-- DataTables --> */}
            <div className="card shadow mb-4">
                <div className="card-body">
                    {
                        isLoading ? <div className='card-loader'><img src={require('../assets/images/loader.gif')}/></div>
                            : <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Service</th>
                                            <th>Price/Piece</th>
                                            <th>Price/KG</th>
                                            <th>Is Active</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Service</th>
                                            <th>Price/Piece</th>
                                            <th>Price/KG</th>
                                            <th>Is Active</th>
                                            <th>Action</th>
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                        {categoryList.map((category) => {
                                            return (
                                                <tr>
                                                    <td>{category.name}</td>
                                                    <td>{category.description}</td>
                                                    <td>{serviceList.find(x=>x._id == category.serviceId)?.name}</td>
                                                    <td>{category.pricePerPiece}</td>
                                                    <td>{category.pricePerKg}</td>
                                                    <td>{category.isActive == 1 ? 'True' : 'False'}</td>
                                                    <th>
                                                        <div className='table-actions'>
                                                        <Link to={`/portal/category-edit/${category._id}`} className='btn btn-primary btn-sm mr-1'> <FontAwesomeIcon icon={faEdit} className="creatinguser" /></Link>
                                                        <button onClick={() => handleDelete(category._id)} className='btn btn-danger btn-sm mr-1'><FontAwesomeIcon icon={faTrashCan} className="creatinguser" /></button>
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

export default Categorylist