
const SERVER = "http://localhost:3000";
const URL_LEADERBOARD = SERVER + "/leaderboard";
const URL_DELETE_USER = SERVER + "/users/";
const URL_PUT_USER = SERVER + "/users/";
const URL_POST_USER = SERVER + "/users";

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
    const table = createLeaderBoardTable(data);
    $("#lbTable").empty(); // empty all its children
    $("#lbTable").append(table); // show the leader board
  }, function(data) {
    // error
    console.log("show leaderboard error!");
  });  
}

// create the table structure which displays leaderboard
function createLeaderBoardTable(lbData) {
  let table = "<tr><th>username</th><th>score</th></tr>";
  for (let i = 0; i < lbData.length; i++) {
    let user = lbData[i];
    table += "<tr id='" + user['username'] + "'>";
    table += "<td>" + user['username'] + "</td>";
    table += "<td>" + user['score'] + "</td>";
    table += "</tr>";
  }
  return table;
}

function addUser(username, score) {
  let data = {};
  data['username'] = username;
  data['score'] = score;

  httpPost(URL_POST_USER, data, function(data) {
    // success
    console.log("success insert");
  }, function(data) {
    // fail
    console.log("insert error");
  });
}

function updateUser(username, score) {
  let data = {};
  data['username'] = username;
  data['score'] = score;
  httpPut(URL_PUT_USER + username, data, function(data) {
    // success
    console.log("success update");
  }, function(data) {
    // fail
    console.log("update error");
  });
}

// ----------------------------------------------------------------------
// handle buttons control
function handleAdd() {
  let username = $("#inputUsername").val();
  let score = $("#inputScore").val();
  console.log(" " + username + ", " + score);

  if (username == "") {
    alert("Please enter the username!");
    return;
  }
  if (score == "") {
    alert("Please enter the score. Note that use number only!");
    return;
  }

  addUser(username, score);
}

function handleUpdate() {
  let username = $("#inputUsername").val();
  let score = $("#inputScore").val();
  console.log(" " + username + ", " + score);

  if (username == "") {
    alert("Please enter the username!");
    return;
  }
  if (score == "") {
    alert("Please enter the score. Note that use number only!");
    return;
  }

  alert("Sorry! I haven't handle that");

  // updateUser(username, score);
}



// ----------------------------------------------------------------------

let client = new WebSocket('ws:localhost:3003/', 'echo-protocol');

client.onerror = function() {
  console.log('connection error');
};

client.onopen = function() {
  console.log('web socket client connected');

  function sendNumber() {
    if (client.readyState === client.OPEN) {
      let number = Math.round(Math.random() * 0xFFFFFF);
      client.send(number.toString());
      setTimeout(sendNumber, 3000);
    }
  }
  sendNumber();
}

client.onclose = function() {
  console.log("echo-protocol client closed");
}

client.onmessage = function(e) {
  if (typeof e.data === 'string') {
    console.log("Received: '" + e.data + "'");
  }
}

