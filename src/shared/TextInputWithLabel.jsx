function TextInputWithLabel({elementId,onChange,ref,value,label,labeltext}) {
    return (
      <>
        <label htmlFor={elementId}>{label}</label>
        <input type="text"
        labeltext={labeltext}
          id={elementId}
          ref={ref}
          value={value}
          onChange={onChange}
        />
      </>
    );
  }
  
  export default TextInputWithLabel