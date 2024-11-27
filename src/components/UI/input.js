import './index.css'

const InputFeild = props => {
  return (
    <div className="label-input">
      <label htmlFor={props.id} className="label-text">
        {props.labelText}
      </label>
      <input
        type={props.type}
        id={props.id}
        name={props.name}
        className="inputfeild login-input" // Combined classes if needed
        onChange={props.onChange} // Pass the onChange prop
      />
    </div>
  )
}

export default InputFeild
