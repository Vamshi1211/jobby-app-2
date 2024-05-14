import './index.css'

const SalaryTypeFilter = props => {
  const {eachSalary} = props
  const {salaryRangeId, label} = eachSalary

  return (
    <li className="each-employee-list-item">
      <input type="checkbox" className="checkbox-input" id={salaryRangeId} />
      <label className="label-element" htmlFor={salaryRangeId}>
        {label}
      </label>
    </li>
  )
}

export default SalaryTypeFilter
