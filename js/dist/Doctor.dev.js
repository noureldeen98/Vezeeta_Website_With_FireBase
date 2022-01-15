"use strict";

var _firebaseApp = require("https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js");

var _firebaseFirestore = require("https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js");

var _firebaseStorage = require("https://www.gstatic.com/firebasejs/9.6.2/firebase-storage.js");

var firebaseConfig = {
  apiKey: "AIzaSyACcqVbcyts0Yzwdo_-6LeN_Pw_U_LA8Ng",
  authDomain: "vezeeta-website-db.firebaseapp.com",
  databaseURL: "https://vezeeta-website-db-default-rtdb.firebaseio.com",
  projectId: "vezeeta-website-db",
  storageBucket: "vezeeta-website-db.appspot.com",
  messagingSenderId: "118999132560",
  appId: "1:118999132560:web:117741d75c1a3c81d42b15"
}; // Initialize Firebase

var app = (0, _firebaseApp.initializeApp)(firebaseConfig);
var firestore = (0, _firebaseFirestore.getFirestore)(app);
/********************awel drop down bta3t a5tar l t5sos******************/

var rightPart = document.querySelector('.ulContainer .right');
var leftPart = document.querySelector('.ulContainer .left');

var getDept = function getDept() {
  var q1 = (0, _firebaseFirestore.query)((0, _firebaseFirestore.collection)(firestore, 'Departments'), (0, _firebaseFirestore.where)('common', '==', true));
  (0, _firebaseFirestore.getDocs)(q1).then(function (data) {
    data.forEach(function (doc) {
      var deptName = doc.data().name;
      DisplayData(deptName, rightPart);
    });
  });
  var q2 = (0, _firebaseFirestore.query)((0, _firebaseFirestore.collection)(firestore, 'Departments'), (0, _firebaseFirestore.where)('common', '==', false));
  (0, _firebaseFirestore.getDocs)(q2).then(function (data) {
    data.forEach(function (doc) {
      var deptName = doc.data().name;
      DisplayData(deptName, leftPart);
    });
  });
};

var DisplayData = function DisplayData(item, div) {
  var itemLI = document.createElement('li');
  var itemA = document.createElement('a');
  itemA.setAttribute('class', 'dropdown-item');
  itemA.setAttribute('href', '#');
  itemA.textContent = item;
  itemLI.append(itemA);
  div.insertBefore(itemLI, div.lastChild);
};

getDept();
/******************************* cities *********************************/

var rightCities = document.querySelector('#cities .right');
var leftCities = document.querySelector('#cities .left');

var getCities = function getCities() {
  var q1 = (0, _firebaseFirestore.query)((0, _firebaseFirestore.collection)(firestore, 'Cities'), (0, _firebaseFirestore.where)('common', '==', true));
  (0, _firebaseFirestore.getDocs)(q1).then(function (data) {
    data.forEach(function (doc) {
      var cityName = doc.data().name;
      DisplayCities(cityName, rightCities, doc.id);
    });
  });
  var q2 = (0, _firebaseFirestore.query)((0, _firebaseFirestore.collection)(firestore, 'Cities'), (0, _firebaseFirestore.where)('common', '==', false));
  (0, _firebaseFirestore.getDocs)(q2).then(function (data) {
    data.forEach(function (doc) {
      var cityName = doc.data().name;
      DisplayCities(cityName, leftCities, doc.id);
    });
  });
};

var DisplayCities = function DisplayCities(item, div, id) {
  var itemLI = document.createElement('li');
  itemLI.setAttribute('value', id);
  var itemA = document.createElement('a');
  itemA.setAttribute('class', 'dropdown-item');
  itemA.setAttribute('href', '#');
  itemA.textContent = item;
  itemLI.append(itemA);
  div.insertBefore(itemLI, div.lastChild);
};

getCities();
var rightAreas = document.querySelector('#areas .right');
var leftAreas = document.querySelector('#areas .left'); //dol container l data

var commonSpan = document.querySelector('#commonSpan');
var otherSpan = document.querySelector('#otherSpan');

var getAreas = function getAreas(city) {
  var Areas, allAreas, _commonAreas, _otherAreas;

  return regeneratorRuntime.async(function getAreas$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _firebaseFirestore.getDoc)((0, _firebaseFirestore.doc)(firestore, "Cities", city)));

        case 2:
          Areas = _context.sent;

          if (Areas.data().areas) {
            //remove all prev data
            commonSpan.innerHTML = '';
            otherSpan.innerHTML = '';
            allAreas = Areas.data().areas;
            console.log();
            allAreas.map(function (area) {
              DisplayAreas(area, commonSpan, false);
            });
          } else {
            _commonAreas = Areas.data().commonAreas;
            _otherAreas = Areas.data().otherAreas; //remove all prev data

            commonSpan.innerHTML = '';

            _commonAreas.map(function (area) {
              DisplayAreas(area, commonSpan, true);
            }); //remove all prev data


            otherSpan.innerHTML = '';

            _otherAreas.map(function (area) {
              DisplayAreas(area, otherSpan, true);
            });
          }

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}; //dol l titles


