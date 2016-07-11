var listOfTAs = [];
var listOfTAsLength;
var curIndex = 0;

var txtFirstName, txtLastName, txtStuId, txtStuSpec;
var txtLogs = '';

/* Adding Events to buttons */
document.getElementById('btnNew').addEventListener("click", btnNewClicked);
document.getElementById('btnEdit').addEventListener("click", btnEditClicked);
document.getElementById('btnDelete').addEventListener("click", btnDeleteClicked);
document.getElementById('btnSave').addEventListener("click", btnSaveClicked);
document.getElementById('btnCancel').addEventListener("click", btnCancelClicked);

document.getElementById('btnFirst').addEventListener("click", btnFirstClicked);
document.getElementById('btnPrevious').addEventListener("click", btnPreviousClicked);
document.getElementById('btnNext').addEventListener("click", btnNextClicked);
document.getElementById('btnLast').addEventListener("click", btnLastClicked);
document.getElementById('btnSelect').addEventListener("click", btnSelectClicked);

function btnNewClicked(){
    clearFields();
    enableSaveAndCancelBtns();
    
    console.log('Array length: ' + listOfTAs.length);
    for(var i = 0; i < listOfTAs.length; i++){
        console.log('From array: ' + listOfTAs[i].firstName + ', ' + listOfTAs[i].lastName + '\n');
    }
}

function clearFields(){
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('studentId').value = '';
    document.getElementById('stuSelected').checked = false;
}

function btnEditClicked(){
    document.getElementById('firstName').focus();
    //btnSaveClicked();
    enableSaveAndCancelBtns();
}

function btnDeleteClicked(){
    var lastName = document.getElementById('lastName').value;
    listOfTAsLength = listOfTAs.length;
    
    for(var i = 0; i < listOfTAsLength; i++){
        if(listOfTAs[i].lastName === lastName){
            txtLogs += 'Removed: ' + listOfTAs[i].firstName + ' ' + listOfTAs[i].lastName + ', ' 
                    + listOfTAs[i].id + ', ' + listOfTAs[i].specialization  + '\n';
            document.getElementById('logsText').value = txtLogs;
            listOfTAs.splice(i, 1);
            break;
        }
    }
    clearFields();
}

function btnSaveClicked(){
    txtFirstName = document.getElementById('firstName').value;
    txtLastName = document.getElementById('lastName').value;
    txtStuId = document.getElementById('studentId').value;
    txtStuSpec  = document.getElementById('stuSpecialization').value;
    
    if(txtFirstName !== "" && txtLastName !== "" && txtStuId !== ""){
        var TA = {};
        TA.firstName = txtFirstName;
        TA.lastName = txtLastName;
        TA.id = txtStuId;
        TA.specialization = txtStuSpec;
        TA.selected = false;

        var stuId = document.getElementById('studentId').value;
        listOfTAsLength = listOfTAs.length;
        var found = 0;
        for(var i = 0; i < listOfTAsLength; i++){
            if(listOfTAs[i].id === stuId){
                document.getElementById('studentId').disabled = true;
                
                listOfTAs[i].firstName = document.getElementById('firstName').value;
                listOfTAs[i].lastName = document.getElementById('lastName').value;
                listOfTAs[i].specialization = document.getElementById('stuSpecialization').value;
                found = 1;
                
                txtLogs += 'Edited: ' + txtFirstName + ' ' + txtLastName + ', ' + txtStuId + ', ' + txtStuSpec + '\n';
                    document.getElementById('logsText').value = txtLogs;
                break;
            } 
        }
        
        if (found === 0){
            listOfTAs.push(TA);
            txtLogs += 'Added: ' + txtFirstName + ' ' + txtLastName + ', ' + txtStuId + ', ' + txtStuSpec + '\n';
            document.getElementById('logsText').value = txtLogs;
        }  
    }
    clearFields();
    disableSaveAndCancelBtns();
}

function btnCancelClicked(){
    disableSaveAndCancelBtns();
    
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var stuId = document.getElementById('studentId').value;
    var stuSpec = document.getElementById('stuSpecialization').value;
    
    document.getElementById('firstName').value = firstName;
    document.getElementById('lastName').value = lastName;
    document.getElementById('studentId').value = stuId;
    document.getElementById('stuSpecialization').value = stuSpec;
}

function btnFirstClicked(){
    curIndex  = 0;
    getTAInfo(curIndex);
}

function btnPreviousClicked(){
    if(curIndex > 0){
        curIndex--;
        getTAInfo(curIndex);
    }
}

function btnNextClicked(){
    curIndex++;
    getTAInfo(curIndex);
}

function btnLastClicked(){
    listOfTAsLength = listOfTAs.length;
    curIndex = listOfTAsLength - 1;
    getTAInfo(curIndex);   
}

function btnSelectClicked(){
    listOfTAsLength = listOfTAs.length;
    
    //generate a random number to select a candidate
    var randomNo = Math.floor((Math.random() * listOfTAsLength));
    txtLogs += 'Selected: ' + listOfTAs[randomNo].firstName + ' ' + listOfTAs[randomNo].lastName + ', ' 
            + listOfTAs[randomNo].id + ', ' + listOfTAs[randomNo].specialization + '\n';
    listOfTAs[randomNo].selected = true;
    document.getElementById('logsText').value = txtLogs;
  
    console.log('list length: ' + listOfTAsLength);
    console.log('random No: ' + randomNo);
}

function getTAInfo(place){
    document.getElementById('firstName').value = listOfTAs[place].firstName;
    document.getElementById('lastName').value = listOfTAs[place].lastName;
    document.getElementById('studentId').value = listOfTAs[place].id;
    document.getElementById('stuSpecialization').value = listOfTAs[place].specialization;
    document.getElementById('stuSelected').checked = listOfTAs[place].selected;
}

function enableSaveAndCancelBtns(){
    document.getElementById('btnNew').disabled = true;
    document.getElementById('btnEdit').disabled = true;
    document.getElementById('btnDelete').disabled = true;
    document.getElementById('btnFirst').disabled = true;
    document.getElementById('btnPrevious').disabled = true;
    document.getElementById('btnNext').disabled = true;
    document.getElementById('btnLast').disabled = true;
    document.getElementById('btnSelect').disabled = true;
    
    document.getElementById('btnSave').disabled = false;
    document.getElementById('btnCancel').disabled = false;
}

function disableSaveAndCancelBtns(){
    document.getElementById('btnSave').disabled = true;
    document.getElementById('btnCancel').disabled = true;
    
    document.getElementById('btnNew').disabled = false;
    document.getElementById('btnEdit').disabled = false;
    document.getElementById('btnDelete').disabled = false;
    document.getElementById('btnFirst').disabled = false;
    document.getElementById('btnPrevious').disabled = false;
    document.getElementById('btnNext').disabled = false;
    document.getElementById('btnLast').disabled = false;
    document.getElementById('btnSelect').disabled = false;   
}
