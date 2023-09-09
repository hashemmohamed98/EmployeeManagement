$(".edit-employee").click(function () {
    var row = $(this).closest("tr"); 
    var id = row.find(".idrow").text();
    var name = row.find(".namerow").text(); 
     var date = row.find(".daterow").text(); 
      var contractRow = row.find(".contractrow").text(); 
      var code= row.find(".coderow").text(); 
      var dep= row.find(".deprow").text();
      var cityrow= row.find(".cityrow").text();
      var managerRow= row.find(".managerrow").text();
      var statusRow=row.find(".statusrow").text();
       var titleRow=row.find(".titlerow").text();
    $("#editempName").val(name);
    $("#editempid").val(id);
    console.log(id);
    $("#editempBirthDate").val(date);
     $("#editempCode").val(code);
    
    var contract = document.getElementById('editempContract');
    contract.value = contractRow;
    
 var department = document.getElementById ('editempDepartment');
department.selectedIndex = [...department.options].findIndex (option => option.text === dep);  


var manager = document.getElementById ('editmanager');
manager.selectedIndex = [...manager.options].findIndex (option => option.text === managerRow);

var city = document.getElementById ('editempBirthCity');

city.selectedIndex = [...city.options].findIndex (option => option.text === cityrow);

var status = document.getElementById ('editempStatus');
console.log(statusRow.trim());
status.selectedIndex = [...status.options].findIndex (option => option.text === statusRow.trim());

var title = document.getElementById ('editTitle');
console.log(statusRow.trim());
title.selectedIndex = [...title.options].findIndex (option => option.text === titleRow);

    $('#editEmployeeModal').modal('show');

});

function doFilter() {
    $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
        var empId = document.getElementById("empId").value;
        var empCode = document.getElementById("code").value;
        var empBirthDate = document.getElementById("birthDate").value;
        var empName = document.getElementById("name").value;
        var empDepartment = document.getElementById("department").value;
        var empContract = document.getElementById("contract").value;
        var empStatus = document.getElementById("status").value;
        var empManager = document.getElementById("manager").value;
        var empBirthCity = document.getElementById("birthCity").value;
        var empTitle = document.getElementById("title").value;

        var codeColumn = String(data[0]);                      // Employee Code Column
        var nameColumn = String(data[1]);                   // Employee Name Column
        var birthDateColumn = String(data[2]);            // Employee Birth Date Column
        var birthCityColumn = String(data[3]);            // Employee Birth City  Column
        var IdColumn = String(data[4]);                     // Employee ID Column
        var departmentColumn = String(data[5]);    // Employee Department Column
        var titleColumn = String(data[6]);               // Employee Job Title Column
        var contractColumn = String(data[7]);       // Employee Contract Type Column
        var managerColumn = String(data[8]);     // Employee  Direct Manager Column
        var statusColumn = String(data[9]);        // Employee Status Column

        if (
                CheckMatches(codeColumn, empCode) &&
                CheckMatches(nameColumn, empName) &&
                CheckMatches(birthDateColumn, empBirthDate) &&
                CheckMatches(birthCityColumn, empBirthCity) &&
                CheckMatches(IdColumn, empId) &&
                CheckMatches(departmentColumn, empDepartment) &&
                CheckMatches(titleColumn, empTitle) &&
                CheckMatches(contractColumn, empContract) &&
                CheckMatches(statusColumn, empStatus) &&
                CheckMatches(managerColumn, empManager)
                )
        {

            return true;
        }

        return false;
    });

    var table = $('#table').DataTable();

    // Redraw Table With Desired  Filters
    table.draw();

}