var commonAreas = document.querySelector('#commonAreas');
var otherAreas = document.querySelector('#otherAreas');

var DisplayAreas = function DisplayAreas(item, div, display) {
  if (!display) {
    otherAreas.style.display = 'none';
    commonAreas.style.display = 'none';
  } else {
    otherAreas.style.display = 'block';
    commonAreas.style.display = 'block';
  }

  var itemLI = document.createElement('li');
  var itemA = document.createElement('a');
  itemA.setAttribute('class', 'dropdown-item');
  itemA.setAttribute('href', '#');
  itemA.textContent = item;
  itemLI.append(itemA);
  div.insertBefore(itemLI, div.lastChild);
}; //to make content change


var deptMenu = document.getElementsByClassName('deptMenu')[0];
deptMenu.addEventListener('click', function (e) {
  var deptTitle = document.getElementsByClassName('deptTitle')[0];
  e.preventDefault();
  deptTitle.textContent = e.target.textContent;
});
var deptMenu2 = document.getElementsByClassName('deptMenu')[1];
deptMenu2.addEventListener('click', function (e) {
  e.preventDefault();
  var deptTitle = document.getElementsByClassName('deptTitle')[1];
  deptTitle.textContent = e.target.textContent;
  var cityID = e.path[1].getAttribute('value'); //fill areas

  getAreas(cityID);
});
var deptMenu3 = document.getElementsByClassName('deptMenu')[2];
deptMenu3.addEventListener('click', function (e) {
  var deptTitle = document.getElementsByClassName('deptTitle')[2];
  e.preventDefault();
  deptTitle.textContent = e.target.textContent;
});
/******************** cities span **********************/

var citiesSpan = document.getElementById('citiesSpan');

var getCitiesSpan = function getCitiesSpan() {
  var allCities;
  return regeneratorRuntime.async(function getCitiesSpan$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap((0, _firebaseFirestore.getDocs)((0, _firebaseFirestore.collection)(firestore, 'Cities')));

        case 2:
          allCities = _context2.sent;
          allCities.forEach(function (city) {
            //console.log(city.data().name);
            displayCitySpen(city.data().name);
          });

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
};

getCitiesSpan();

var displayCitySpen = function displayCitySpen(city) {
  var item = "<button type=\"button\" class=\"btn btn-light mx-1\">\n                    <a href=\"#\">\n                        ".concat(city, "\n                    </a>\n                </button>"); // citiesSpan.innerHTML += item;
}; ////////////////////////////////////////////////////////////////////
//DoctorCard


// const storage = getStorage();
// const getImage = async (img) => {
//     const storageRef = ref(storage, `DoctorCall/${img}.jpg`);
//     let url = await getDownloadURL(storageRef);
//     return url;
// }
window.displayDoctorInfo = displayDoctorInfo; // const docRef =doc(firestore, "Doctors_Collection/WOB3F9GigX8UX0O1v8zE");
// const docsnap= await getDoc(docRef)
// console.log(docsnap)
//const docsSnap = await getDocs(collection(firestore,"Doctors_Collection/WOB3F9GigX8UX0O1v8zE/GeneralDoctors"));

var q1 = (0, _firebaseFirestore.query)((0, _firebaseFirestore.collection)(firestore, "Doctors_Collection/WOB3F9GigX8UX0O1v8zE/GeneralDoctors"), (0, _firebaseFirestore.where)('Image', '==', 'amal'));
(0, _firebaseFirestore.getDocs)(q1).then(function (data) {
  data.forEach(function (doc) {
    //let deptName = doc.data().name;
    //DisplayData(deptName,rightPart);
    console.log(doc.data());
    displayDoctorInfo(doc.data());
  });
}); // docsSnap.forEach((doc) => {
//   console.log(doc.data().Name); // "doc1", "doc2" and "doc3"
// });
// Firebase.firestore().collection("Doctors_Collection/WOB3F9GigX8UX0O1v8zE/GeneralDoctors").get()
// querySnapshot.forEach((doc) => {
//     var pic = doc.data().Image;
//      getImage(pic).then(url =>
//         displayDoctorInfo(doc,url))
//     console.log(doc.data().Price)
// });

function displayDoctorInfo(test) {
  // var Card=querySnapshot.data()
  var DocName = document.getElementById('dName');
  var DocDepart = document.getElementById('depart');
  var DocRate = document.getElementById('dRate');
  var DocRate2 = document.getElementById('dRate2');
  var DocInfo = document.getElementById('dInfo');
  var DocPrice = document.getElementById('dPrice');
  DocName.innerHTML = test.Name;
  DocDepart.innerHTML = test.Department;
  DocRate.innerHTML = test.Rate;
  DocRate2.innerHTML = test.Rate;
  DocInfo.innerHTML = test.Information;
  DocPrice.innerHTML = test.Price;
}