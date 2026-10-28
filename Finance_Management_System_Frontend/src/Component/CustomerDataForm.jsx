import "../index.css";
import "../App.css";
import { useState } from "react";


export default function CustomerDataForm(){
    
    const fields =[{label:"Full Name:",name:"name"} ,
        {label:"Email:",name:"email"} ,
        {label:"Date Of Birth:" ,name:"dob"},
        {label:"Phone Number:" ,name:"phone"},
        {label:"Aadhar Number:" ,name:"aadhar"},
        {label:"Permanent Address:" ,name:"address"},
        {label:"Account Number:" ,name:"account"}];
    const [formData,setFormData]=useState({
            name:"",
            email:"",
            dob:"",
            phone:"",
            aadhar:"",
            address:"",
            account:""
        });
     const [submitted,setSubmitted] = useState(false);
   
    const handleChange = (event) => {
  const { name, value } = event.target;

  if (name === "phone" && !/^\d*$/.test(value)) {
    return;
  }

  setFormData({
    ...formData,
    [name]: value
  });
};  
    const handleSubmit = async(submit) => {
        submit.preventDefault();

    try {
        const response = await fetch("http://localhost:8080/api/customers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error("Failed to save customer");
        }

        const data = await response.json();

        console.log("Saved customer:", data);
        alert("Customer saved successfully!");
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to save customer");
    }
};
   
    
    return(
        <div className="form-container">
            <h1>Finance Company Data Management System</h1>
            <h2 className="form-heading">Customer Data</h2>

            <form onSubmit={handleSubmit}>
            {fields.map((field) => (
  <div className="form-field" key={field.name}>
    
    <label className="form-label">
      {field.label}
    </label>

    {field.name === "address" ? (
      <textarea
        className="form-input"
        name={field.name}
        value={formData[field.name]}
        onChange={handleChange}
      />
    ) : (
      <input
  className="form-input"
  type={
    field.name === "dob"
      ? "date"
      : field.name === "phone" ? "tel":"text"
  }
  name={field.name}
  value={formData[field.name]}
  onChange={handleChange}
/>
    )}

  </div>
))}
         <div>
            <button className="submit-button"onClick={handleSubmit} type="submit">Submit</button>
    
         </div>
</form>
    </div>

    );
  }