function CheckMatches(columnData, userInput) {

    if (columnData.toUpperCase().includes(userInput.toUpperCase()) || userInput === "") {

        return true;
    } else {
        return false;
    }


}
function getJobTitlesBasedOnDepartment(status) {
   var depId;
    if(status==='new'){
     depId = $("#empDepartment option:selected").val();
    document.getElementById("ModalSec").innerHTML = ``;
    $.ajax({

        url: '/titles/dep',
        type: "GET",
        contentType: "application/json",
        data: {dep: parseInt(depId)},
        dataType: "json",
        processData: true,
        cache: false,
        success: function (dataRecord) {
            console.log(dataRecord);
            console.log(dataRecord[1]);
            if (dataRecord.length > 0) {
                document.getElementById("ModalSec").innerHTML += `<label for="jobTitles" class=""> Job Titles </label>
                                    <select class="form-control selectInput" onchange="showBtn()" name="jobTitles" id="jobTitles">
                                        <option value="" selected ></option>`;
                for (var i = 0; i < dataRecord.length; i++) {
                    console.log("ID " + dataRecord[i].id);
                    console.log("Name " + dataRecord[i].name);
                    document.getElementById("jobTitles").innerHTML += '<option value="' + dataRecord[i].id + '">' + dataRecord[i].name + '</option>';
                }
                document.getElementById("jobTitles").innerHTML += "</select>";


            }

        }});

    $.ajax({

        url: '/managers',
        type: "GET",
        contentType: "application/json",
        data: {dep: parseInt(depId)},
        dataType: "json",
        processData: true,
        cache: false,
        success: function (dataRecord) {
            console.log(dataRecord);
            console.log(dataRecord[1]);
            if (dataRecord.length > 0) {
                document.getElementById("ModalSec").innerHTML += `<label for="Managers" class=""> Direct Managers </label>
                                    <select class="form-control selectInput"  name="Managers" id="Managers">
                                        <option value="" selected ></option>`;
                for (var i = 0; i < dataRecord.length; i++) {
                    console.log("ID " + dataRecord[i].id);
                    console.log("Name " + dataRecord[i].name);
                    document.getElementById("Managers").innerHTML += '<option value="' + dataRecord[i].id + '">' + dataRecord[i].name + '</option>';
                }
                document.getElementById("Managers").innerHTML += "</select>";


            }

        }});
    
    }
 
 else{
     depId = $("#editempDepartment option:selected").val();
 console.log("Department Id = " + parseInt(depId));
    document.getElementById("ModalEditSec").innerHTML = ``;
    $.ajax({

        url: '/titles/dep',
        type: "GET",
        contentType: "application/json",
        data: {dep: parseInt(depId)},
        dataType: "json",
        processData: true,
        cache: false,
        success: function (dataRecord) {
            console.log(dataRecord);
            console.log(dataRecord[1]);
            if (dataRecord.length > 0) {
                document.getElementById("ModalEditSec").innerHTML += `<label for="editTitle" class=""> Job Titles </label>
                                    <select class="form-control selectInput" onchange="showBtn()" name="editTitle" id="editTitle">
                                        <option value="" selected ></option>`;
                for (var i = 0; i < dataRecord.length; i++) {
                    console.log("ID " + dataRecord[i].id);
                    console.log("Name " + dataRecord[i].name);
                    document.getElementById("editTitle").innerHTML += '<option value="' + dataRecord[i].id + '">' + dataRecord[i].name + '</option>';
                }
                document.getElementById("editTitle").innerHTML += "</select>";


            }

        }});

    $.ajax({

        url: '/managers',
        type: "GET",
        contentType: "application/json",
        data: {dep: parseInt(depId)},
        dataType: "json",
        processData: true,
        cache: false,
        success: function (dataRecord) {
            console.log(dataRecord);
            console.log(dataRecord[1]);
            if (dataRecord.length > 0) {
                document.getElementById("ModalEditSec").innerHTML += `<label for="editmanager" class=""> Direct Managers </label>
                                    <select class="form-control selectInput"  name="editmanager" id="editmanager">
                                        <option value="" selected ></option>`;
                for (var i = 0; i < dataRecord.length; i++) {
                    console.log("ID " + dataRecord[i].id);
                    console.log("Name " + dataRecord[i].name);
                    document.getElementById("editmanager").innerHTML += '<option value="' + dataRecord[i].id + '">' + dataRecord[i].name + '</option>';
                }
                document.getElementById("editmanager").innerHTML += "</select>";


            }

        }});
    
    
    }
 
    
    }

