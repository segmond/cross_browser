var user_id, url;

var cubeTest,
  lineTest,
  textureTest,
  simpleLightTest,
  moreLightTest,
  transparentTest,
  videoTest,
  clippingTest,
  lightingTest;

var requests = {};
$(function() {
  url = document.URL;
  var parser = document.createElement('a');
  parser.href = url;
  var command = parser.search;

  if (command) {
    var commands = command.slice(1).split('&');
    for (var i = 0; i < commands.length; i++) {
      var seq = commands[i].split('=');
      requests[seq[0]] = seq[1];
    }
  }

  if (!requests.hasOwnProperty('user_id')) {
    var uid = Cookies.get('machine_fingerprinting_userid');
    if (!uid) {
      window.location.href = error_page;
    }
    user_id = parseInt(uid);
    if (!command) {
      parser.search = "?user_id=" + user_id;
    } else {
      parser.search += "user_id=" + user_id;
    }

    url = parser.href;
  } else {
    user_id = parseInt(requests['user_id']);
  }

  var testList = [];
  sender = new Sender();
  testList.push(new CubeTest());
  testList.push(new CameraTest());
  testList.push(new LineTest());
  testList.push(new TextureTest());
  testList.push(new MoreLightTest());
  testList.push(new SimpleLightTest());
  testList.push(new TransparentTest());
  testList.push(new LightingTest());
  testList.push(new ClippingTest());
  testList.push(new BubbleTest());
  testList.push(new CompressedTextureTest());
  testList.push(new ShadowTest());
  testList.push(new VideoTest());

  sender.finalized = true;

  var canvas = $('#main_can')[0];
  function testFunc(level) {
    progress(level / testList.length * 98.0);
    if (level == testList.length) {
      sender.sendData();
    } else {
      testList[level].begin(canvas, testFunc, level + 1);
    }
  }

  // Tests begin in HERE
  testFunc(0);
});