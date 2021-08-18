import React, { Component } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from "yup";
import "./index.scss"
import axios from 'axios';
import {BASE_URL, setToken} from "../utils"
import { Link, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';


const Schema = Yup.object().shape({
    name: Yup.string()
        .required("The field is mandatory."),
    email: Yup.string()        
       .email('Invalid email address.')
       .required("The field is mandatory.").nullable(),
	password: Yup.string()
     .required("The field is mandatory."),
	confirmPassword: Yup.string()
     .required("The field is mandatory."),
});

class SignUp extends Component {
    constructor(props) {
        super(props)
		this.state= {
			userRole: "0",
			passwordError: false,
		}
    }

	handleSubmit = (value) =>{
		if(value.password !== value.confirmPassword){
			this.setState({
				passwordError: true
			})
		}
		else{
			const data = {
				...value,
				userRole: Number(this.state.userRole)
			}
			this.setState({
				passwordError: false
			})
			axios.post(BASE_URL + "/auth/register", data)
			.then((res) => {
				setToken(res.data.data.token)
				toast.success("Accout created successfully")
				this.props.setLoginTrue()
				this.props.history.push('/posted-job')
			})
			.catch((err) => {
				toast.error("Something went wrong")
			})
			
		}
	}

    render() {
        return (
            <div className="sign-up">
				<div className="sign-up-container">
					<h1>SignUp</h1>
					<label style={{alignSelf: 'flex-start', marginBottom: "5px"}} htmlFor="position">I’m a*</label>
					<div className="input-btn-container">
						<button 
							className={"signup-position" + (this.state.userRole === "0" ? " signup-position-selected" : "")} 
							value="0" 
							onClick={(e)=> this.setState({userRole: e.target.value})}>
							Recruiter
						</button>
						<button 
							className={"signup-position" + (this.state.userRole === "1" ? " signup-position-selected" : "")} 
							value="1"
							onClick={(e)=> this.setState({userRole: e.target.value})}>
							Candidate
						</button>
					</div>
					<Formik 
						initialValues={{
							name: "",
							email: "",
							password: "",
							confirmPassword: "",
							skills: ""
						}}
						validationSchema={Schema}
						onSubmit = {this.handleSubmit}
					>
					{({ values, errors, touched, handleChange, handleBlur }) => (
						<Form className="signup-form">
							<div className="input-field-container">
								<label htmlFor="name">Full name*</label>
								<Field 
									name="name"
									className={"input-field" + (errors.name && touched.name && errors.name ? " validationErrorInput" : "")}
									placeholder="Enter your full name" 
									type="text"
									onBlur={handleBlur} 
									onChange={handleChange} 
									value={values.name}
								/>
								<span className="validationError">{errors.name && touched.name && errors.name}</span>
							</div>
							<div className="input-field-container">
								<label htmlFor="email">Email address*</label>
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
							<div className="sameLineInput">
								<div className="input-field-container">
									<label htmlFor="password">Create Password*</label>
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
								<div className="input-field-container">
									<label htmlFor="confirmPassword">Confirm Password*</label>
									<Field 
										name="confirmPassword"
										className={"input-field" + (errors.confirmPassword && touched.confirmPassword && errors.confirmPassword ? " validationErrorInput" : "")}
										placeholder="Enter your password" 
										type="password" 
										onBlur={handleBlur} 
										onChange={handleChange} 
										value={values.confirmPassword}
									/>
									<span className="validationError">{((errors.confirmPassword && touched.confirmPassword && errors.confirmPassword) || this.state.passwordError) && "Password should be same." }</span>
								</div>
							</div>
							<div className="input-field-container">
								<label htmlFor="skilles">Skills</label>
								<Field 
									name="skills"
									className="input-field"
									placeholder="Enter comma separated skills" 
									type="text" 
									onBlur={handleBlur} 
									onChange={handleChange} 
									value={values.skills}
								/>
								<span className="validationError">{errors.skills && touched.skills && errors.skills}</span>
							</div>
							<button className="btn" type="submit">Signup</button>
						</Form>
					)}
					</Formik>
					<p className="signup-already-acc">Have an account? 
						<Link to="/login">
							<span> Login</span>
						</Link>
					</p>
				</div>
            </div>
        )
    }
}

export default withRouter(SignUp)