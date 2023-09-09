
$(".edit-city").click(function () {
    var row = $(this).closest("tr"); 
    var id = row.find(".idrow").text();
    var name = row.find(".namerow").text(); 
    $("#editcityname").val(name);
    $("#editcityid").val(id);

    $('#editCityModal').modal('show');

});


function submitFormDetails() {
    var city = $("#cityname").val();
       if ( typeof city === "string" && city.trim().length === 0){
        alert("Field Is Empty ");
    }
    else {
    $.ajax({

        url: '/cities/add',
        type: "POST",
        contentType: "application/json",
        data: city.toString(),
        dataType: "text",
        processData: false,
        cache: false,
        success: function (dataRecord) {
            
            if (parseInt(dataRecord) === 1) {
                swal({
                    title: "Done",
                    text: "City Added Successfully",
                    type: "success"
                }, function () {
                    location.reload();
                });
            } else {
                swal({
                    title: "Error",
                    text: "Error Occurred While Adding City",
                    type: "warning"
                });
            }



        }
    });
}}


function submitNewCityDetails() {
    var cityName = $("#editcityname").val();
    var cityId = $("#editcityid").val();
    var city = {
        id: cityId,
        name: cityName
    };
    if( typeof cityName === "string" && cityName.trim().length === 0){
        
        alert("Field Is Empty ");
    }
    else{
    $.ajax({

        url: '/cities/edit',
        type: "PUT",
        contentType: "application/json",
        data:JSON.stringify(city),
        dataType: "text",
        processData: false,
        cache: false,
        success: function (dataRecord) {
         
            if (parseInt(dataRecord) === 1) {
                swal({
                    title: "Done",
                    text: "City Edited Successfully",
                    type: "success"
                }, function () {
                    location.reload();
                });
            } else {
                swal({
                    title: "Error",
                    text: "Error Occurred While Editing City",
                    type: "warning"
                });
            }



        }
    });
}
}
function deleteCity(id){
    
    var result = confirm( "Are You sure You Want To Delete This Record ?" );

if ( result ) {
  $.ajax({

        url: '/cities/delete',
        type: "DELETE",
        contentType: "application/json",
        data:parseInt(id),
        dataType: "text",
        processData: false,
        cache: false,
        success: function (dataRecord) {
    
        
              if (parseInt(dataRecord) === 1) {
                swal({
                    title: "Done",
                    text: "City Deleted Successfully",
                    type: "success"
                }, function () {
                    location.reload();
                });
            } else {
                swal({
                    title: " Error Occurred While Deleting City",
                    text: " City Has Employees Assigned To It",
                    type: "warning"
                });
            }



        }

    });
} 
    
}


