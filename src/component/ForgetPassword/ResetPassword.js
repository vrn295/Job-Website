import React from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import {BASE_URL} from '../utils'
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';

const ResetPassword = ({
	token
}) => {
	const Schema = Yup.object().shape({
		password: Yup.string()
     		.required("The field is mandatory."),
		confirmPassword: Yup.string()
     		.required("The field is mandatory."),
	});
	const history = useHistory();
	const handleSubmit = (values) => {
		const data = {
			...values,
			token
		}
		axios.post(BASE_URL + "auth/resetpassword", data)
		.then((res) => {
			toast.success("Password changed successfully")
			history.push("/login");
		})
		.catch((err) => {
			toast.error("Something went wrong")
		})
	}

	return (
		<div className="sign-up forget-password">
			<div className="sign-up-container">
				<h1>Reset Your Password</h1>
				<p className="forget-password-detail">Enter your new password below.</p>
				<Formik 
						initialValues={{
							password: "",
							confirmPassword: "",
						}}
						validationSchema={Schema}
						onSubmit={handleSubmit}
					>
					{({ values, errors, touched, handleChange, handleBlur }) => (
						<Form className="signup-form">
							<div className="input-field-container">
								<label htmlFor="name">New password</label>
								<Field 
									name="password"
									className={"input-field" + (errors.password && touched.password && errors.password ? " validationErrorInput" : "")}
									placeholder="Enter your password" 
									type="password"
									onBlur={handleBlur} 
									onChange={handleChange} 
									value={values.password}
								/>
								<span className="validationError">{errors.password && touched.password && errors.password}</span>
							</div>
							<div className="input-field-container">
								<label htmlFor="confirmPassword">Confirm new password</label>
								<Field 
									name="confirmPassword"
									className={"input-field" + (errors.confirmPassword && touched.confirmPassword && errors.confirmPassword ? " validationErrorInput" : "")}
									placeholder="Enter your password" 
									type="password"
									onBlur={handleBlur} 
									onChange={handleChange} 
									value={values.confirmPassword}
								/>
								<span className="validationError">{errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}</span>
							</div>
							<button className="btn" type="submit">Reset</button>
						</Form>
					)}
					</Formik>
			</div>
		</div>
	)
}

export default ResetPassword
