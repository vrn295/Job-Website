import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';

const JobItem = ({
	job,
	handleApplicationClick
}) => {
	return (
		<div className="job-container">
			<p className="job-title">{job.title}</p>
			<p className="job-description">{job.description}</p>
			<div className="location-btn-container">
				<div className="location-container">
					<LocationOnOutlinedIcon className="location-icon"/>
					<p>{job.location}</p>
				</div>
				<button className="view-app-btn" onClick={() => handleApplicationClick(job.id)}>View Applications</button>
			</div>
		</div>
	)
}

export default JobItem
