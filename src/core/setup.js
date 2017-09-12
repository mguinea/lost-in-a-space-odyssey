var // Core
    dt              = null,
    currentTime     = 0,
    lastTime        = (new Date()).getTime(),
    fps             = 60,
    frame           = 0,
    cam             = [],
    scale           = 1,
    t               = 0,    // Acummulate time
    gameState       = 0,    // 0: main menu 1: game play 2: hyperspace 3: game over
    DEBUG           = false,
    lastPress       = null,
    pressing        = [],
    fullscreen      = false,
    mouse           = [],

    // Groups
    stars           = [],
    backStars       = [],
    backStarsMenu   = [],
    playerBullets   = [],
    enemyBullets    = [],
    enemies         = [],
    passengers      = [],
    jumpPoints      = [],
    particles       = [],
    asteroids       = [],
    itemsLife       = [],
    itemsScore      = [],

    // Other
    score           = 0,
    scores          = [],
    localStorageId  = 'js13k2017-liaso',
    passengersSaved = 0,
    hyperSpace      = false,
    hyperSpaceStart = 0,
    enemiesWaveCounter = 0,
    reload          = 0;
    // localStorage.removeItem(localStorageId);
if(DEBUG){
    var _fps_ = new Stats();
    _fps_.dom.style.left = '0px';
    _fps_.showPanel(0);
    document.body.appendChild(_fps_.dom);
    console.log('new loaded', new Date());
}

var glprops = {preserveDrawingBuffer: true};
var gl = c.getContext('webgl',glprops) || c.getContext('experimental-webgl', glprops),
  ctx = g.getContext('2d'),
  W = 800,
  H = 640;

  // DOM setup
  d.style.webkitTransformOrigin = d.style.transformOrigin = "0 0";

  g.width   = c.width   = W;
  g.height  = c.height  = H;
document.oncontextmenu = function (e) {
    e.preventDefault();
};


document.getElementById('f').onclick=toggleFullscreen;
function toggleFullscreen(evt){
  if (document.fullscreenEnabled) {
    fullscreen?document.exitFullscreen():document.body.requestFullscreen();
  } else if (document['webkitFullscreenEnabled']) {
    fullscreen?document.webkitExitFullscreen():document.body.webkitRequestFullscreen();
  } else if (document.mozFullScreenEnabled) {
    fullscreen?document.mozCancelFullScreen():document.body.mozRequestFullScreen();
  }
  fullscreen=!fullscreen;
  evt.preventDefault();
}
// WebGL setup
gl.viewport(0, 0, W, H);
gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

var buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
  -1.0, -1.0,
  1.0, -1.0,
  -1.0,  1.0,
  -1.0,  1.0,
  1.0, -1.0,
  1.0,  1.0
]), gl.STATIC_DRAW);

var glowShader = glCreateShader("vertex-shader-static", "fragment-shader-glow");
gl.uniform2f(glUniformLocation(glowShader, 'dim'), W, H);
var crtShader = glCreateShader("vertex-shader-static", "fragment-shader-crt");
gl.uniform2f(glUniformLocation(crtShader, 'dim'), W, H);

// Create buffers
var fbo1 = glCreateFBO();
var fbo2 = glCreateFBO();

var textureGame = glCreateTexture();

// Load scores
// localStorage.removeItem(localStorageId);
scores = localStorage.getItem(localStorageId);
if(!scores){
    localStorage.setItem(localStorageId, JSON.stringify([]));
}
scores = JSON.parse(localStorage.getItem(localStorageId));
// put scores in order
scores.sort();
scores.reverse();
/*
localStorage.setItem("savedData", JSON.stringify([object1, object2));
object1 = JSON.parse(localStorage.getItem("savedData"))[0];
object2 = JSON.parse(localStorage.getItem("savedData"))[1];*/
