import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function CategoryEdit() {
    const params = useParams();
    const [isLoading, setLoading] = useState(false);
    const [serviceList, setServiceList] = useState([]);
    const [categoryData, setCategoryData] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        getCategoryData()
        getServiceLists()
    }, [])

    let getCategoryData = async () => {
        try {
            const category = await axios.get(`http://193.203.163.170:3000/api/category/${params.id}`);
            myFormik.setValues(category.data);
            setCategoryData(category.data);
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

    const myFormik = useFormik({
        initialValues: {
            name: "",
                description: "",
                serviceId: "",
                pricePerKg: 0,
                pricePerPiece: 0,
                sortingOrder: 1,
                isActive: 1
        },
        // Validating Forms while entering the data
        validate: (values) => {
            let errors = {}           //Validating the form once the error returns empty else onsubmit won't work

            if (!values.name) {
                errors.name = "Please enter Name";
            }

            if (!values.description) {
                errors.description = "Please enter Description";
            }

            if (!values.serviceId) {
                errors.serviceId = "Please select Service";
            }

            if (!values.pricePerKg) {
                errors.pricePerKg = "Please enter Price";
            }

            if (!values.pricePerPiece) {
                errors.pricePerPiece = "Please enter Price";
            }

            if (!values.sortingOrder) {
                errors.sortingOrder = "Please enter Display Order";
            }

            if(!values.isActive) {
                errors.isActive = "Please enter Display Order";
            }

            return errors;
        },

        onSubmit: async (values) => {
            try {
                setLoading(true);
                await axios.put(`http://193.203.163.170:3000/api/category/${params.id}`, values);
                setLoading(false);
                navigate("/portal/category-list")
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
    })
    return (
        <>
            <div className='container'>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h2 className="h3 mb-0 text-gray-800">Edit Category </h2>
            </div>

            <form onSubmit={myFormik.handleSubmit}>
            <div className='row'>
                    <div className="col-lg-6">
                        <label>Name</label>
                        <input name='name' value={myFormik.values.name} onChange={myFormik.handleChange} type={"text"}
                            className={`form-control ${myFormik.errors.name ? "is-invalid" : ""} `} />
                        <span style={{ color: "red" }}>{myFormik.errors.name}</span>
                    </div>

                    <div className='col-lg-6'>
                        <label>Service Type</label>
                        <select name='serviceId' value={myFormik.values.serviceId} onChange={myFormik.handleChange}
                            className={`form-control ${myFormik.errors.serviceId ? "is-invalid" : ""} `} >
                            <option value="">----Select----</option>
                            {serviceList.map((serv) => {
                                            return (
                                                <option value={serv._id}>{serv.name}</option>
                                            )
                                        })}
                        </select>
                        <span style={{ color: "red" }}>{myFormik.errors.isActive}</span>
                    </div>

                    <div className="col-lg-6">
                        <label>Price/KG</label>
                        <input name='pricePerKg' value={myFormik.values.pricePerKg} onChange={myFormik.handleChange} type={"number"}
                            className={`form-control ${myFormik.errors.pricePerKg ? "is-invalid" : ""} `} />
                        <span style={{ color: "red" }}>{myFormik.errors.pricePerKg}</span>
                    </div>
                    
                    <div className="col-lg-6">
                        <label>Price/Piece</label>
                        <input name='pricePerPiece' value={myFormik.values.pricePerPiece} onChange={myFormik.handleChange} type={"number"}
                            className={`form-control ${myFormik.errors.pricePerPiece ? "is-invalid" : ""} `} />
                        <span style={{ color: "red" }}>{myFormik.errors.pricePerPiece}</span>
                    </div>
                    <div className="col-lg-6">
                        <label>Display Order</label>
                        <input name='sortingOrder' value={myFormik.values.sortingOrder} onChange={myFormik.handleChange} type={"number"}
                            className={`form-control ${myFormik.errors.sortingOrder ? "is-invalid" : ""} `} />
                        <span style={{ color: "red" }}>{myFormik.errors.sortingOrder}</span>
                    </div>

                    <div className='col-lg-6'>
                        <label>Status</label>
                        <select name='isActive' value={myFormik.values.isActive} onChange={myFormik.handleChange}
                            className={`form-control ${myFormik.errors.isActive ? "is-invalid" : ""} `} >
                            <option value="1">Active</option>
                            <option value="0">In-active</option>
                        </select>
                        <span style={{ color: "red" }}>{myFormik.errors.isActive}</span>
                    </div>

                    <div className="col-lg-6">
                        <label>Description</label>
                        <textarea name='description' rows="10" value={myFormik.values.description} onChange={myFormik.handleChange} type={"text"}
                            className={`form-control ${myFormik.errors.description ? "is-invalid" : ""} `}>
                        </textarea>
                        <span style={{ color: "red" }}>{myFormik.errors.description}</span>
                    </div>

                    <div className='col-lg-12 mt-3'>
                        <input disabled={isLoading} type="submit" value={isLoading ? "Updating..." : "Update"} className=' btn btn-primary' />
                    </div>
                </div>
            </form>
            {/* {JSON.stringify(myFormik.values)} */}
        </div>
        </>


    )
}

export default CategoryEdit