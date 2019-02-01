
const SERVER = "http://localhost:3000";
const URL_LEADERBOARD = SERVER + "/leaderboard";
const URL_DELETE_USER = SERVER + "/users/";

function httpGet(theUrl, callbackSucess, callbackError) {
  $.ajax({
    dataType: "json",
    url: theUrl,
    success: callbackSucess,
    error: callbackError,
    timeout: 10000,
    crossDomain: true
  });
}

function httpPost(theUrl, data, callbackSucess, callbackError) {
  $.ajax({
    type: "POST",
    url: theUrl,
    data: data,
    success: callbackSucess,
    error: callbackError,
    dataType: "json",
    crossDomain: true
  });
}

function httpDelete(theUrl, data, callbackSuccess, callbackError) {
  $.ajax({
    type: "DELETE",
    url: theUrl,
    success: callbackSuccess,
    error: callbackError,
    dataType: "json",
    crossDomain: true
  });
}

function httpPut(theUrl, data, callbackSuccess, callbackError) {
  $.ajax({
    type: "PUT",
    url: theUrl,
    success: callbackSuccess,
    error: callbackError,
    dataType: "json",
    crossDomain: true
  })
}

function showLeaderBoard() {
  
  httpGet(URL_LEADERBOARD, function(data) {
    // success
    console.log(data);
    const table = createLeaderBoardTable(data);
    $("#lbTable").empty(); // empty all its children
    $("#lbTable").append(table); // show the leader board
  }, function(data) {
    // error
    console.log("show leaderboard error!");
  });

  
}

function createLeaderBoardTable(lbData) {
  let table = "<tr><th>username</th><th>score</th><th>control</th></tr>";
  for (let i = 0; i < lbData.length; i++) {
    let user = lbData[i];
    table += "<tr id='" + user['username'] + "'>";
    table += "<td>" + user['username'] + "</td>";
    table += "<td>" + user['score'] + "</td>";
    table += "<td><button id='" + user['username'] + "' onclick='handleDelete(this.id)'>Delete</button></td>";
    table += "</tr>";
  }
  return table;
}

function handleDelete(username) {
  console.log(username);
  let data = {username};
  // let data = {};
  // data['username'] = username;
  httpDelete(URL_DELETE_USER + username, data, function(data) {
    // success
    console.log("success delete");
    $("#" + username).remove();
  }, function(data) {
    console.log("delete error!");
  });
}