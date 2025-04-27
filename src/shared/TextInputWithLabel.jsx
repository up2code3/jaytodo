function TextInputWithLabel({elementId,onChange,ref,value,label,labelText}) {
    return (
      <>
        <label htmlFor={elementId}>{label}</label>
        <input type="text"
        labelText={labelText}
          id={elementId}
          ref={ref}
          value={value}
          onChange={onChange}
        />
      </>
    );
  }
  
  export default TextInputWithLabel