function showBtn() {
    var element = document.getElementById("submitBtn");
    element.classList.remove("disabled");

}

function submitFormDetails() {
    var empName = $("#empName").val();

    var empCode = $("#empCode").val();

    var empBirthDate = $("#empBirthDate").val();

    var birthCity = {id: $("#empBirthCity option:selected").val(),

        name: $("#empBirthCity option:selected").text()};

    var empStatus = $("#empStatus option:selected").val();

    var empContract = $("#empContract option:selected").val();
       

    var department = {id: $("#empDepartment option:selected").val(),
        name: $("#empDepartment option:selected").text()};

    var manager =  $("#Managers option:selected").val();
     

    var jobTitle = {id: $("#jobTitles option:selected").val(),
        name: $("#jobTitles option:selected").text()};


    var obj = {name: empName, code:empCode,birthDate:empBirthDate,managerId:manager,contractType:empContract,status:empStatus,
        department,jobTitle,birthCity};

    if ( (typeof empName === "string" && empName.trim().length === 0) || 
            (typeof empCode === "string" && empCode.trim().length ===0) ||
           (typeof empBirthDate === "string" && empBirthDate.trim().length ===0)) {
       
                          alert("Field Is Empty ");
    } else {
        $.ajax({

            url: '/employees/add',
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(obj),
            dataType: "json",
            processData: false,
            cache: false,
            success: function (dataRecord) {

                if (parseInt(dataRecord) === 1) {
                    swal({
                        title: "Done",
                        text: "Employee Added Successfully",
                        type: "success"
                    }, function () {
                        location.reload();
                    });
                } else {
                    swal({
                        title: "Error Adding Employee",
                        text: "Employee Code Already Exist",
                        type: "warning"
                    });
                }



            }
        });
    }
    }
function submitEditFormDetails() {
    var empName = $("#editempName").val();
 var empId = $("#editempid").val();
    var empCode = $("#editempCode").val();

    var empBirthDate = $("#editempBirthDate").val();

    var birthCity = {id: $("#editempBirthCity option:selected").val(),

        name: $("#editempBirthCity option:selected").text()};

    var empStatus = $("#editempStatus option:selected").val();

    var empContract = $("#editempContract option:selected").val();
       

    var department = {id: $("#editempDepartment option:selected").val(),
        name: $("#editempDepartment option:selected").text()};

    var manager =  $("#editmanager option:selected").val();
     

    var jobTitle = {id: $("#editTitle option:selected").val(),
        name: $("#jobTitles option:selected").text()};


    var obj = {id:empId,name:empName, code:empCode,birthDate:empBirthDate,managerId:manager,contractType:empContract,status:empStatus,
        department,jobTitle,birthCity};

    if ( (typeof empName === "string" && empName.trim().length === 0) || 
            (typeof empCode === "string" && empCode.trim().length ===0) ||
           (typeof empBirthDate === "string" && empBirthDate.trim().length ===0)) {
       
                          alert("Field Is Empty ");
    } else {
        $.ajax({

            url: '/employees/edit',
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify(obj),
            dataType: "json",
            processData: false,
            cache: false,
            success: function (dataRecord) {

                if (parseInt(dataRecord) === 1) {
                    swal({
                        title: "Done",
                        text: "Employee Edited Successfully",
                        type: "success"
                    }, function () {
                        location.reload();
                    });
                } else {
                    swal({
                        title: "Error Editing Employee",
                        text: "Employee Code Already Exist",
                        type: "warning"
                    });
                }



            }
        });
    }

}

function deleteEmployee(id){
    
    var result = confirm( "Are You sure You Want To Delete This Record ?" );

if ( result ) {
  $.ajax({

        url: '/employees/delete',
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
                    text: "Employee Deleted Successfully",
                    type: "success"
                }, function () {
                    location.reload();
                });
            } else {
                swal({
                    title: " Error Occurred While Deleting Employee",
                    text: " Employee Is A Manager And Has  Employees Assigned To Him ",
                    type: "warning"
                });
            }



        }

    });
} 
    
}