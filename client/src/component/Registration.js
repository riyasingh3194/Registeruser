import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Registration.css"

const RegistrationForm = () => {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    state: '',
    city: '',
    gender: '',
    dob: '',
    age:''
  });

  // Validation error state
  const [errors, setErrors] = useState({});
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'dob') {
      const today = new Date();
      const birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();
      setFormData({ ...formData, [name]: value, age });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    console.log(formData)
  };

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setFormData({ ...formData, country: selectedCountry, state: '', city: '' });
    const selectedCountryStates = getStatesByCountry(selectedCountry);
    setStates(selectedCountryStates);
  };


  const getStatesByCountry = (countryId) => {
    // Implement logic to fetch states by countryId from the database
    // For this example, we'll return sample data
    return [
      { id: 101, name: 'Uttar Predesh' },
      { id: 102, name: 'Delhi' },
      { id: 103, name: 'Bihar' },
      { id: 104, name: 'Jharkhand' },
      { id: 105, name: 'Karnataka' },

    ];
  };

  const [countries, setCountries] = useState([
    { id: 1, name: 'India' },
    { id: 2, name: 'Japan' },
    { id: 3, name: 'America' },
    { id: 4, name: 'China' },
    { id: 5, name: 'Australia' },
  ]);

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // Get cities based on the selected state (Sample data; to be fetched from the database)
  const getCitiesByState = (stateId) => {
    // Implement logic to fetch cities by stateId from the database
    // For this example, we'll return sample data
    return [
      { id: 201, name: 'Noida' },
      { id: 202, name: 'Pune' },
      { id: 203, name: 'Delhi' },

    ];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const errors = validateForm(formData); // Perform validation
    if (Object.keys(errors).length > 0) {
      // If there are validation errors, set them in the state and prevent the API call
      setErrors(errors);
      return;
    } else {
      // Clear any existing validation errors
      setErrors({});
    }
  
    // Age validation check
    const today = new Date();
    const birthDate = new Date(formData.dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 14) {
      setErrors({ dob: "You must be older than 14 years" });
      return;
    }
  
    // If all validations pass, make the API call
    axios
      .post("http://localhost:8000/reg", {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        country: formData.country,
        state: formData.state,
        city: formData.city,
        gender: formData.gender,
        dob: formData.dob,
        age:formData.age
      })
      .then(function (response) {
        console.log(response);
        // Do something with the response, e.g., show success message, redirect to a different page, etc.
      })
      .catch(function (error) {
        console.log(error);
        // Handle the error, e.g., show an error message
      });
      window.location.href="/"
  };

  const validateForm = (data) => {
    let errors = {};
    const { firstName, lastName, email, country, state, city, dob } = data;

    if (!/^[a-zA-Z]+$/.test(firstName)) {
      errors.firstName = 'First Name must contain alphabets only';
    }

    if (!/^[a-zA-Z]+$/.test(lastName)) {
      errors.lastName = 'Last Name must contain alphabets only';
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = 'Invalid Email format';
    }

    if (!country) {
      errors.country = 'Please select a Country';
    }

    if (!state) {
      errors.state = 'Please select a State';
    }

    if (!city) {
      errors.city = 'Please select a City';
    }

    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 14) {
      errors.dob = 'You must be older than 14 years';
    }

    return errors;
  };

  
  const today = new Date();
  const birthDate = new Date(formData.dob);
  const age = today.getFullYear() - birthDate.getFullYear();


  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFormData({ ...formData, state: selectedState, city: '' });
    const selectedStateCities = getCitiesByState(selectedState);
    setCities(selectedStateCities);
  };


  useEffect(() => {
    // Fetch initial data (e.g., countries) from the database
    // For this example, we'll use the sample data directly
    setCountries([
      { id: 1, name: 'India' },
      { id: 2, name: 'Japan' },
      { id: 3, name: 'America' },
      { id: 4, name: 'China' },
      { id: 5, name: 'Australia' },
    ]);
  setCities([
    { id: 201, name: 'Noida' },
    { id: 202, name: 'Pune' },
    { id: 203, name: 'Delhi' },
    ]);
    setStates([
      { id: 101, name: 'Uttar Predesh' },
      { id: 102, name: 'Delhi' },
      { id: 103, name: 'Bihar' },
      { id: 104, name: 'Jharkhand' },
      { id: 105, name: 'Karnataka' },
    ])
  }, []);


  return (
    <div className="container">
  <h1>HTML registration form with varification</h1>
  <form name="registration" className="registartion-form" onsubmit="return formValidation()">
    <table>
      <tr>
        <td><label for="name">First Name:</label></td>
        <td>    <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          {errors.firstName && (
            <div classNameName="error-message">{errors.firstName}</div>
          )}
        </td>
      </tr>
      <tr>
        <td><label for="name">Last Name:</label></td>
        <td>  <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          {errors.lastName && (
            <div classNameName="error-message">{errors.lastName}</div>
          )}
        </td>
      </tr>
      <tr>
        <td><label for="email">E-Mail:</label></td>
        <td>   <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && (
            <div classNameName="error-message">{errors.email}</div>
          )}
        </td>
      </tr>
      <tr>
        <td><label for="language">country</label></td>
        <td>
        <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleCountryChange}
            required
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.id} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
          {errors.country && (
            <div classNameName="error-message">{errors.country}</div>
          )}
        </td>
      </tr>
      <tr>
        <td><label for="language">State</label></td>
        <td>
        <select
            id="state"
            name="state"
            value={formData.state}
            onChange={handleStateChange}
            required
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.id} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
          {errors.state && (
            <div classNameName="error-message">{errors.state}</div>
          )}
        </td>
      </tr>
      <tr>
        <td><label for="language">city</label></td>
        <td>
        <select
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.id} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
          {errors.city && (
            <div classNameName="error-message">{errors.city}</div>
          )}
        </td>
      </tr>
       <tr>
        <td><label for="gender">Gender:</label></td>
        <td>
          Male:  <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            checked={formData.gender === 'male'}
            onChange={handleChange}
            required
          />
          Female: <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            checked={formData.gender === 'female'}
            onChange={handleChange}
            required
          />
          </td>
      </tr>
      <tr>
        <td><label for="zipcode">Date:</label></td>
        <td>  <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
          {errors.dob && (
            <div classNameName="error-message">{errors.dob}</div>
          )}</td>
      </tr>
      <tr>
        <td><label for="zipcode">Age</label></td>
        <td><input type="text" name="zipcode" id="zipcode" defaultValue="null" onChange={handleChange}
 value={age}/></td>
      </tr>
     
      <tr>
        <td colspan="2"><input type="submit" className="submit" value="Register" onClick={handleSubmit}/></td>
      </tr>
    </table>
  </form>
</div>);
};

export default RegistrationForm;
