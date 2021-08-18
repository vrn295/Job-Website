import React from 'react'
import "./index.scss"
import { Formik, Form, Field } from 'formik';
import * as Yup from "yup";
import {login} from "../utils"
import { Link, useHistory } from 'react-router-dom';


const Schema = Yup.object().shape({
    email: Yup.string()        
       .email('Invalid email address.')
       .required("The field is mandatory.").nullable(),
	password: Yup.string()
     .required("The field is mandatory."),
});

const PostedJob = ({
	setLoginTrue
}) => {
	const history = useHistory();
	return (
		<div className="sign-up login">
			<div className="sign-up-container">
				<h1>Login</h1>
				<Formik 
						initialValues={{
							email: "",
							password: "",
						}}
						validationSchema={Schema}
						onSubmit={(values) => login(values, () => {
							history.push('/posted-job')
							setLoginTrue()
						})}
					>
					{({ values, errors, touched, handleChange, handleBlur }) => (
						<Form className="signup-form">
							<div className="input-field-container">
								<label htmlFor="email">Email address</label>
								<Field 
									name="email"
									className={"input-field" + (errors.email && touched.email && errors.email ? " validationErrorInput" : "")}
									placeholder="Enter your email" 
									type="email" 
									onBlur={handleBlur} 
									onChange={handleChange} 
									value={values.email}
								/>
								<span className="validationError">{errors.email && touched.email && errors.email}</span>
							</div>
							<div className="input-field-container">
								<div className="password-label">
									<label htmlFor="password">Password</label>
									<Link to="/forget-password" className="forget-password-link">Forgot your password?</Link>
								</div>
								<Field 
									name="password"
									className={"input-field" + (errors.confirmPassword && touched.confirmPassword && errors.confirmPassword ? " validationErrorInput" : "")}
									placeholder="Enter your password" 
									type="password" 
									onBlur={handleBlur} 
									onChange={handleChange} 
									value={values.password}
								/>
								<span className="validationError">{errors.password && touched.password && errors.password}</span>
							</div>
							<button className="btn" type="submit">Login</button>
						</Form>
					)}
					</Formik>
					<p className="signup-already-acc">New to MyJobs? 
						<Link to="/sign-up">
							<span> Create an account</span>
						</Link> 
					</p>
			</div>
		</div>
	)
}

export default PostedJob