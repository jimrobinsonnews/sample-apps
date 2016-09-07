// clouds https://images.unsplash.com/16/unsplash_525a7e89953d1_1.JPG
// hills https://images.unsplash.com/29/cloudy-hills.jpg
// rock https://images.unsplash.com/reserve/yZfr4jmxQyuaE132MWZm_stagnes.jpg
// paris https://images.unsplash.com/33/YOfYx7zhTvYBGYs6g83s_IMG_8643.jpg

window.Algorithmia = window.Algorithmia || {};
Algorithmia.api_key = "simT5hbarHkJ0y24isRZs2Gcb0g1";
var numTasks = 0;

function callAlgorithm() {
  var statusLabel = document.getElementById("status-label");
  statusLabel.innerHTML = "";

  // Get the search query URL
  var query = document.getElementById("search-query").value.trim();

  if(typeof(query) == "string" && query !== "") {
    startTask();
    search(query);
  }

};

function search(query) {
  console.log("Searching for tag", query);

  renderSearchResults([
    {title: "Deadmau5 - Ghosts N Stuff", videoId: "3Gb3faOzvBk", firstFrame: 10, lastFrame: 100},
    {title: "Sean Mackey - Discover", videoId: "Ts2I4ffd4p8", firstFrame: 20, lastFrame: 200}
  ]);

  finishTask();

  // Algorithmia.client(Algorithmia.api_key)
  //   .algo("algo://algorithmiahq/VideoSearchDemo/1.0.0")
  //   .pipe(img)
  //   .then(function(output) {
  //     if(output.error) {
  //       // Error Handling
  //       var statusLabel = document.getElementById("status-label")
  //       statusLabel.innerHTML = '<div class="alert alert-danger" role="alert">Uh Oh! Something went wrong: ' + output.error.message + ' </div>';
  //       taskError();
  //     } else {
  //       console.log("got output", output.result);

  //       // Decode base64 imgs
  //       var imgOriginal = "data:image/png;base64," + output.result[0];
  //       var imgColorized = "data:image/png;base64," + output.result[1];

  //       // Show the download link if API also returned the URL
  //       if(output.result.length > 2) {
  //           document.getElementById("downloadLinks").classList.remove("hidden");
  //           document.getElementById("resultLink").href = output.result[2];
  //       } else {
  //           document.getElementById("downloadLinks").classList.add("hidden");
  //           document.getElementById("resultLink").href = '#';
  //       }

  //       getMeta(imgOriginal, imgColorized);
  //     }
  //   });
}

function renderSearchResults(results) {
  console.log("renderSearchResults", results);
  var output = document.getElementById("search-results");
  output.innerHTML = "";
  for(var i = 0; i < results.length; i++) {
    var doc = results[i];
    var li = document.createElement("li");
    var link = document.createElement("a");
    link.innerText = doc.title;
    link.onclick = jumpToVideo(doc, 0);
    var linkFirst = document.createElement("a");
    linkFirst.innerText = "First";
    linkFirst.onclick = jumpToVideo(doc, doc.firstFrame);
    var linkLast = document.createElement("a");
    linkLast.innerText = "Last";
    linkLast.onclick = jumpToVideo(doc, doc.lastFrame);
    var linkDiv = document.createElement("div");
    linkDiv.appendChild(link);
    li.appendChild(linkDiv);
    li.appendChild(linkFirst);
    li.appendChild(linkLast);
    output.appendChild(li);
  }
}

function jumpToVideo(doc, time) {
  return function() {
    console.log("Jumping to " + doc.title + " @ " + time);
    player.loadVideoById(doc.videoId);
    player.seekTo(time);
    player.playVideo();
  };
}

function startTask() {
  numTasks++;
  document.getElementById("overlay").classList.remove("hidden");
}

function finishTask() {
  numTasks--;
  if(numTasks <= 0) {
    document.getElementById("overlay").classList.add("hidden");
    document.getElementById("explainer").classList.add("hidden");
    document.getElementById("results").classList.remove("hidden");
    document.getElementById("marketing").classList.remove("hidden");
  }
}

function taskError() {
  numTasks = 0;
  document.getElementById("overlay").classList.add("hidden");
  document.getElementById("explainer").classList.add("display");
  document.getElementById("explainer").classList.remove("hidden");
  document.getElementById("results").classList.add("hidden");
  document.getElementById("marketing").classList.add("hidden");
}

document.getElementById("search-form").onsubmit = function(e) {
  console.log("onsubmit");
  e.preventDefault();
  callAlgorithm();
  return false;
}


window.player = null;

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    // height: '390',
    // width: '640',
    videoId: '3Gb3faOzvBk',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  console.log("player ready");
  // event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
function onPlayerStateChange(event) {
  // if (event.data == YT.PlayerState.PLAYING &&) {
  //   setTimeout(stopVideo, 6000);
  // }
}
function stopVideo() {
  player.stopVideo();
}