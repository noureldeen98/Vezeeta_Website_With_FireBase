import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import {getFirestore,
     collection, 
    query, where, getDocs,
    getDoc, doc} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js"
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
/********************awel drop down bta3t a5tar l t5sos******************/
const rightPart = document.querySelector('.ulContainer .right');
const leftPart = document.querySelector('.ulContainer .left');


const getDept = () => {
    let q1 = query(collection(firestore, 'Departments'),
    where('common', '==', true));
    getDocs(q1)
    .then(data => {
        data.forEach(doc => {
            let deptName = doc.data().name;
            DisplayData(deptName,rightPart);
        })
    })
    let q2 = query(collection(firestore, 'Departments'),
    where('common', '==', false));
    getDocs(q2)
    .then(data => {
        data.forEach(doc => {
            let deptName = doc.data().name;
            DisplayData(deptName,leftPart);
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

/******************************* cities *********************************/
const rightCities = document.querySelector('#cities .right');
const leftCities = document.querySelector('#cities .left');

const getCities = () => {
    let q1 = query(collection(firestore, 'Cities'),
    where('common', '==', true));
    getDocs(q1)
    .then(data => {
        data.forEach(doc => {
            let cityName = doc.data().name;
            DisplayCities(cityName, rightCities, doc.id);
        })
    })
    let q2 = query(collection(firestore, 'Cities'),
    where('common', '==', false));
    getDocs(q2)
    .then(data => {
        data.forEach(doc => {
            let cityName = doc.data().name;
            DisplayCities(cityName, leftCities, doc.id);
        })
    })
}

const DisplayCities = (item, div, id) => {
    const itemLI = document.createElement('li');
    itemLI.setAttribute('value', id);
    const itemA = document.createElement('a');
    itemA.setAttribute('class', 'dropdown-item');
    itemA.setAttribute('href', '#');
    itemA.textContent = item;
    itemLI.append(itemA);
    div.insertBefore(itemLI, div.lastChild);
}
getCities();

const rightAreas = document.querySelector('#areas .right');
const leftAreas = document.querySelector('#areas .left');
//dol container l data
const commonSpan = document.querySelector('#commonSpan');
const otherSpan = document.querySelector('#otherSpan');


const getAreas = async (city) => {
    const Areas = await getDoc(doc(firestore,"Cities", city));
    if(Areas.data().areas) {
        //remove all prev data
        commonSpan.innerHTML = '';
        otherSpan.innerHTML = '';
        let allAreas = Areas.data().areas;
        console.log();
        allAreas.map(area => {
            DisplayAreas(area, commonSpan, false)
        })
    } else {
        let commonAreas = Areas.data().commonAreas;
        let otherAreas = Areas.data().otherAreas;
        //remove all prev data
        commonSpan.innerHTML = '';
        commonAreas.map(area => {
            DisplayAreas(area, commonSpan, true);
        });
        //remove all prev data
        otherSpan.innerHTML = '';
        otherAreas.map(area => {
            DisplayAreas(area, otherSpan, true);
        })
    }
}

//dol l titles
const commonAreas = document.querySelector('#commonAreas');
const otherAreas = document.querySelector('#otherAreas');

const DisplayAreas = (item, div, display) => {
    if(!display) {
        otherAreas.style.display='none';
        commonAreas.style.display= 'none';
    }else {
        otherAreas.style.display='block';
        commonAreas.style.display= 'block';
    }
    const itemLI = document.createElement('li');
    const itemA = document.createElement('a');
    itemA.setAttribute('class', 'dropdown-item');
    itemA.setAttribute('href', '#');
    itemA.textContent = item;
    itemLI.append(itemA);
    div.insertBefore(itemLI, div.lastChild);
}



//to make content change
const deptMenu =  document.getElementsByClassName('deptMenu')[0];
deptMenu.addEventListener('click', (e) => {
    const deptTitle = document.getElementsByClassName('deptTitle')[0];
    e.preventDefault();
    deptTitle.textContent = e.target.textContent;
});
const deptMenu2 =  document.getElementsByClassName('deptMenu')[1];
deptMenu2.addEventListener('click', (e) => {
    e.preventDefault();
    const deptTitle = document.getElementsByClassName('deptTitle')[1];
    deptTitle.textContent = e.target.textContent;
    const cityID = e.path[1].getAttribute('value')
    //fill areas
    getAreas(cityID);
});


const deptMenu3 =  document.getElementsByClassName('deptMenu')[2];
deptMenu3.addEventListener('click', (e) => {
    const deptTitle = document.getElementsByClassName('deptTitle')[2];
    e.preventDefault();
    deptTitle.textContent = e.target.textContent;
});



/******************** cities span **********************/
const citiesSpan = document.getElementById('citiesSpan');

const getCitiesSpan = async () => {
    const allCities = await getDocs(collection(firestore, 'Cities'));
    allCities.forEach(city => {
        //console.log(city.data().name);
        displayCitySpen(city.data().name);
    })
}
getCitiesSpan();

const displayCitySpen = (city) => {
    let item = `<button type="button" class="btn btn-light mx-1">
                    <a href="#">
                        ${city}
                    </a>
                </button>`;
   // citiesSpan.innerHTML += item;
}
////////////////////////////////////////////////////////////////////
//DoctorCard
import {
    getStorage,
    ref,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-storage.js";

// const storage = getStorage();
// const getImage = async (img) => {
//     const storageRef = ref(storage, `DoctorCall/${img}.jpg`);
//     let url = await getDownloadURL(storageRef);

//     return url;
// }
window.displayDoctorInfo=displayDoctorInfo

    
// const docRef =doc(firestore, "Doctors_Collection/WOB3F9GigX8UX0O1v8zE");
// const docsnap= await getDoc(docRef)
// console.log(docsnap)



//const docsSnap = await getDocs(collection(firestore,"Doctors_Collection/WOB3F9GigX8UX0O1v8zE/GeneralDoctors"));
let q1 = query(collection(firestore,"Doctors_Collection/WOB3F9GigX8UX0O1v8zE/GeneralDoctors"),
where('Image', '==', 'amal'));
getDocs(q1) 
.then(data => {
    data.forEach(doc => {
        //let deptName = doc.data().name;
        //DisplayData(deptName,rightPart);
        console.log(doc.data())
        displayDoctorInfo(doc.data());
    })
})
// docsSnap.forEach((doc) => {
//   console.log(doc.data().Name); // "doc1", "doc2" and "doc3"
// });

// Firebase.firestore().collection("Doctors_Collection/WOB3F9GigX8UX0O1v8zE/GeneralDoctors").get()
// querySnapshot.forEach((doc) => {
//     var pic = doc.data().Image;

//      getImage(pic).then(url =>
//         displayDoctorInfo(doc,url))
//     console.log(doc.data().Price)
// });

function displayDoctorInfo(test)
{

    // var Card=querySnapshot.data()
    var DocName=document.getElementById('dName');
    var DocDepart=document.getElementById('depart');
    var DocRate=document.getElementById('dRate')
    var DocRate2=document.getElementById('dRate2')
    var DocInfo=document.getElementById('dInfo');
    var DocPrice=document.getElementById('dPrice');
    DocName.innerHTML=test.Name;
    DocDepart.innerHTML=test.Department;
    DocRate.innerHTML=test.Rate;
    DocRate2.innerHTML=test.Rate;
    DocInfo.innerHTML=test.Information;
    DocPrice.innerHTML=test.Price;
}
