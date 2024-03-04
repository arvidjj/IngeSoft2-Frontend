
const LabelBase = ({ label, htmlFor, children }) => {
    return (
        <div className="form-group" style={{ marginBottom:"5px",marginTop:"8px", fontSize:"14px"}}>
            <label htmlFor={htmlFor} >{label}</label>
            {children}
        </div>
    );
};

export default LabelBase;
