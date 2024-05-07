const dotenv=require('dotenv');
dotenv.config({path:'config.env'});
const apiUrl = process.env.API_URL;

$("#add_user").submit(function(event){
    alert("Data Inserted Successfully!");
})

$("#update_trainer").submit(function(event){
    event.preventDefault();
// storing data into variable
    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })


    var request = {
        "url" : apiUrl +`/dashboard/Trainers/api/trainers/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
    })

})

if(window.location.pathname=="/dashboard/Trainers"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : apiUrl +`/dashboard/Trainers/api/trainers/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Are u sure u want to delete this Trainer?")){
            $.ajax(request).done(function(response){
                alert("Trainer  Deleted Successfully!");
                location.reload();
            })
        }

    })
}

