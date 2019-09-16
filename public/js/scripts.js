//Toggles hide/show of log in form
function toggleLogin(){
  var loginForm = document.getElementById('loginForm')
  if(loginForm !== null){
    if(loginForm.style.display === 'none'){
      loginForm.style.display = 'inline'
    }
    else{
      loginForm.style.display = 'none'
    }
  }
  else{
    createLoginForm()
  }
}

//Creates login form
function createLoginForm(){
  var html =  "<form action=\"\" class=\"loginForm\" id=\"loginForm\" style=\"display : inline\">"
      html += "<legend>Login</legend>"
      html += "<label for=\"username\">username</label>"
      html += "<input name=\"username\"type=\"text\" id=\"uName\" value=\"username\"><br>"
      html += "<label for=\"pass\">password</label>"
      html += "<input name=\"pass\" type=\"password\" id=\"pass\" value=\"password\"><br>"
      html += "<button type=\"button\" onclick=\"doLogin()\"id=\"loginUser\">Log In</button></form>"
  document.getElementById("Container").innerHTML = ""
  document.getElementById("Container").innerHTML = html
}

//Logs user out
function logOut(){
  fetch('/logout', {
    method:'GET',
    headers: {'Content-Type': 'application/json'},
  })
  .then(function(res){
    window.location = res.url
  })
}

//Runs login function
function doLogin(){
  let uName = document.getElementById("uName").value
  let pass = document.getElementById("pass").value
  let body = {username: uName, password: pass}
  body = JSON.stringify(body)
  fetch('/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body
  })
  .then(function(res){
    if(res.status === 200){
      //console.log(res.json().userName)
      console.log("HERE")
      console.log(res)
      //console.log(res.json().url)
      window.location = res.url
    }
    else{
      console.log("FAILURE")
      console.log(res)
    }
  })
}

//Handles geting all user data from database
function getAllData(){
  fetch('/allData', {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  }).then(function(res){
    return res.json()
  }).then(function(fin){
    toggleViewAll(fin)
  })
}

//Toggles hide/show of entire database table
function toggleViewAll(dataArray){
  let viewAll = document.getElementById("viewAll")
  if(viewAll !== null){
    if(viewAll.style.display === 'none'){
      viewAll.style.display = 'table'
    }
    else{
      viewAll.style.display = 'none'
    }
  }
  else{
    createViewAll(dataArray)
  }
  hideAllBut("viewAll")
}

//Creates entire database table
function createViewAll(dataArray){
  var html = "<table id=\"viewAll\">"
  html += "<tr><th>First Name</th><th>Last Name</th><th>Month</th><th>Day</th><th>Sign</th><th>User</th></tr>"
  dataArray.forEach(function (single){
    html += "<tr>"
    html += "<td>" + single.fName + "</td>"
    html += "<td>" + single.lName + "</td>"
    html += "<td>" + single.month + "</td>"
    html += "<td>" + single.day + "</td>"
    html += "<td>" + single.sign + "</td>"
    html += "<td>" + single.user + "</td>"
    html += "</tr>"
  })
  html += "</table>"
  var tableDiv = document.createElement('div')
  tableDiv.innerHTML = html
  document.body.appendChild(tableDiv)
}

//Handles geting given user data from database
function getDataForUser(){
  fetch('/allDataForUser', {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  }).then(function(res){
    return res.json()
  }).then(function(fin){
    toggleViewUser(fin)
  })
}

//Toggles hide/show of given user data database table
function toggleViewUser(dataArray){
  let viewAll = document.getElementById("viewUser")
  if(viewAll !== null){
    if(viewAll.style.display === 'none'){
      viewAll.style.display = 'table'
    }
    else{
      viewAll.style.display = 'none'
    }
  }
  else{
    createViewUser(dataArray)
  }
  hideAllBut("viewUser")
}

