
$(".edit-city").click(function () {
    var row = $(this).closest("tr"); 
    var id = row.find(".idrow").text();
    var name = row.find(".namerow").text(); 
    $("#editDepartmentName").val(name);
    $("#editDepartmentId").val(id);

    $('#editCityModal').modal('show');

});


function submitFormDetails() {
    var department = $("#depname").val();
         if ( typeof department === "string" && department.trim().length === 0){
        alert("Field Is Empty ");
    }
    $.ajax({

        url: '/departments/add',
        type: "POST",
        contentType: "application/json",
        data: department.toString(),
        dataType: "text",
        processData: false,
        cache: false,
        success: function (dataRecord) {

            if (parseInt(dataRecord) === 1) {
                swal({
                    title: "Done",
                    text: "Department Added Successfully",
                    type: "success"
                }, function () {
                    location.reload();
                });
            } else {
                swal({
                    title: "Error",
                    text: "Error Occurred While Adding Department",
                    type: "warning"
                });
            }



        }
    });
}


function submitNewDepartmentDetails() {
    var depName = $("#editDepartmentName").val();
    var depId = $("#editDepartmentId").val();
    var department = {
        id: depId,
        name: depName
    };
    if ( typeof depName === "string" && depName.trim().length === 0){
        alert("Field Is Empty ");
    }
    else{
    $.ajax({

        url: '/departments/edit',
        type: "PUT",
        contentType: "application/json",
        data:JSON.stringify(department),
        dataType: "text",
        processData: false,
        cache: false,
        success: function (dataRecord) {
         
            if (parseInt(dataRecord) === 1) {
                swal({
                    title: "Done",
                    text: "Department Edited Successfully",
                    type: "success"
                }, function () {
                    location.reload();
                });
            } else {
                swal({
                    title: "Error",
                    text: "Error Occurred While Editing Department",
                    type: "warning"
                });
            }



        }
    });
}
}
function deleteDepartment(id){
    
    var result = confirm( "Are You sure You Want To Delete This Record ?" );

if ( result ) {
  $.ajax({

        url: '/departments/delete',
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
                    text: "City Department Successfully",
                    type: "success"
                }, function () {
                    location.reload();
                });
            } else {
                swal({
                    title: " Error Occurred While Deleting Department",
                    text: " Department Has Job Titles Assigned To It",
                    type: "warning"
                });
            }



        }

    });
} 
    
}


