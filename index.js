
let familyMembers = [];
//id for family members initialise
var familyMemberId = 0;
//get the familry list parent node
var parentNode = document.getElementById('familyMembers');

dataToUser();
//get saved data
function getData(){
    //get data in local storage if it exits else return empty array
    let existingMembers = localStorage.getItem('members') ? JSON.parse(localStorage.getItem('members')) : [];
    return existingMembers;
}
//function to add member to our list of items
function addMember(){
    //gate the value of age, relationship and smoker
    let age  = document.getElementById('age').value
    let relationship  = document.getElementById('rel').value
    let smoker  = document.getElementById('smoker').value

    //check ic age is field is blank
    if (age <= 0 || age == "") {
        //alert the user to atleast add some text
        alert("age has be above 0. Please type something");
    }
    //check if rel is field is blank
    else if (relationship == "") {
        //alert the user to atleast select
        alert("Relationship cannot be blank. Please select something");
        
    } else {
        //call saveMember function
        saveMember(familyMemberId, age, relationship, smoker);
        //clear input field content
        var form  = document.getElementById('household')
        form.reset()
        
        //increment to get unique id for each member
        familyMemberId++; 
    }
}

//save added member
function saveMember(familyMemberId, age, relationship, smoker){
    //push item array
    familyMembers.push({'id': familyMemberId, 'age': age, 'relationship': relationship, 'smoker': smoker});
    //save to local storage
    localStorage.setItem('members', JSON.stringify(familyMembers));
    //display added data to UI
    dataToUser();
}
//show data to user
function dataToUser (){
    var data = getData();
    //empty UL DOM
    parentNode.innerHTML = '';
    //loop through
    for(var count = 0; count < data.length; count ++){
        //add remove icon to the list item
        var innerItem =  data[count].age +" "+ data[count].relationship + '<a href="" onclick = "removeMemberFromHousehold('  +data[count].id+' ); return false;"> x </a>'
          
        //define our new list item tag
        var newNode = document.createElement('LI');
        //give our new created list item an id
        newNode.setAttribute('id', data[count].id);
        //assign the entered value to the created list ite
        newNode.innerHTML = innerItem;
        //appent it to the parent
        parentNode.appendChild(newNode)
    }
}

//removing member from  household
function removeMemberFromHousehold(id){
    var data = getData();
    //loop
    for(var count = 0; count < data.length; count ++){
        //check if ID is similar
        if (data[count].id == id) {
            data.splice(count, 1)
        }
    }
    //save new array
    localStorage.setItem('members', JSON.stringify(data));
    dataToUser();
}