
window.LoginForm = LoginForm;
function LoginForm(ev){
    ev.preventDefault();
    var email = document.getElementById("Email").value;
    var password = document.getElementById("password").value;
    try{
        // call function login
        Login(email,password)
    }
    catch(e){
        alert(e);
    }
}
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";

//  1- get
import { getAuth,onAuthStateChanged,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyACcqVbcyts0Yzwdo_-6LeN_Pw_U_LA8Ng",
    authDomain: "vezeeta-website-db.firebaseapp.com",
    databaseURL: "https://vezeeta-website-db-default-rtdb.firebaseio.com",
    projectId: "vezeeta-website-db",
    storageBucket: "vezeeta-website-db.appspot.com",
    messagingSenderId: "118999132560",
    appId: "1:118999132560:web:117741d75c1a3c81d42b15"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth();

function Login(email, password)
{
    signInWithEmailAndPassword(auth,email,password).then((usr)=>
    {
        console.log(usr.user.uid);
        location.assign("../HTML/home.html");
        
    }).catch((error)=>{
        console.log(error.message);
    })
}
onAuthStateChanged(auth,(user)=>{
    // if user is found go to home page
    if(user){
    //     location.assign("../اتصل بنا1.html");
    // // console.log("you are login ")
}
})