//Creates given user database table
function createViewUser(dataArray){
  var html = "<table id=\"viewUser\">"
  html += "<tr><th>First Name</th><th>Last Name</th><th>Month</th><th>Day</th><th>Sign</th><th>User</th></tr>"
  dataArray.forEach(function (single){
    html += "<tr>"
    html += "<td>" + single.fName + "</td>"
    html += "<td>" + single.lName + "</td>"
    html += "<td>" + single.month + "</td>"
    html += "<td>" + single.day + "</td>"
    html += "<td>" + single.sign + "</td>"
    html += "<td>" + single.user + "</td>"
    html += "</tr>"
  })
  html += "</table>"
  var tableDiv = document.createElement('div')
  tableDiv.innerHTML = html
  document.body.appendChild(tableDiv)
}

//Hides but given ID
function hideAllBut(id){
  let allItems = document.body.childNodes;
  allItems.forEach(function(child){
    if(child.tagName === 'DIV'){
      let childForms = child.childNodes
      if(childForms !== undefined){
        childForms.forEach(function(form){
          if(form.id !== id){
            form.style.display = 'none'
          }
        })
      }
    }
  })
}

//Toggles hide/show of user management menu
function showUserDBMenu(){
  
}

//Creates user database menu
function createUserDBMenu(){
  
}

//Toggles hide/show of data management menu
function showDataDBMenu(){
  fetch('/allDataForUser', {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  }).then(function(res){
    return res.json()
  }).then(function(fin){
    console.log(fin)
    toggleDataDBMenu(fin)
  })
}

function toggleDataDBMenu(dataArray){
  let dataDBMenu = document.getElementById("dataDBMenu")
  if(dataDBMenu !== null){
    console.log("EXISTS")
    if(dataDBMenu.style.display !== 'none'){
      console.log("STILL EXISTS")
      dataDBMenu.parentNode.remove()
    }
  }
  else{
    createDataDBMenu(dataArray)
  }
  hideAllBut("dataDBMenu")
}

function createDataDBMenu(dataArray){
  var html = "<form id=\"dataDBMenu\">"
  html += "<select id=\"dataDBMenuDropdown\">"
  dataArray.forEach(function (single, index){   
    html += "<option value=\"" + index + "\">"
    html += index + " "
    html += single.fName + " "
    html += single.lName + " "
    html += single.month + " "
    html += single.day + " "
    html += "</option>"
  })
  dataArray.forEach(function (single, index){   
    html += "</select>"
    html += "<p style=\"display: none\" id=\"" + index + "\">"
    html += JSON.stringify(single)
    html += "</p>"
  })
  html += "<div id=\"buttonDiv\"><button onclick=\"toggleDataDBMenuEdit()\"type=\"button\"id=\"modifyEntry\">Modify Entry</button>"
  html += "<button onclick=\"deleteEntry()\"type=\"button\"id=\"deleteEntry\">Delete Entry</button></div>"
  html += "</form>"
  var formDiv = document.createElement('div')
  formDiv.innerHTML = html
  document.body.appendChild(formDiv)
}

function toggleDataDBMenuEdit(){
  hideAllBut("dataDBMenuEdit")
  let dataDBMenuEdit = document.getElementById("dataDBMenuEdit")
  if(dataDBMenuEdit !== null){
    if(dataDBMenuEdit.style.display === 'none'){
      dataDBMenuEdit.style.display = 'block'
    }
    else{
      dataDBMenuEdit.style.display = 'none'
    }
  }
  else{
    createDataDBMenuEdit()
  }
}

function createDataDBMenuEdit(){
  let dataDBMenuInfo = JSON.parse(document.getElementById(document.getElementById("dataDBMenuDropdown").value).innerHTML)
  var html = "<form id=\"editData\">"
  html += "<label for=\"fName\">First Name</label>"
  html += "<input id=\"fName\" type=\"text\" value=\"" + dataDBMenuInfo.fName + "\"></input>"
  html += "<label for=\"lName\">Last Name</label>"
  html += "<input id=\"lName\" type=\"text\" value=\"" + dataDBMenuInfo.lName + "\"></input>"
  html += "<label for=\"month\">Month</label>"
  html += monthToHTML(dataDBMenuInfo.month)
  html += daysToHTML(dataDBMenuInfo.month, dataDBMenuInfo.day)
  html += "<button type=\"button\" onclick=\"sendModify()\">Submit</button>"
  html += "<p id=\"originalData\"style=\"display: none\">"
  html += JSON.stringify(dataDBMenuInfo)
  html += "</p>"
  html += "</form>"
  var editDiv = document.createElement('div')
  editDiv.innerHTML = html
  document.body.appendChild(editDiv)
}

