import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import {
  getFirestore,
  addDoc,
  collection,
  onSnapshot,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDocs,
  orderBy,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyACcqVbcyts0Yzwdo_-6LeN_Pw_U_LA8Ng",
  authDomain: "vezeeta-website-db.firebaseapp.com",
  projectId: "vezeeta-website-db",
  storageBucket: "vezeeta-website-db.appspot.com",
  messagingSenderId: "118999132560",
  appId: "1:118999132560:web:117741d75c1a3c81d42b15",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

window.TestQuery = TestQuery;
async function TestQuery() {
  const searchBox = document.querySelector("#search-box");
  var closeButton = document.querySelector("#search-close");
  searchBox.addEventListener("click", () => {
    closeButton.style.display = "block";
  });

  const search = document.querySelector("#input-text");
  let searchTerm = search.value;

  var qu = query(
    collection(firestore, "medicines"),
    where("Name", "=", searchTerm)
  );

  var queryResult = await getDocs(qu);
  queryResult.forEach((doc) => {
    var medicineInfo = doc.data();
    var searchResult = document.querySelector("#search-box>ul");
    var itemlist = `
      <li>
      <div class="container stylefont m-0 p-2">
          <div class="row d-flex justify-content-between">
              <div class="col-md-2">
                  <img src="${medicineInfo.Image}"/>
              </div>
  
              <div class="col-md-5">
                  <div  class="mt-1">${medicineInfo.Description}</div>
                  <div class="mt-5">${medicineInfo.Type}</div>
              </div>
  
              <div class="col-md-5 d-flex justify-content-between">
                  <div class="mt-5">
                      <div>${medicineInfo.Price} جنية</div>
                  </div>
                  <div class="mt-4 ms-3">
                      <button type="button" class="vezzeta-btn">
                          <i class="fa fa-plus ms-2"></i><spas class="">اضافة</span></button>
                  </div>
              </div>
          </div>
      </div>
      </li>
      <hr class="m-0">
      `;
    searchResult.innerHTML += itemlist;
  });
}

window.SaveMedicine = SaveMedicine;
async function SaveMedicine() {
  var ID = document.getElementById("ID").value;
  var Name = document.getElementById("Name").value;
  var Type = document.getElementById("Type").value;
  var Price = parseInt(document.getElementById("Price").value);
  var Size = document.getElementById("Size").value;
  var Molarity = document.getElementById("Molarity").value;
  if (Type === "Tablet") {
    var Description = `${document.getElementById("Name").value} | تركيز ${
      document.getElementById("Molarity").value
    } مليجرام / عبوة ${document.getElementById("Size").value} قرص`;
  } else {
    var Description = `${document.getElementById("Name").value} | تركيز ${
      document.getElementById("Molarity").value
    } مليجرام / عبوة ${document.getElementById("Size").value} جم`;
  }
  var Image = document.getElementById("Image").value;

  var medicine = {
    Name: Name,
    Type: Type,
    Price: Price,
    Molarity: Molarity,
    Size: Size,
    Description: Description,
    Image: Image,
  };

  if (ID == "") {
    const medicines = await addDoc(
      collection(firestore, "medicines"),
      medicine
    );
  } else {
    updateDoc(doc(firestore, "medicines", ID), medicine);
  }
  clear();
}

onSnapshot(collection(firestore, "medicines"), (snapshot) => {
  var tableBody = document.querySelector("#medicineInfo>tbody");
  tableBody.innerHTML = "";
  snapshot.forEach((doc) => {
    showMedicine(doc);
  });
});

function showMedicine(medicine) {
  var medicineInfo = medicine.data();
  var tableBody = document.querySelector("#medicineInfo>tbody");
  if (medicineInfo.Type === "Tablet") {
    var row = `
                <tr style="text-align:center">
                <td>${medicineInfo.Name}</td>
                <td>${medicineInfo.Type}</td>
                <td>${medicineInfo.Molarity} مليجرام</td>
                <td>${medicineInfo.Size} قرص</td>
                <td style="width:120px" >${medicineInfo.Price}.00 L.E</td>
                <td>${medicineInfo.Description}</td>
                <td>${medicineInfo.Image}</td>
                <td style="width: 151px;">
                <button type="button" class="btn ms-2 btn-warning"
                onclick="updateMedicines('${medicine.id}')">
                <i class="fas fa-edit"></i></button>
                <button type="button" class="btn ms-3 btn-danger"
                onclick="deleteMedicines('${medicine.id}')">
                <i class="fas fa-trash-alt"></i></button>
                </td>
                </tr>`;
  } else {
    var row = `
                <tr style="text-align:center">
                <td>${medicineInfo.Name}</td>
                <td>${medicineInfo.Type}</td>
                <td>${medicineInfo.Molarity} مليجرام</td>
                <td>${medicineInfo.Size} جم</td>
                <td style="width:120px" >${medicineInfo.Price}.00 L.E</td>
                <td>${medicineInfo.Description}</td>
                <td>${medicineInfo.Image}</td>
                <td style="width: 151px;">
                <button type="button" class="btn ms-2 btn-warning"
                onclick="updateMedicines('${medicine.id}')">
                <i class="fas fa-edit"></i></button>
                <button type="button" class="btn ms-3 btn-danger"
                onclick="deleteMedicines('${medicine.id}')">
                <i class="fas fa-trash-alt"></i></button>
                </td>
                </tr>`;
  }
  tableBody.innerHTML += row;
}

function clear() {
  document.getElementById("ID").value = "";
  document.getElementById("Name").value = "";
  document.getElementById("Type").value = "";
  document.getElementById("Price").value = "";
  document.getElementById("Size").value = "";
  document.getElementById("Molarity").value = "";
  document.getElementById("Description").value = "";
  document.getElementById("Image").value = "";
}

window.updateMedicines = updateMedicines;
async function updateMedicines(ID) {
  const medicineData = await getDoc(doc(firestore, "medicines", ID));
  var medicine = medicineData.data();
  document.getElementById("ID").value = ID;
  document.getElementById("Name").value = medicine.Name;
  document.getElementById("Type").value = medicine.Type;
  document.getElementById("Price").value = medicine.Price;
  document.getElementById("Size").value = medicine.Size;
  document.getElementById("Molarity").value = medicine.Molarity;
  document.getElementById("Description").value = medicine.Description;
  document.getElementById("Image").value = medicine.Image;
}

window.deleteMedicines = deleteMedicines;
async function deleteMedicines(ID) {
  Swal.fire({
    title: "Are you sure?",
    text: "It will be removed from the database PERMANENTLY!",
    icon: "error",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "YES, DELETE IT!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        "Deleted!",
        "Your entry has been deleted.",
        "success",
        deleteDoc(doc(firestore, "medicines", ID))
      );
    }
  });
}
//   // console.log(`strSearch=${strSearch}`);

// window.TestQuery = TestQuery;
// function TestQuery() {
//     console.log(`strSearch=${strSearch}`);
//   const input = document.querySelector("#input-text");
// }

//   var strlength = strSearch.length;
//   var strFrontCode = strSearch.slice(0, strlength - 1);
//   var strEndCode = strSearch.slice(strlength - 1, strSearch.length);
//   var startcode = strSearch;
//   var endcode =
//     strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);
//   var qu = query(
//     collection(firestore, "medicines")
//       .where("strSearch", ">=", startcode)
//       .where("strSearch", "<", endcode)
//   );

//   let strSearch = document.getElementById("search-box").value;
//   var strlength = strSearch.length;
//   var strFrontCode = strSearch.slice(0, strlength - 1);
//   var strEndCode = strSearch.slice(strlength - 1, strSearch.length);
//   var startcode = strSearch;
//   var endcode =
//     strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);

// console.log(queryResult);

//     // var searchResult = document.querySelector("#search-box");
//     //   var item =
//     //   `
//     //   `
