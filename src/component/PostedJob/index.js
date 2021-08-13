import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import "./index.scss"
import HomeIcon from '@material-ui/icons/Home';
import DescriptionIcon from '@material-ui/icons/Description';
import axios from 'axios';
import { AUTH_TOKEN, BASE_URL } from '../utils';
import JobItem from './JobItem';
import ApplicationModal from './ApplicationModal';
import { toast } from 'react-toastify';
import Pagination from "../utils/Pagination"

const PostJob = () => {
	const history = useHistory();
	const [jobList, setJobList] = useState([])
	const [openModal, setOpenModal] = useState(false)
	const [appId, setAppId] = useState("")
	const [loader, setLoader] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [jobPerPage] = useState(20);

	useEffect(() => {
		setLoader(true)
		axios.get(BASE_URL + "recruiters/jobs", {
			headers: {
				"Authorization": AUTH_TOKEN()
			}
		})
		.then((res)=>{
			res.data.data && setJobList(res.data.data.data)
			setLoader(false)
		})
		.catch((err) => {
			toast.error("Something went wrong")
			setLoader(false)
		})
	}, [])

	const indexOfLastJob = currentPage * jobPerPage;
	const indexOfFirstJob = indexOfLastJob - jobPerPage;
	const currentJobs = jobList.slice(indexOfFirstJob, indexOfLastJob);

	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber)
	}

	const handleApplicationClick = (id) => {
		setAppId(id)
		setOpenModal(true)
	}

	return (
		<React.Fragment>
			{loader ? 
				<div>Loading...</div> :
				<div className="posted-job">
					<div className="posted-job-container">
						<Link to="/" className="posted-job-home">
							<HomeIcon style={{fontSize: "1.2rem"}}/>
							<a>Home</a>
						</Link>
						<h1>Jobs posted by you</h1>
					</div>
					{jobList ? 
						<React.Fragment>
							<div className="poster-job-list">
								{currentJobs.map((job) => 
									<JobItem job={job} handleApplicationClick={handleApplicationClick} />
								)}
							</div>
							<Pagination
								jobPerPage={jobPerPage}
								totalJobs={jobList.length}
								paginate={paginate}
								currentPage={currentPage}
							/>
						</React.Fragment>
					: 
						<div className="posted-job-container-2">
							<DescriptionIcon style={{fontSize: "6rem"}}/>
							<p>Your posted jobs will show here!</p>
							<button className="btn" onClick={()=>history.push("/post-new-job")}>
								Post a Job
							</button>
						</div>
					}
					{openModal &&
					<ApplicationModal 
						appId={appId}
						close={() => setOpenModal(false)}
					/>}
				</div>
			}
		</React.Fragment>
	)
}

export default PostJob
