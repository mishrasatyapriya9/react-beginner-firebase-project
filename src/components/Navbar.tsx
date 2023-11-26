import {Link} from "react-router-dom"
import {auth} from "../config/Firebase"
import {useAuthState} from "react-firebase-hooks/auth"   
// used to update current user details in the navbar 
import {signOut} from "firebase/auth"
// this is used fpr real time updation in the navbar of name and image after login throw again and again throw another email 
export const Navbar = () =>{
    const [user] = useAuthState(auth);
    // by this auth state we getting th user all details
    const signuserOut = async() =>{
        await signOut(auth);
    }
    return (
        <div className="navbar">
            <div className="links">
                <Link to="/"> Home </Link>
                {!user ? <Link to="/Login">Login</Link> :
                <Link to="/Createpost">Createpost</Link>}
            </div>
            <div className="user">
                //if the user logged in then only the details show after the signout any details not gonna show anymore
                {user  && (
                <>
                {/* <p>{user?.email}</p> */}
                <p> {user?.displayName}</p>
                <img src={user?.photoURL || ""} width="30" height="30" />
                <button onClick={signuserOut}>Log out</button>
                </>
                )}
            </div>
        </div>
    )
}
//export default Signup;
// facilitate using firebase is {react firebase hooks}