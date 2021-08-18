import CloseIcon from '@material-ui/icons/Close';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import { useEffect, useState } from 'react';
import {AUTH_TOKEN, BASE_URL} from '../utils'
import axios from 'axios';
const ApplicationModal = ({
	appId,
	close
}) => {
	const [applications, setApplications] = useState([])
	useEffect((appId) => {
		axios.get(`${BASE_URL}recruiters/jobs/${appId}/candidates`, {
			headers: {
				"Authorization": AUTH_TOKEN()
			}
		})
		.then((res) => {
			if(res.data.data){
				setApplications(res.data.data)
			}
		})
	}, [])
	return (
		<div className="modal">
			<div className="modal-container">
				<div className="header">
					<h2>Applicants for this job</h2>
					<CloseIcon className="close-icon" onClick={close}/>
				</div>
				<p className="application-count">{applications ? `Total ${applications.length} applications` : "0 applications"}</p>
				<div className={"application-container" + (applications.length ? " application-container-with-application" : " application-container-no-application")}>
					{applications.length ? 
						<div className="application-grid">
							{applications.map((item) => 
								<Applications data={item} />
							)}
						</div>
						:
						<div className="no-application">
							<AssignmentIndIcon className="no-application-icon" />
							<p>No applications available!</p>
						</div>
					}
				</div>
			</div>	
		</div>
	)
}

const Applications = ({
	data
}) => {
	const capitalize = (word) => {
		return word[0].toUpperCase() + word.slice(1).toLowerCase();
	  }
	return (
		<div className="application">
			<div className="profile">
				<div className="profile-pic">
					{data.name.charAt(0).toUpperCase()}
				</div>
				<div className="user-info">
					<p className="name">
						{capitalize(data.name)}
					</p>
					<p className="email">
						{data.email}
					</p>
				</div>
			</div>
			<div className="skills-container">
				<h2>Skills</h2>
				<p>{data.skills}</p>
			</div>
		</div>
	)
}



export default ApplicationModal
