const axios=require('axios').default;
$("#Mark-attendance").submit(function (event) {
    alert("Data Inserted Successfully!");
})
// $("#Get-Records").on("submit",function (event) {
//     event.preventDefault();
//     var date = $("#attendance-date").val();
//     var formattedDate = new Date(date).toLocaleDateString("en-GB", {
//         day: "2-digit",
//         month: "2-digit",
//         year: "numeric"
//     });
//     axios.get('http://localhost:3000/dashboard/Attendance/api/attendances?date=${formattedDate}')
   


// });
const dateInput = document.getElementById('attendance-date');
const dateValue = dateInput.value;
const dateObject = new Date(dateValue);
const day = dateObject.getDate().toString().padStart(2, '0');
const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
const year = dateObject.getFullYear().toString();
const formattedDate = `${day}/${month}/${year}`;
