import React, { useState } from 'react'
import "./index.scss"
import { Formik, Form, Field } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import {BASE_URL} from '../utils'
import ResetPassword from "./ResetPassword"
import { toast } from 'react-toastify';
const ForgetPassword = () => {
	const [isReset, setIsReset] = useState(false)
	const [token, setToken] = useState("")
	const Schema = Yup.object().shape({
		email: Yup.string()        
		   .email('Invalid email address.')
		   .required("The field is mandatory.").nullable(),
	});
	const handleSubmit = (values) => {
		axios.get(BASE_URL + "auth/resetpassword", {
			params: {
				email: values.email
			}}
		)
		.then(async (res) => {
			setToken(res.data.data.token)
			handleTokenVerification(res.data.data.token)
		})
		.catch((err) => {
			toast.error("Something went wrong")
		})
	}
	 
	const handleTokenVerification =(data)=>{
		axios.get(BASE_URL + "auth/resetpassword/" + data)
		.then(() => {
			setIsReset(true)
		})
	}

	return (
		<React.Fragment>
		{isReset ? <ResetPassword token={token} /> :
			<div className="sign-up forget-password">
				<div className="sign-up-container">
					<h1>Forgot your password?</h1>
					<p className='forget-password-detail'>Enter the email associated with your account and we’ll send you instructions to reset your password.</p>
					<Formik 
							initialValues={{
								email: "",
							}}
							validationSchema={Schema}
							onSubmit={handleSubmit}
						>
						{({ values, errors, touched, handleChange, handleBlur }) => (
							<Form className="signup-form">
								<div className="input-field-container">
									<label htmlFor="email">Email address</label>
									<Field 
										name="email"
										className={"input-field" + (errors.email && touched.email && errors.email ? " validationErrorInput" : "")}
										placeholder="Enter your full email" 
										type="email"
										onBlur={handleBlur} 
										onChange={handleChange} 
										value={values.email}
									/>
									<span className="validationError">{errors.email && touched.email && errors.email}</span>
								</div>
								<button className="btn" type="submit">Submit</button>
							</Form>
						)}
						</Formik>
				</div>
			</div>
		}
		</React.Fragment>
	)
}

export default ForgetPassword
