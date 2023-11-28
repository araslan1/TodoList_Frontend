import './GuestProfile.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ReactDOM from 'react-dom/client';


const GuestProfile = () => {
    // Will be associated with the inputs
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    // const firstNameRef = useRef<HTMLInputElement>();
    // const lastNameRef = useRef<HTMLInputElement>();


    const handleSave = (e) =>{
        // prevent "Save" button from refreshing the page when clicking on it 
        e.preventDefault();

        const user = {firstname, lastname};
        // console.log(user);

        //  add the user to the database
        // fetch("htpp://localhost:8000/blogs", {
        //     method: 'POST',
        //     headers: {"Content-Type": "application/json"},
        //     body: JSON.stringify(user)
        // }).then(() => {
        //     console.log("new user added");
        // })
    }
    return ( 
    <div>
        <nav>
            <h1>To-Do List</h1>
            {/* 11/11 - https://www.pluralsight.com/guides/understanding-links-in-reactjs */}
            <ul>
                <Link to={"/"}>Home</Link>
                <Link to={"/GuestProfile"}>Profile</Link>
            </ul>
        </nav>
        
        <div className='GuestProfileBox'>
            <h2>Guest</h2>
            <h3>Edit Profile</h3>

            <form onSubmit={handleSave}>
                <div class="section">
                    <div class="field">
                        <label>First Name*</label> 
                        <input 
                            type="text" 
                            value={firstname} 
                            placeholder="First name"
                            // Allows this to change and update
                            // (e) allows you to get the target value
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div class="field">
                        <label>Last Name</label> 
                        <input 
                            type="text" 
                            value={lastname} 
                            placeholder="Last name"
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                </div>
                <button>Save</button>
                {/* <p>{firstname}</p>
                <p>{lastname}</p> */}
            </form>
        </div>
    </div> 
    );
}
 
export default GuestProfile;