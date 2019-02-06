


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
  let table = "<tr><th>username</th><th>score</th><th>update counter</th><th></th></tr>";
  for (let i = 0; i < lbData.length; i++) {
    let user = lbData[i];
    if (i%2 == 1)
      table += "<tr class='color-row' id='" + user['username'] + "'>";
    else
      table += "<tr id='" + user['username'] + "'>";
    table += "<td>" + user['username'] + "</td>";
    table += "<td>" + user['score'] + "</td>";
    table += "<td>" + user['update_counter'] + "</td>";
    table += "<td><button id='" + user['username'] + "' onclick='handleDelete(this.id)'>Delete</button></td>";
    table += "</tr>";
  }
  return table;
}

function handleDelete(username) {
  let data = {};
  data['username'] = username;
  httpDelete(URL_USER + "/" + username, data, function(data) {
    // success
    console.log("success delete");
    $("#" + username).remove();
    showLeaderBoard(); // update leader boad after remove a user
  }, function(data) {
    console.log("delete error!");
  });
}

function handleUpdateCounter() {
  let data = {};
  data['fromDate'] = $("#fromDate").val();
  data['toDate'] = $("#toDate").val();
  data['username'] = $("#userInput").val();
  console.log("handleUpdateCounter - data: " + data['fromDate'] + ", " + data['toDate'] + ", " + data['username']);
  
  // need to validate data

  httpPost(URL_UPDATE_DETAIL, data, function(data) {
    $("#counterTxt").val(data['counter']);
  }, function(data) {
    console.log("Error!");
  });


}