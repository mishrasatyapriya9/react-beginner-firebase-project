import {auth} from "../config/Firebase"
import {provider} from "../config/Firebase"
import {signInWithPopup} from "firebase/auth"
import {useNavigate} from "react-router-dom"
export const Login = () =>{
    const navigate = useNavigate();
    const Signinwithgoogle = async () =>{
       const result  = await signInWithPopup(auth,provider);
       console.log(result);
       navigate("/")
    }
    return (
        <div>
            <p>Signin with google to continue</p>
            <button onClick={Signinwithgoogle}>Signin with google</button>
        </div>
    )
}





// export default Login;