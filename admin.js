const ADMIN_KEY = "wL15MMMiDA6mYo3X";
let requestsData = [];

// Persist Login
window.onload = () => {
    if(localStorage.getItem("admin_auth") === "true"){
        showDashboard();
        loadData();
    }
};

function login(){
    if(document.getElementById("adminPass").value === ADMIN_KEY){
        localStorage.setItem("admin_auth", "true");
        showDashboard();
        loadData();
    } else alert("❌ Wrong Password");
}

function logout(){
    localStorage.removeItem("admin_auth");
    location.reload();
}

function showDashboard(){
    loginBox.style.display="none";
    dashboard.style.display="block";
}

// Fetch from Backend
async function loadData(){
    try{
        let res = await fetch("http://localhost:6000/api/requests");
        requestsData = await res.json();
        populateTable(requestsData);
    } catch { alert("⚠ Backend offline") }
}

// Render TABLE
function populateTable(list){
    tableBody.innerHTML="";
    list.forEach((r,i)=>{
        tableBody.innerHTML += `
        <tr>
            <td>${r.name}</td>
            <td>${r.formType}</td>
            <td>${r.mobile}</td>
            <td>${r.date || "N/A"}</td>
            <td><button class="view-btn" onclick="openPDF('${r.fileUrl}')">View</button></td>
            <td>
                <span style="color:${r.status=='Approved'?'#35ff61':'#ffcd29'}">
                ${r.status || "Pending"}
                </span>
            </td>
            <td>
                <button onclick="approve(${i})" style="background:#35ff61;padding:5px">Approve</button>
                <button onclick="deleteReq(${i})" style="background:#ff4d4d;color:white;padding:5px">Delete</button>
            </td>
        </tr>`;
    })
}

// 🔍 FILTER FUNCTION
function filterTable(){
    let q = searchBox.value.toLowerCase();
    let filtered = requestsData.filter(r =>
        r.name?.toLowerCase().includes(q) ||
        r.mobile?.toLowerCase().includes(q) ||
        r.formType?.toLowerCase().includes(q)
    );
    populateTable(filtered);
}

// PDF Viewer Pop-Up
function openPDF(url){
    pdfFrame.src=url;
    pdfModal.style.display="flex";
}
function closePDF(){ pdfModal.style.display="none"; }

// ✔ Approve Request (API)
async function approve(i){
    let id = requestsData[i]._id;
    await fetch(`http://localhost:6000/api/requests/approve/${id}`,{method:"PUT"});
    loadData();
}

// ❌ Delete Request (API)
async function deleteReq(i){
    if(!confirm("Delete permanently?")) return;
    let id = requestsData[i]._id;
    await fetch(`http://localhost:6000/api/requests/${id}`,{method:"DELETE"});
    loadData();
}
