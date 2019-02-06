const SERVER = "http://localhost:3000";
const URL_LEADERBOARD = SERVER + "/leaderboard";
const URL_UPDATE_DETAIL = SERVER + "/detail";
const URL_USER = SERVER + "/users";

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
    contentType: "application/json",
    crossDomain: true
  });
}