function sendModify(){
  let original = JSON.parse(document.getElementById("originalData").innerHTML)
  let newData = {
    fName: document.getElementById("fName").value,
    lName: document.getElementById("lName").value, 
    month: document.getElementById("monthDropdown").value,
    day: document.getElementById("dayDropdown").value,
    user: original.user
  }
  let body = JSON.stringify({original: original, new: newData})
  fetch('/modifydata', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body
  })
  .then(function(res){
    console.log(res)
    return res.json()
  })
  .then(function(fin){
    console.log(fin)
    hideAllBut("")
    getDataForUser()
  })
}

//Removes all options from given select element
function removeAllOptions(selection, removalGroup){
  var len, groups, par;
  if(removalGroup){
    groups = selection.getElementsByTagName('option')
    len = groups.length;
    for(var i = len; i; i--){
      selection.removeChild(groups[i-1])
    }
  }
  len = selection.options.length
  for(var i=len; i; i--){
    par = selection.options[i-1].parentNode;
    par.removeChild(selection.options[i-1])
  }
}

//Adds given data as options to given select element
function appendDataToSelect(sel, data) {
  for(let i = 0; i<data.length; i++){
      var opt = document.createElement("option")
      opt.innerHTML = opt.value = data[i]
      sel.appendChild(opt)
  }
}

function daysToHTML(month, day){
  let totalDays = hasDays(monthToNum(month));
  let html = "<label for=\"days\">Day of Birth</label>"
  html += "<select name=\"days\" id=\"dayDropdown\">"
  for(let i = 1; i <= totalDays; i++){
    html += "<option "
    if(i === day){
      html += "selected=\"selected\" "
    }
    html += "value=\"" + i + "\">"+ i + "</option>"
  }
  html += "</select><br>"
  return html;
}

function updateDays(){
  let currentMonth = document.getElementById('monthDropdown').value
  let monthNum = monthToNum(currentMonth)
  let numDays = hasDays(monthNum)
  let selection = document.getElementById("dayDropdown")
  removeAllOptions(selection, true)
  appendDaysToSelect(selection, numDays)
}

function appendDaysToSelect(selection, numDays){
  for(let i = 1; i<= numDays; i++){
    var opt = document.createElement("option")
    opt.innerHTML = i
    opt.value = i
    selection.appendChild(opt)
  }
}

function monthToNum(month){
  switch(month){
    case "January":
      return 0;
    case "February":
      return 1;
    case "March":
      return 2;
    case "April":
      return 3;
    case "May":
      return 4;
    case "June":
      return 5;
    case "July":
      return 6;
    case "August":
      return 7;
    case "September":
      return 8;
    case "October":
      return 9;
    case "November":
      return 10;
    case "December":
      return 11;
  }
}

function hasDays(month){
  switch(month){
    case 0:
      return 31;
    case 1:
      return 29;
    case 2:
      return 31;
    case 3:
      return 30;
    case 4:
      return 31;
    case 5:
      return 30;
    case 6:
      return 31;
    case 7:
      return 31;
    case 8:
      return 30;
      break;
    case 9:
      return 31;
    case 10:
      return 30;
    case 11:
      return 31;
  }
}

const DateDataForDropdown = {
  'days' : {
    January:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31' ],
    February:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29'],
    March:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31' ],
    April:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30' ],
    May:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31' ],
    June:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30' ],
    July:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31' ],
    August:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31' ]      ,
    September:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30' ]    ,
    October:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31' ]      ,
    November:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
    December:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31' ]      
  }
}

const MonthDataForDropdown = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]

