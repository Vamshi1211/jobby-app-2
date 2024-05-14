import './index.css'

const EmployeeTypeFilter = props => {
  const {eachType} = props
  const {label, employmentTypeId} = eachType

  return (
    <li className="each-employee-list-item">
      <input type="checkbox" className="checkbox-input" id={employmentTypeId} />
      <label className="label-element" htmlFor={employmentTypeId}>
        {label}
      </label>
    </li>
  )
}

export default EmployeeTypeFilter
