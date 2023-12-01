import './AuthenticatedUserProfile.css';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import TopNav from './TopNav';


const AuthenticatedUserProfile = () => {
    const [userName, setUserName] = useState(null); 
    const [firstName, setFirstName] = useState(null); 

    const location = useLocation();
    const userData = location.state && location.state.userData;





    useEffect(() => {
    
        if (userData) {
            try {
                // Extract categoryNames
                console.log(JSON.stringify(userData));
                setFirstName(userData.fname);

                setUserName(userData.fname + " " + userData.lname);
                } 
            catch (error) {
                console.error('Error parsing JSON:', error);
            }
        }
       
    
        // Now you can use userData in your useEffect
       
      }, [userData]);





    return ( 
    <div id='UserContainer'>
       <TopNav></TopNav>
        
        <div className='ProfileBox'>
            <h2>Hello, JANE</h2>
            <p style={{fontWeight:'bold'}}>Profile Information</p>
            <div>
                <p>First Name: Jane </p>
                <p>Last Name: Doe</p>
                <p>Email: janedoe@gmail.com</p>
            </div>
        </div>
    </div> 
    );
}
 
export default AuthenticatedUserProfile;