function monthToHTML(month){
  let html = "<select onchange=\"updateDays()\"name=\"month\" id=\"monthDropdown\">"
  switch(month){
    case "January":
      html += "<option selected=\"selected\" value=\"January\">January</option>"
      html += "<option value=\"February\">February</option>"
      html += "<option value=\"March\">March</option>"
      html += "<option value=\"April\">April</option>"
      html += "<option value=\"May\">May</option>"
      html += "<option value=\"June\">June</option>"
      html += "<option value=\"July\">July</option>"
      html += "<option value=\"August\">August</option>"
      html += "<option value=\"September\">September</option>"
      html += "<option value=\"October\">October</option>"
      html += "<option value=\"November\">November</option>"
      html += "<option value=\"December\">December</option></select><br>"
      return html;
    case "February":
      html += "<option value=\"January\">January</option>"
      html += "<option selected=\"selected\" value=\"February\">February</option>"
      html += "<option value=\"March\">March</option>"
      html += "<option value=\"April\">April</option>"
      html += "<option value=\"May\">May</option>"
      html += "<option value=\"June\">June</option>"
      html += "<option value=\"July\">July</option>"
      html += "<option value=\"August\">August</option>"
      html += "<option value=\"September\">September</option>"
      html += "<option value=\"October\">October</option>"
      html += "<option value=\"November\">November</option>"
      html += "<option value=\"December\">December</option></select><br>"
      return html;
    case "March":
      html += "<option value=\"January\">January</option>"
      html += "<option value=\"February\">February</option>"
      html += "<option selected=\"selected\" value=\"March\">March</option>"
      html += "<option value=\"April\">April</option>"
      html += "<option value=\"May\">May</option>"
      html += "<option value=\"June\">June</option>"
      html += "<option value=\"July\">July</option>"
      html += "<option value=\"August\">August</option>"
      html += "<option value=\"September\">September</option>"
      html += "<option value=\"October\">October</option>"
      html += "<option value=\"November\">November</option>"
      html += "<option value=\"December\">December</option></select><br>"
      return html;
    case "April":
      html += "<option value=\"January\">January</option>"
      html += "<option value=\"February\">February</option>"
      html += "<option value=\"March\">March</option>"
      html += "<option selected=\"selected\" value=\"April\">April</option>"
      html += "<option value=\"May\">May</option>"
      html += "<option value=\"June\">June</option>"
      html += "<option value=\"July\">July</option>"
      html += "<option value=\"August\">August</option>"
      html += "<option value=\"September\">September</option>"
      html += "<option value=\"October\">October</option>"
      html += "<option value=\"November\">November</option>"
      html += "<option value=\"December\">December</option></select><br>"
      return html;
    case "May":
      html += "<option value=\"January\">January</option>"
      html += "<option value=\"February\">February</option>"
      html += "<option value=\"March\">March</option>"
      html += "<option value=\"April\">April</option>"
      html += "<option selected=\"selected\" value=\"May\">May</option>"
      html += "<option value=\"June\">June</option>"
      html += "<option value=\"July\">July</option>"
      html += "<option value=\"August\">August</option>"
      html += "<option value=\"September\">September</option>"
      html += "<option value=\"October\">October</option>"
      html += "<option value=\"November\">November</option>"
      html += "<option value=\"December\">December</option></select><br>"
      return html;
    case "June":
      html += "<option value=\"January\">January</option>"
      html += "<option value=\"February\">February</option>"
      html += "<option value=\"March\">March</option>"
      html += "<option value=\"April\">April</option>"
      html += "<option value=\"May\">May</option>"
      html += "<option selected=\"selected\" value=\"June\">June</option>"
      html += "<option value=\"July\">July</option>"
      html += "<option value=\"August\">August</option>"
      html += "<option value=\"September\">September</option>"
      html += "<option value=\"October\">October</option>"
      html += "<option value=\"November\">November</option>"
      html += "<option value=\"December\">December</option></select><br>"
      return html;
    case "July":
      html += "<option value=\"January\">January</option>"
      html += "<option value=\"February\">February</option>"
      html += "<option value=\"March\">March</option>"
      html += "<option value=\"April\">April</option>"
      html += "<option value=\"May\">May</option>"
      html += "<option value=\"June\">June</option>"
      html += "<option selected=\"selected\" value=\"July\">July</option>"
      html += "<option value=\"August\">August</option>"
      html += "<option value=\"September\">September</option>"
      html += "<option value=\"October\">October</option>"
      html += "<option value=\"November\">November</option>"
      html += "<option value=\"December\">December</option></select><br>"
      return html;
    case "August":
      html += "<option value=\"January\">January</option>"
      html += "<option value=\"February\">February</option>"
      html += "<option value=\"March\">March</option>"
      html += "<option value=\"April\">April</option>"
      html += "<option value=\"May\">May</option>"
      html += "<option value=\"June\">June</option>"
      html += "<option value=\"July\">July</option>"
      html += "<option selected=\"selected\" value=\"August\">August</option>"
      html += "<option value=\"September\">September</option>"
      html += "<option value=\"October\">October</option>"
      html += "<option value=\"November\">November</option>"
      html += "<option value=\"December\">December</option></select><br>"
      return html;
    case "September":
      html += "<option value=\"January\">January</option>"
      html += "<option value=\"February\">February</option>"
      html += "<option value=\"March\">March</option>"
      html += "<option value=\"April\">April</option>"
      html += "<option value=\"May\">May</option>"
      html += "<option value=\"June\">June</option>"
      html += "<option value=\"July\">July</option>"
      html += "<option value=\"August\">August</option>"
      html += "<option selected=\"selected\" value=\"September\">September</option>"
      html += "<option value=\"October\">October</option>"
      html += "<option value=\"November\">November</option>"
      html += "<option value=\"December\">December</option></select><br>"
      return html;
    case "October":
      html += "<option value=\"January\">January</option>"
      html += "<option value=\"February\">February</option>"
      html += "<option value=\"March\">March</option>"
      html += "<option value=\"April\">April</option>"
      html += "<option value=\"May\">May</option>"
      html += "<option value=\"June\">June</option>"
      html += "<option value=\"July\">July</option>"
      html += "<option value=\"August\">August</option>"
      html += "<option value=\"September\">September</option>"
      html += "<option selected=\"selected\" value=\"October\">October</option>"
      html += "<option value=\"November\">November</option>"
      html += "<option value=\"December\">December</option></select><br>"
      return html;
    case "November":
      html += "<option value=\"January\">January</option>"
      html += "<option value=\"February\">February</option>"
      html += "<option value=\"March\">March</option>"
      html += "<option value=\"April\">April</option>"
      html += "<option value=\"May\">May</option>"
      html += "<option value=\"June\">June</option>"
      html += "<option value=\"July\">July</option>"
      html += "<option value=\"August\">August</option>"
      html += "<option value=\"September\">September</option>"
      html += "<option value=\"October\">October</option>"
      html += "<option selected=\"selected\" value=\"November\">November</option>"
      html += "<option value=\"December\">December</option></select><br>"
      return html;
    case "December":
      html += "<option value=\"January\">January</option>"
      html += "<option value=\"February\">February</option>"
      html += "<option value=\"March\">March</option>"
      html += "<option value=\"April\">April</option>"
      html += "<option value=\"May\">May</option>"
      html += "<option value=\"June\">June</option>"
      html += "<option value=\"July\">July</option>"
      html += "<option value=\"August\">August</option>"
      html += "<option value=\"September\">September</option>"
      html += "<option value=\"October\">October</option>"
      html += "<option value=\"November\">November</option>"
      html += "<option selected=\"selected\" value=\"December\">December</option></select><br>"
      return html;
  }
}


































