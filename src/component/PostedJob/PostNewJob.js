import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from "yup";
import { BASE_URL, AUTH_TOKEN } from '../utils';


const PostNewJob = () => {
	const Schema = Yup.object().shape({
		title: Yup.string()        
		   .required("The field is mandatory."),
		description: Yup.string()
		 .required("The field is mandatory."),
		location: Yup.string()
		 .required("The field is mandatory."),
	});

	const history = useHistory()

	const handleSubmit = (values) => {
		axios.post(BASE_URL + "jobs/", values, {
			headers: {
				"Authorization": AUTH_TOKEN()
			},
		})
		.then((res) => {
			toast.success("Job created successfully")
			history.push("/posted-job")
		})
		.catch((err) => {
			toast.error("Something went wrong")
		})
	}
	console.log(AUTH_TOKEN())
	return (
		<div className="post-new-job">
			<div className="sign-up-container">
				<h1>Post a Job</h1>
				<Formik 
					initialValues={{
						title: "",
						description: "",
						location: "",
					}}
					validationSchema={Schema}
					onSubmit={handleSubmit}
				>
				{({ values, errors, touched, handleChange, handleBlur }) => (
					<Form className="post-new-job-form">
						<div className="input-field-container">
							<label htmlFor="title">Job title*</label>
							<Field 
								name="title"
								className={"input-field" + (errors.title && touched.title && errors.title ? " validationErrorInput" : "")}
								placeholder="Enter title title" 
								type="text"
								onBlur={handleBlur} 
								onChange={handleChange} 
								value={values.title}
							/>
							<span className="validationError">{errors.title && touched.title && errors.title}</span>
						</div>
						<div className="input-field-container">
							<label htmlFor="description">Description*</label>
							<textarea
								name="description"
								className={"text-area-field" + (errors.description && touched.description && errors.description ? " validationErrorInput" : "")}
								placeholder="Enter job description" 
								type="text" 
								onBlur={handleBlur} 
								onChange={handleChange} 
								value={values.description}
							/>
							<span className="validationError">{errors.description && touched.description && errors.description}</span>
						</div>
						<div className="input-field-container">
							<label htmlFor="location">Location*</label>
							<Field 
								name="location"
								className={"input-field" + (errors.location && touched.location && errors.location ? " validationErrorInput" : "")}
								placeholder="Enter location" 
								type="text" 
								onBlur={handleBlur} 
								onChange={handleChange} 
								value={values.location}
							/>
							<span className="validationError">{errors.location && touched.location && errors.location}</span>
						</div>
						<button className="btn" type="submit">Post</button>
					</Form>
				)}
				</Formik>
			</div>
		</div>
	)
}

export default PostNewJob
