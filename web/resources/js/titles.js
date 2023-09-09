
$(".edit-title").click(function () {
    var row = $(this).closest("tr"); 
    var id = row.find(".idrow").text();
    var name = row.find(".namerow").text(); 
    $("#editTitleName").val(name);
    $("#editTitleId").val(id);

    $('#editTitleModal').modal('show');

});


function submitFormDetails() {
    var title = $("#TitleName").val();
    var department={id:$("#department option:selected").val(),
    name:$("#department option:selected").text()};

var obj={name:title,
    department};

    
       if ( typeof title === "string" && title.trim().length === 0){
        alert("Field Is Empty ");
    }
    else {
    $.ajax({

        url: '/titles/add',
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(obj),
        dataType: "text",
        processData: false,
        cache: false,
        success: function (dataRecord) {
            
            if (parseInt(dataRecord) === 1) {
                swal({
                    title: "Done",
                    text: "Title Added Successfully",
                    type: "success"
                }, function () {
                    location.reload();
                });
            } else {
                swal({
                    title: "Error",
                    text: "Error Occurred While Adding Title",
                    type: "warning"
                });
            }



        }
    });
}
}


function submitNewTitleDetails() {
    var titleName = $("#editTitleName").val();
    var titleId = $("#editTitleId").val();
    var title = {
        id: titleId,
        name: titleName
    };
       var department={id:$("#editDepartment option:selected").val(),
    name:$("#editDepartment option:selected").text()};

var obj={name:titleName,
    id:titleId,
    department};

    if( typeof titleName === "string" && titleName.trim().length === 0){
        
        alert("Field Is Empty ");
    }
    else{

    $.ajax({

        url: '/titles/edit',
        type: "PUT",
        contentType: "application/json",
        data:JSON.stringify(obj),
        dataType: "text",
        processData: false,
        cache: false,
        success: function (dataRecord) {
         
            if (parseInt(dataRecord) === 1) {
                swal({
                    title: "Done",
                    text: "Title Edited Successfully",
                    type: "success"
                }, function () {
                    location.reload();
                });
            } else {
                swal({
                    title: "Error",
                    text: "Error Occurred While Editing Title",
                    type: "warning"
                });
            }



        }
    });
}
}
function deleteTitle(id){
    
    var result = confirm( "Are You sure You Want To Delete This Record ?" );

if ( result ) {
  $.ajax({

        url: '/titles/delete',
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
                    text: "Title Deleted Successfully",
                    type: "success"
                }, function () {
                    location.reload();
                });
            } else {
                swal({
                    title: " Error Occurred While Deleting Title",
                    text: " Title Has Employees Assigned To It",
                    type: "warning"
                });
            }



        }

    });
} 
    
}