//******** HIDE-SHOW *******//
//Controls ADD NEW FORM
function displayNewForm(){
  var newForm = document.getElementById("newForm");
  var modForm = document.getElementById("modForm");
  var editForm = document.getElementById("editForm");
  var horo = document.getElementById("horo");
  if(horo !== null){
      horo.style.display = 'none'
  }
  modForm.style.display = 'none'
  if(editForm !== null){
      editForm.style.display = 'none'
  }
  if(document.getElementById("resultsTable") !== null){
    document.getElementById("Container").innerHTML = ''
  }
  if(newForm.style.display === 'none'){
    newForm.style.display = 'inline';
    var form = document.forms['NEW'];

    // reference to controlling select box
    var sel = form.elements['month'];
    sel.selectedIndex = 0;
    // name of associated select box
    var relName = 'days';
    // reference to associated select box
    var rel = form.elements[ relName ];
    // get data for associated select box passing its name
    // and value of selected in controlling select box
    var data = DateDataForDropdown[ relName ][ sel.value ];
    // add options to associated select box
    appendDataToSelect(rel, data);
    
    //Add onchange function to live update to new month
    sel.onchange = function(e){
      var subName = 'days'
      var dates = document.forms['NEW'].elements[subName]
      var newData = DateDataForDropdown[subName][this.value]
      removeAllOptions(dates)
      appendDataToSelect(dates, newData)
    }
  }
  else{
    newForm.style.display = 'none';
  }
}
 
