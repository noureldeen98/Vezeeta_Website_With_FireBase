/**************congig firstore*******************/
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import {getFirestore,
    addDoc, collection, onSnapshot, 
    deleteDoc, query, where, getDocs, orderBy,
    getDoc, doc, updateDoc} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js"
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


/**********************slider l t5sos***************************/
//for storage
import { getStorage, ref, getDownloadURL } from 
"https://www.gstatic.com/firebasejs/9.6.2/firebase-storage.js";
const storage = getStorage();
const createPic = async (index) => {
    const imgRef = ref(storage, `Home/slider/${index}.png`);
    let url = await getDownloadURL(imgRef)
    // .then((url) => {
    //     console.log('myyyyyyy', url);
    //     myUrl = url;
    // })
    return url;
    // .catch((error) => {
    //     console.log(error);
    // });
}
//end storage
const firstSlider = document.querySelector('#firstSlider');
const secondSlider = document.querySelector('#secondSlider');
const getSlider = () => {
    let q1 = query(collection(firestore, 'Departments'),
    where('pic', 'in', ['part4p1', 'part4p2', 'part4p3', 'part4p4'] ));
    getDocs(q1)
    .then(data => {
        data.forEach(doc => {
            let deptName = doc.data().name;
            let deptPic = doc.data().pic;
            createPic(deptPic)
            .then(url => {
                displaySliderData(deptName, url, firstSlider)
            });
            //console.log('dataaa', picURL);
            //displaySliderData(deptName, picURL, firstSlider)
        })
    })
    let q2 = query(collection(firestore, 'Departments'),
    where('pic', 'in', ['part4p5', 'part4p6', 'part4p7', 'part4p8']));
    getDocs(q2)
    .then(data => {
        data.forEach(doc => {
            let deptName = doc.data().name;
            let deptPic = doc.data().pic;
            createPic(deptPic)
            .then(url => {
                displaySliderData(deptName, url, secondSlider)
            });
            //displaySliderData(deptName, deptPic, secondSlider)            
        })
    })
}
const displaySliderData = (name, pic, div) => {
    let divEl = `<div class="col-6 col-md-3 ">
    <div class="card position-relative" >
        <img src=${pic} 
        class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class=" cT"> ${name}</h5>
        </div>
    </div>
</div>`;
    div.innerHTML += divEl;
}

getSlider();


/**********************l modal***************************/

//for storage
const createPic2 = async (index) => {
    const imgRef = ref(storage, `Home/modal/${index}.png`);
    let url = await getDownloadURL(imgRef)
    return url;
}
//end storage

const modalBody = document.querySelector('#modalBody');

const getModalBody = () => {
    let q = query(collection(firestore, 'Departments'),
    where('icon', '>=', 1));
    getDocs(q)
    .then(data => {
        data.forEach(doc => {
            let deptName = doc.data().name;
            let deptIcon = doc.data().icon;
            createPic2(deptIcon)
            .then(url => {
                displayModalData(deptName, url)
            });
        })
    })
}

const displayModalData = (name, icon) => {
    const modalContent = `<div class="modalContent">
    <img src=${icon} class="img-fluid">
    <a href="./visitForm.html">${name}</a>
</div>`;
modalBody.innerHTML += modalContent;
}

getModalBody();

/**********************l visiting form***************************/
const dropdownMenu = document.getElementById('dropdownM');

const getFormData = () => {
    let q = query(collection(firestore, 'Departments'),
    where('icon', '>=', 1));
    getDocs(q)
    .then(data => {
        data.forEach(doc => {
            let deptName = doc.data().name;
            displayFormData(deptName)
        })
    })
}

const displayFormData = (name) => {
    const modalContent = `<li> <a class="dropdown-item" href="#">${name}</a> </li>`;
    dropdownMenu.innerHTML += modalContent;
}

getFormData();





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
    citiesSpan.innerHTML += item;
}