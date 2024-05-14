import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Header from '../Header'
import Profile from '../Profile'
import EmployeeTypeFilter from '../EmployeeTypeFilter'
import SalaryTypeFilter from '../SalaryTypeFilter'
import AllJobs from '../AllJobs'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusValue = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class Jobs extends Component {
  state = {jobsList: [], apiStatus: apiStatusValue.initial}

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({apiStatus: apiStatusValue.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/jobs'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        title: eachItem.title,
        rating: eachItem.rating,
      }))
      this.setState({jobsList: updatedData, apiStatus: apiStatusValue.success})
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobs = () => {
    const {jobsList} = this.state

    return (
      <ul className="list-container-for-jobs">
        {jobsList.map(eachItem => (
          <AllJobs key={eachItem.id} eachJob={eachItem} />
        ))}
      </ul>
    )
  }

  renderViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusValue.success:
        return this.renderJobs()
      case apiStatusValue.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="mobile-input-container">
            <input
              type="search"
              className="mobile-search-input"
              placeholder="Search"
            />
            <button
              type="button"
              className="mobile-search-button"
              data-testid="searchButton"
            >
              .
              <BsSearch className="search-icon" />
            </button>
          </div>

          <div className="profile-filters-group-container">
            <Profile />
            <hr className="break-line" />
            <ul className="filters-container">
              <h3 className="filter-heading">Type of Employement</h3>
              {employmentTypesList.map(eachItem => (
                <EmployeeTypeFilter
                  key={eachItem.employmentTypeId}
                  eachType={eachItem}
                />
              ))}
            </ul>
            <hr className="break-line" />
            <ul className="filters-container">
              <h3 className="filter-heading">Salary Range</h3>
              {salaryRangesList.map(eachItem => (
                <SalaryTypeFilter
                  key={eachItem.salaryRangeId}
                  eachSalary={eachItem}
                />
              ))}
            </ul>
          </div>
          <div className="jobs-details-container">
            <div className="desktop-input-container">
              <input
                type="search"
                className="mobile-search-input"
                placeholder="Search"
              />
              <button
                type="button"
                className="mobile-search-button"
                data-testid="searchButton"
              >
                .
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div className="job-list-container">{this.renderViews()}</div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