//Controls MOD DATA FORM
function displayModForm(){
  var newForm = document.getElementById("newForm");
  var editForm = document.getElementById("editForm");
  var horo = document.getElementById("horo");
  if(horo !== null){
      horo.style.display = 'none'
  }
  newForm.style.display = 'none'
  if(editForm !== null){
      editForm.style.display = 'none'
  }
  if(document.getElementById("resultsTable") !== null){
    document.getElementById("Container").innerHTML = ''
  }
    
  var modForm = document.getElementById("modForm");
  if(modForm.style.display === 'none'){
    modForm.style.display = 'inline';
    //Add onchange function to live update to new month
    modForm.onchange = function(e){
      showEditDataForm()
    }
  }
  else{
    modForm.style.display = 'none';
  }
  populateFromDatabase()
}

//Controls EDIT DATA FORM
function showEditDataForm(){
  var parentInfo = document.getElementById("modForm");
  var editFormExists = document.forms['EDIT']
  if(editFormExists){
    editFormExists = null;
    showEditDataForm()
  }
  else{
    var html = "<form action=\"\" id=\"editForm\" class=\"editForm\"><legend>EDIT</legend>"
    html += "<label for=\"fName\">First Name:</label>"
    html += "<input type=\"text\" class=\"fNameE\" value=\""
    var selectInfo = document.getElementsByName('modList')[0]
    var selectedIndex = selectInfo.selectedIndex
    //selected index -1
    fetch('getData', {
      method: 'GET',
    })
    .then(function(response){
      response.text()
      .then(function(message){
        let allData = JSON.parse(message)
        if(selectedIndex > 0){
          selectedIndex--;
          html += allData[selectedIndex].fName + "\"><br>"
          html += "<p id=\"modHolder\" style=\"display:none\">" + JSON.stringify(allData[selectedIndex]) + "</p>"
          html += "<label for=\"lName\">Last Name:</label>"
          html += "<input type=\"text\" class=\"lNameE\" value=\""
          html += allData[selectedIndex].lName + "\"><br>"
          var month = allData[selectedIndex].month
          html += monthToHTML(month)
          var day = allData[selectedIndex].day
          html += daysToHTML(month, day)
          html += "<button id=\"submitChanges\">SubmitChanges</button>"
          html +="<button id=\"remove\">Delete Original</button>"
          html += "</form>"
          document.getElementById("Container").innerHTML = ""
          document.getElementById("Container").innerHTML = html
          var form = document.forms['editForm'];
          var sel = form.elements['month'];
          sel.onchange = function(e){
            var subName = 'days'
            var dates = document.forms['editForm'].elements[subName]
            var newData = DateDataForDropdown[subName][this.value]
            removeAllOptions(dates)
            appendDataToSelect(dates, newData)
          }
          document.getElementById("submitChanges").onclick = submitChanges;
          document.getElementById("remove").onclick = remove;
        }
      })
    })
    
  }

}

function displayData(){
  var newForm = document.getElementById("newForm");
  var modForm = document.getElementById("modForm");
  var editForm = document.getElementById("editForm");
  newForm.style.display = 'none'
  modForm.style.display = 'none'
  if(editForm !== null){
      editForm.style.display = 'none'
  }
  if(document.getElementById("resultsTable") !== null){
    document.getElementById("Container").innerHTML = ''
  }
  else{
    fetch('/getData', {
        method: 'GET',
    })
    .then(function(response){
      response.text()
      .then(function(message){
        let allData = JSON.parse(message)
        console.log(message)
        var html = "<table id=\"resultsTable\" class=\"resultsTable\"><tr><th colspan=\"6\">Existing Data</th></tr>"
        html += "<tr><td>Index</td><td>First Name</td><td>Last Name</td><td>Day of Birth</td><td>Month of Birth</td><td>Sign</td><td>Created By</td></tr>"
        for(let i = 0; i< Object.keys(allData).length; i++){
          html += "<tr>" 
          html += "<td>" + i + "</td>"
          html += "<td>" + allData[i].fName + "</td>"
          html += "<td>" + allData[i].lName + "</td>"
          html += "<td>" + allData[i].day + "</td>"
          html += "<td>" + allData[i].month + "</td>"
          html += "<td>" + allData[i].sign + "</td>"
          html += "<td>" + allData[i].user + "</td>"
          html +="</tr>"
        }
        html += "</table>"
        document.getElementById("Container").innerHTML = html
      })
    })
  }
}

