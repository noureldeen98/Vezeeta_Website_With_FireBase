import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js"
import {
    getStorage,
    ref,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-storage.js";
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

const rightPart = document.querySelector('.ulContainer .right');
const leftPart = document.querySelector('.ulContainer .left');


const getDept = () => {
    let q1 = query(collection(firestore, 'Departments'),
        where('common', '==', true));
    getDocs(q1)
        .then(data => {
            data.forEach(doc => {
                let deptName = doc.data().name;
                DisplayData(deptName, rightPart);
            })
        })
    let q2 = query(collection(firestore, 'Departments'),
        where('common', '==', false));
    getDocs(q2)
        .then(data => {
            data.forEach(doc => {
                let deptName = doc.data().name;
                DisplayData(deptName, leftPart);
            })
        })
}

const DisplayData = (item, div) => {
    const itemLI = document.createElement('li');
    const itemA = document.createElement('a');
    itemA.setAttribute('class', 'dropdown-item');
    itemA.setAttribute('href', '#');
    itemA.textContent = item;
    itemLI.append(itemA);
    div.insertBefore(itemLI, div.lastChild);
}
getDept();

//DoctorCard
const storage = getStorage();
const getImage = async (img) => {
    const storageRef = ref(storage, `DoctorCall/${img}.jpg`);
    let url = await getDownloadURL(storageRef);

    return url;
}

const querySnapshot = await getDocs(collection(firestore, "Doctors_Collection",
    "WOB3F9GigX8UX0O1v8zE",
    "GeneralDoctors"));

querySnapshot.forEach((doc) => {
    var pic = doc.data().Image;

    getImage(pic).then(url =>
        display(doc, url))
    console.log(doc.data().Price)
});

function display(doc, url) {
    var test = doc.data();
    var DoctorCards = document.getElementById('general');
    var card1 = `
        <div class=" shadow-lg p-3 mb-5 bg-body rounded m-4 mx-auto d-block" id="cards">
      <div class="row">
      <div class="col-2">
      <img  class="card-img rounded   rounded-circle  mt-5 me-2 " alt="image" id="img" src=${url}>
      </div>
        <div class="card-text col-lg-5 col-md-9 col-sm-8 me-4">
        <span class="text-primary fs-5">دكتور <a href="./Doctor.html" class="fs-3 text-decoration-none " id="dName">   ${test.Name}</a> </span><i class="fas fa-phone-alt text-primary fs-5 mx-2"></i><i class="fas fa-video text-primary fs-5 mx-2"></i>
        <p id="depart"> ${test.Department}</p>
        <i class="fas fa-star text-warning"></i><i class="fas fa-star text-warning me-2"></i><i class="fas fa-star text-warning me-2"></i><i class="fas fa-star text-warning me-2"></i><i class="fas fa-star text-warning me-2"></i>
        <p >التقييم العام من <span id="dRate"> ${test.Rate}</span> زاروا الدكتور</p> 
        <i class="fas fa-stethoscope border-bottom border-danger fw-light pb-2 m-2 text-primary"></i>
        <span>  <span id="dTitle"> ${test.Title}</span> </span><br><br>
        <i class="fal fa-money-bill-wave-alt text-primary border-bottom border-danger me-2 ms-3 pb-1"></i>
        <span>الكشف : <span id="dPrice"> ${test.Price}</span> جنيه </span>
        <span class="border border-secondary p-1 rounded-3 text-secondary"><i class="fas fa-tag text-primary border-bottom border-danger me-2 ms-3 pb-1"></i> تقبل أكواد الخصم</span><br><br>
        <i class="far fa-phone text-primary border-bottom border-danger me-2 ms-3 pb-1"></i>
        <span>١٦٦٧٦ - سعر مكالمة عادية</span>
        </div>
        <div class="col-lg-4  col-sm-6 d-none d-md-flex  flex-row bd-highlight mt-4 me-1">
              <div class="   bg-body   mx-auto   px-2 d-flex flex-column text-center" style="width: 250px;">
                <span class=" bg-primary text-light px-3 py-2 rounded-top">اليوم</span>
                <span class="px-3 py-2">10:00 م</span>
                <span class="px-3 py-2">10:30 م</span>
                <span class="px-3 py-2">11:00 م</span>
                <span class="px-3 py-2">المزيد</span>
                <span class=" bg-danger text-light px-3 py-2 rounded-bottom">احجز</span>
            </div>
              <div class="   bg-body   mx-auto   px-2 d-flex flex-column text-center" style="width: 250px;">
                <span class=" bg-primary text-light px-3 py-2 rounded-top">2-1 الأحد</span>
                <span class="px-3 py-2">10:00 م</span>
                <span class="px-3 py-2">10:30 م</span>
                <span class="px-3 py-2">11:00 م</span>
                <span class="px-3 py-2">المزيد</span>
                <span class=" bg-danger text-light px-3 py-2 rounded-bottom">احجز</span>
            </div>
              <div class="   bg-body mx-auto   px-2 d-flex flex-column text-center" style="width: 250px;">
                  <span class=" bg-primary text-light px-3 py-2 rounded-top">غداً</span>
                  <span class="px-3 py-2">10:00 م</span>
                  <span class="px-3 py-2">10:30 م</span>
                  <span class="px-3 py-2">11:00 م</span>
                  <span class="px-3 py-2">المزيد</span>
                  <span class=" bg-danger text-light px-3 py-2 rounded-bottom">احجز</span>
              </div>
             
            </div> 
            <p class="text-center ms-5">الاتصال بميعاد محدد</p>
          </div>
        </div>
        `
    DoctorCards.innerHTML += card1;
}


