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
    let urlOfImage = ref(storage ,`/Doctors/doctorsForCovid/${index}.jpg`);
    let   theImageURL = await getDownloadURL(urlOfImage)  
    console.log(theImageURL)
     return theImageURL;
    // getCollections(theImageURL)
}



var divOfDoctorsCards = document.getElementById("divOfDoctorsCards")


///////Function to get data of doctor from firestore////////////////
async function getCollections() {
    
    ///////Getting all the documents in the "General_internal_medicine_specialist" collection///////
    const querySnapshot = await getDocs(collection(firestore, "Doctors_Collection",
        "WOB3F9GigX8UX0O1v8zE",
        "General_internal_medicine_specialist"));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const documents = doc.data();
        const theImage = documents.Image;
        getPicOfDoctors(theImage).then(url=>{
            console.log(url)
            displayDoctorCard(documents.Name,documents.Department,documents.Title,url)
            
        })

        //console.log(documents);
         
    })

}getCollections();


/////////// function dispalying the card of each doctor////
function displayDoctorCard(name, Department , title,url){
    // console.log(name)
    // console.log(Department)
    console.log(url);
  
let divOfCard=`
<!--The Card Of Each doctor-->
<div class="row" style="width: 100%;">
    <div class="cardOfEachDoctor">
        <div class="row">
            <div class="col">
                <div class="d-flex flex-row d-md-flex mainDivimageAboutDoctor ">
                    <div class="d-flex flex-md-row imageAboutDoctor">

                        <div class=" d-inline float-end mt-3 ml-2 mb-3 col-md-4">
                            <img src=${url} alt="..." class="rounded-circle" style="width: 100px;">
                        </div>

                    </div>
                    <!--The end of 20%-->
                    <div class="infoAboutDoctor">
                        <div class="theDoctor d-flex flex-column col-md-10">
                            <p class=" d-inline mt-4" style="color: cornflowerblue;">دكتور <span
                                    style="font-weight: bolder;color: blue;">${name} </span><br>
                               ${title} </p>
                            <ul class="mt-0 listOfStars">
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
                                    <i class="fas fa-star"></i>
                                </li>

                            </ul>
                            <p class=" d-inline">التقيم العام ٢٥ زاروا الدكتور</p>
                            <p><i style="color: dodgerblue;text-decoration: underline;"
                                    class="fas fa-stethoscope p-1"></i>دكتور <span
                                    style="color: dodgerblue;">${Department}</span></p>
                            <p><i style="color: dodgerblue;"
                                    class="far fa-map-marker-alt p-1"></i>الفروع كورونا </p>
                        </div>
                    </div>
                    <!--The end of 40%-->

                </div>
            </div>

            <div class="col d-none d-md-flex" style="text-align: center;">
                <div class="d-none d-md-flex flex-md-column col-md-4"
                    style="flex-basis:50% ; display: inline;">
                    <div class="d-flex mt-3 me-5">

                        <div class="col-md-4 d-md-flex mainDivOfTimeTable">
                            <div class="cols-md-1 timeTable">
                                <p style="color: white;background-color: blue;">اليوم</p>
                                <p style="color: black;">٨:٠٠ ص</p>
                                <p style="color: black;">٨:٠٠ ص</p>
                                <p style="color: black;">٨:٠٠ ص</p>
                                <input type="button" class="btn btn-danger row-cols-md-1"
                                    value="احجز الان">
                            </div>



                            <div class="col-md-4 mainDivOfTimeTable">
                                <div class="row-cols-md-1 timeTable">
                                    <p style="color: white;background-color: blue;">اليوم</p>
                                    <p style="color: black;">٨:٠٠ ص</p>
                                    <p style="color: black;">٨:٠٠ ص</p>
                                    <p style="color: black;">٨:٠٠ ص</p>
                                    <input type="button" class="btn btn-danger row-cols-md-1"
                                        value="احجز الان">
                                </div>

                            </div>

                            <div class="col-md-4" style="text-align: center;width: 80px; ">
                                <div class="row-cols-md-1 timeTable">
                                    <p style="color: white;background-color: blue;">اليوم</p>
                                    <p style="color: black;">٨:٠٠ ص</p>
                                    <p style="color: black;">٨:٠٠ ص</p>
                                    <p style="color: black;">٨:٠٠ ص</p>
                                    <input type="button" class="btn btn-danger row-cols-md-1"
                                        value="احجز الان">
                                </div>
                            </div>
                        </div>


                    </div>


                </div>
            </div>

            <div class="d-flex flex-row d-md-none me-1">
                <div class="d-flex flex-row mb-3 d-md-none " style="width: 100%;">
                    <div class="d-inline ms-2 "
                        style="border-radius: 5px;background-color: gainsboro;width: 70%;">
                        <p> متاح من ... الى ...</p>
                    </div>
                    <div class="d-inline">
                        <button type="button" class="btn btn-danger">احجز الان!</button>
                    </div>
                </div>




            </div>

        </div>
    </div>
</div>


`
divOfDoctorsCards.innerHTML+=divOfCard

}