function generateHoroscope(){
  var newForm = document.getElementById("newForm");
  var modForm = document.getElementById("modForm");
  var editForm = document.getElementById("editForm");
  newForm.style.display = 'none'
  modForm.style.display = 'none'
  if(editForm !== null){
      editForm.style.display = 'none'
  }
  var horo = document.getElementById("horo");
  console.log(horo.style.display)
  if(horo.style.display === 'none'){
      horo.style.display = 'inline'
  }
  else{
    horo.style.display = 'none'
  }
  
  if(document.getElementById("resultsTable") !== null){
    document.getElementById("Container").innerHTML = ''
  }
  populateFromDatabaseHoro()
    
}

//******* DYNAMIC DROPDOWNS ******//

//Populates initial modify dropdown will all information from database
function populateFromDatabase(){
  let nameSelector = document.querySelector(".modList");
  if(nameSelector !== null){
    console.log("IN REMOVE CHILDREN")
    var i;
    for(i = nameSelector.options.length - 1; i >= 0; i--){
      nameSelector.remove(i)
    }    
  }
  fetch( '/getData', {
    method:'GET',
    headers: {'Content-Type': 'application/json'},

  })
  .then( function( response ) {
    console.log(response)
    response.text()
    .then(function(message){
      let allData = JSON.parse(message)
      console.log(allData)
      var opt = document.createElement('option');
      opt.innerHTML = opt.value = ""
      nameSelector.appendChild(opt)
      for(let i = 0; i<Object.keys(allData).length; i++){
        var opt = document.createElement('option');
        opt.innerHTML = opt.value = allData[i].fName + " " + allData[i].lName + ", " + allData[i].month + " " + allData[i].day
        nameSelector.appendChild(opt)
      }
      console.log(nameSelector)
    })
  })
  return false
}

function populateFromDatabaseHoro(){
  let nameSelector = document.querySelector(".horoList");
  if(nameSelector !== null){
    console.log("IN REMOVE CHILDREN")
    var i;
    for(i = nameSelector.options.length - 1; i >= 0; i--){
      nameSelector.remove(i)
    }    
  }
  fetch( '/getData', {
    method:'GET',
  })
  .then( function( response ) {
    console.log(response)
    response.text()
    .then(function(message){
      let allData = JSON.parse(message)
      console.log(allData)
      var opt = document.createElement('option');
      opt.innerHTML = opt.value = ""
      nameSelector.appendChild(opt)
      for(let i = 0; i<Object.keys(allData).length; i++){
        var opt = document.createElement('option');
        opt.innerHTML = opt.value = allData[i].fName + " " + allData[i].lName + ", " + allData[i].month + " " + allData[i].day
        nameSelector.appendChild(opt)
      }
      console.log(nameSelector)
    })
  })
  return false
}
//******* HARD CODED DATA *******//
//HARD CODED VAR FOR ALL OD DATE INFORMATION


//******* UTILITY DATE FUNCTIONS *******//




//******** UTILITY IMAGE FUNCTIONS *******//
function signToImageURL(sign){
  switch(sign){
    case "Aries":
      return "https://cdn.glitch.com/de12d0f3-3352-44ef-b62c-3acd45afc445%2FAries.svg?v=1567965712892"
    case "Taurus":
      return "https://cdn.glitch.com/de12d0f3-3352-44ef-b62c-3acd45afc445%2FTaurus.svg?v=1567965713442"
    case "Gemini":
      return
    case "Cancer":
      return
    case "Leo":
      return
    case "Virgo":
      return
    case "Libra":
      return
    case "Scorpio":
      return
    case "Sagittarius":
      return
    case "Capricorn":
      return
    case "Aquarius":
      return
    case "Pisces":
      return
    
  }
}
