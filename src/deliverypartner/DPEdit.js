import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function DPEdit() {
    const params = useParams();
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        getDPData()
    }, [])

    let getDPData = async () => {
        try {
            const dp = await axios.get(`http://193.203.163.170:3000/api/dp/${params.id}`);
            myFormik.setValues(dp.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const myFormik = useFormik({
        initialValues: {
            countryCode: "",
            mobileNumber: "+91",
            firstName: "",
            lastName: "",
            email: "",
            isActive: 1
        },
        // Validating Forms while entering the data
        validate: (values) => {
            let errors = {}           //Validating the form once the error returns empty else onsubmit won't work

            if (!values.mobileNumber) {
                errors.countryCode = "Please enter Mobile Number";
            }

            if (!values.firstName) {
                errors.countryCode = "Please enter First Name";
            }

            if (!values.lastName) {
                errors.countryCode = "Please enter Last Name";
            }

            if (!values.email) {
                errors.email = "Please enter email";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            return errors;
        },

        onSubmit: async (values) => {
            try {
                setLoading(true);
                await axios.put(`http://193.203.163.170:3000/api/dp/${params.id}`, values);
                setLoading(false);
                navigate("/portal/dp-list")
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
    })
    return (
        <>
            <h3>Delivery Partner - Edit</h3>
            <div className='container'>
                <form onSubmit={myFormik.handleSubmit}>
                    <div className='row'>
                        <div className="col-lg-6">
                            <label>First Name</label>
                            <input name='firstName' value={myFormik.values.firstName} onChange={myFormik.handleChange} type={"text"}
                                className={`form-control ${myFormik.errors.firstName ? "is-invalid" : ""} `} />
                            <span style={{ color: "red" }}>{myFormik.errors.firstName}</span>
                        </div>

                        <div className="col-lg-6">
                            <label>Last Name</label>
                            <input name='lastName' value={myFormik.values.lastName} onChange={myFormik.handleChange} type={"text"}
                                className={`form-control ${myFormik.errors.lastName ? "is-invalid" : ""} `} />
                            <span style={{ color: "red" }}>{myFormik.errors.lastName}</span>
                        </div>

                        <div className="col-lg-6">
                            <label>E-Mail</label>
                            <input name='email' value={myFormik.values.email} onChange={myFormik.handleChange} type={"mail"}
                                className={`form-control ${myFormik.errors.email ? "is-invalid" : ""} `} />
                            <span style={{ color: "red" }}>{myFormik.errors.email}</span>
                        </div>

                        <div className='col-lg-6'>
                            <label>Mobile Number</label>
                            <div className='mobilenumber-field'>
                                <select name='countryCode' value={myFormik.values.countryCode} onChange={myFormik.handleChange}
                                    className={`form-control ${myFormik.errors.countryCode ? "is-invalid" : ""} `} >
                                    <option value="+91">+91</option>
                                    <option value="+1">+1</option>
                                    <option value="+65">+65</option>
                                </select>
                                <input name='mobileNumber' value={myFormik.values.mobileNumber} onChange={myFormik.handleChange} type={"text"}
                                    className={`form-control ${myFormik.errors.mobileNumber ? "is-invalid" : ""} `} />
                            </div>
                            <span style={{ color: "red" }}>{myFormik.errors.mobileNumber}</span>
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

export default DPEdit