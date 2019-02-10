


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

  httpPost(URL_USER, data, function(data) {
    // success
    console.log("success insert");
    showLeaderBoard(); // update the leader board
  }, function(data) {
    // fail
    console.log("insert error");
  });
}

function updateUser(username, score) {
  let data = {};
  data['username'] = username;
  data['score'] = score;
  // httpPut(URL_USER + "/" + username, data, function(data) {
  httpPost(URL_USER + "/" + username, data, function(data) {
    // success
    console.log("success update");
    showLeaderBoard(); // update the leader board
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

  updateUser(username, score);
}

function showInforMsg(msg) {
  $(".myAlert-top").show();
  $("#alertMsgId").html(msg);
  setTimeout(function() {
    $(".myAlert-top").hide();
  }, 2000);
}


// ----------------------------------------------------------------------

let client = new WebSocket('ws:localhost:3003/', 'echo-protocol');

client.onerror = function() {
  console.log('connection error');
};

client.onopen = function() {
  console.log('web socket client connected');

  // function sendNumber() {
  //   if (client.readyState === client.OPEN) {
  //     let number = Math.round(Math.random() * 0xFFFFFF);
  //     client.send(number.toString());
  //     setTimeout(sendNumber, 3000);
  //   }
  // }
  // sendNumber();
}

client.onclose = function() {
  console.log("echo-protocol client closed");
}

client.onmessage = function(e) {
  if (typeof e.data === 'string') {
    let msg = e.data;
    console.log("Received: '" + msg + "'");
    if (msg.indexOf("UPDATE") >= 0) {
      showLeaderBoard(); // update leaderboard
      showInforMsg(msg); // show message
    } else if (msg.indexOf("ADD") >= 0) {
      showLeaderBoard(); // update leaderboard
      showInforMsg(msg); // show message
    }
  }
}


