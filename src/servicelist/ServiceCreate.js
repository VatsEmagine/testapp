import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function ServiceCreate() {
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    const myFormik = useFormik(
        {
            initialValues: {
                name: "",
                description: "",
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

                if (!values.sortingOrder) {
                    errors.sortingOrder = "Please enter Display Order";
                }

                if(!values.isActive) {
                    errors.isActive = "Please enter Display Order";
                }

                return errors;
            },
            //one can be able to submit once the validates returns empty value (validation successful) else can't be submitted
            onSubmit: async (values) => {
                try {
                    setLoading(true);
                    await axios.post("http://193.203.163.170:3000/api/saveservice", values);
                    navigate("/portal/service-list");
                } catch (error) {
                    console.log(error);
                    alert("Validation failed");
                    setLoading(false);
                }

                console.log(values);
            }

        });
    return (
        <div className='container'>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Create Service</h1>
            </div>

            <form onSubmit={myFormik.handleSubmit}>
                <div className='row'>
                    <div className="col-lg-6">
                        <label>Name</label>
                        <input name='name' value={myFormik.values.name} onChange={myFormik.handleChange} type={"text"}
                            className={`form-control ${myFormik.errors.name ? "is-invalid" : ""} `} />
                        <span style={{ color: "red" }}>{myFormik.errors.name}</span>
                    </div>

                    <div className="col-lg-6">
                        <label>Description</label>
                        <textarea name='description' rows="10" value={myFormik.values.description} onChange={myFormik.handleChange} type={"text"}
                            className={`form-control ${myFormik.errors.description ? "is-invalid" : ""} `}>
                        </textarea>
                        <span style={{ color: "red" }}>{myFormik.errors.description}</span>
                    </div>

                    <div className="col-lg-6">
                        <label>Display Order</label>
                        <input name='sortingOrder' value={myFormik.values.sortingOrder} onChange={myFormik.handleChange} type={"number"}
                            className={`form-control ${myFormik.errors.sortingOrder ? "is-invalid" : ""} `} />
                        <span style={{ color: "red" }}>{myFormik.errors.sortingOrder}</span>
                    </div>

                    <div className='col-lg-4'>
                        <label>Status</label>
                        <select name='isActive' value={myFormik.values.isActive} onChange={myFormik.handleChange}
                            className={`form-control ${myFormik.errors.isActive ? "is-invalid" : ""} `} >
                            <option value="1">Active</option>
                            <option value="0">In-active</option>
                        </select>
                        <span style={{ color: "red" }}>{myFormik.errors.isActive}</span>
                    </div>

                    <div className='col-lg-4 mt-3'>
                        <input disabled={isLoading} type="submit" value={isLoading ? "Submitting..." : "Create"} className=' btn btn-primary' />
                    </div>
                </div>
            </form>
            {/* {JSON.stringify(myFormik.values)} */}
        </div>
    );
}

export default ServiceCreate