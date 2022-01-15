// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import {
    getStorage,
    ref,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-storage.js";
import {
    getFirestore,
    doc,
    getDocs,
    getDoc,
    onSnapshot,
    collection,
    collectionGroup,
    query,
    where,

} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyACcqVbcyts0Yzwdo_-6LeN_Pw_U_LA8Ng",
    authDomain: "vezeeta-website-db.firebaseapp.com",
    projectId: "vezeeta-website-db",
    storageBucket: "vezeeta-website-db.appspot.com",
    messagingSenderId: "118999132560",
    appId: "1:118999132560:web:117741d75c1a3c81d42b15",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage();

// Create a storage reference from our storage service



const getPicOfDoctors = async (index)=>{
    let urlOfImage = ref(storage ,`/HealthOfTeeth/${index}.png`);
    let   theImageURL = await getDownloadURL(urlOfImage)  
    console.log(theImageURL)
     return theImageURL;
    // getCollections(theImageURL)
}



var divOfadertisements = document.getElementById("divOfadertisements")


///////Function to get data of doctor from firestore////////////////
async function getCollections() {
    
    ///////Getting all the documents in the "General_internal_medicine_specialist" collection///////
    const querySnapshot = await getDocs(collection(firestore, "HealthOfTeath"));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const documents = doc.data();
        const theImage = documents.Image;
        getPicOfDoctors(theImage).then(url=>{
            console.log(url)
            displayDoctorCard(documents,url)
            
        })

        //console.log(documents);
         
    })

}getCollections();


/////////// function dispalying the card of each doctor////
function displayDoctorCard(documents,url){
    // console.log(name)
    // console.log(Department)
    console.log(url);
  
let divOfCard=`
<div class="card m-2 " style="width: 20rem;">
<img src=${url} class="card-img-top" alt="...">
<div class="card-body">
  <h5 class="card-title"> ${documents.TitleOfCard}</h5>
  <p class="card-text">
    ${documents.Description}
  </p>
  <p>
    <ul class="listOfStars " >
      <li style="color: orange;">
            <i class="fas fa-star"></i>
        </li>
        <li style="color: orange;">
            <i class="fas fa-star"></i>
        </li>
        <li style="color: orange;">
            <i class="fas fa-star"></i>
        </li>
        <li style="color: orange;">
            <i class="fas fa-star"></i>
        </li>
        <li style="color: orange;">
            <i class="fas fa-star"></i><span style="color: black;">(384) | ${documents.Resevartion} حجز </span> 
        </li>

    </ul> 
  </p>

  <p>
    <span style="text-decoration: line-through;margin-left: 5px;">400 جنيه</span><span style="color: greenyellow;">ستوفر ${documents.Price} جنيه</span><span class="me-5"><a href="#" class="btn btn-primary">احجز الان</a></span>
  </p>

  
</div>
</div>


`
divOfadertisements.innerHTML+=divOfCard

}

