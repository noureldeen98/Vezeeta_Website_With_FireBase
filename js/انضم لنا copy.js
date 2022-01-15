window.Done = Done;
function Done(ev) {
    ev.preventDefault();
    // debugger;
    var name = document.getElementById("FullName").value;
    var email = document.getElementById("Email").value;
    var password = document.getElementById("Password").value;
    try {
        Register(email, password, name);
    }
    catch (e) {
        alert(e);
    }
}
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
//  1- get firestore
import { getFirestore, addDoc, collection, onSnapshot, getDoc, doc, updateDoc, deleteDoc, query, where, getDocs, orderBy } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
const firestore = getFirestore(app);
const auth = getAuth();



function Register(email, password, name) {
    createUserWithEmailAndPassword(auth, email, password, name).then((userCreate) => {
        console.log(userCreate.user.uid);
        location.assign("../HTML/اتصل بنا1.html");
        console.log("sucss")

    }).catch((error) => {
        console.log(error.message);
    })
}

onAuthStateChanged(auth, (User) => {
    if (User) {

        // location.assign("../اتصل بنا1.html");
        //    console.log("you login");
        
    }
})




// ////////////////////////////////////////////////////////
window.Save = Save
async function Save() {
    var Name = document.getElementById("FullName").value;
    var Phone = document.getElementById("Phone").value;
    var Email = document.getElementById("Email").value;
    var DataBirth = document.getElementById("DateBirth").value;
   

    // async
    // promises => async, await (call back)
    // async => function to return promises
    // await =>not use i globale must be inside async wait promises to return result then excute   

    // object  of data input value
    var data = {
        Name: Name,
        Phone: Phone,
        Email: Email,
        DataBirth: DataBirth
    }

    
    await addDoc(collection(firestore, 'Users'), data);
    // console.log(Users.id);

    clear();

}



function clear() {
    document.getElementById("FullName").value = "";
    document.getElementById("Phone").value = "";
    document.getElementById("Email").value = "";
    document.getElementById("DateBirth").value = "";
    
}






