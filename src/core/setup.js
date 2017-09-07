var // Core
    dt              = null,
    currentTime     = 0,
    lastTime        = (new Date()).getTime(),
    fps             = 60,
    frame           = 0,
    cam             = [],
    scale           = 1,
    t               = 0,    // Acummulate time
    gameState       = 1,    // 0: main menu 1: game play 2: hyperspace 3: game over
    DEBUG           = true,
    lastPress       = null,
    pressing        = [],
    fullscreen      = false,
    mouse           = [],

    // Groups
    stars   = [],
    backStars   = [],
    backStarsMenu   = [],
    playerBullets = [],
    enemyBullets = [],
    enemies = [],
    passengers = [],
    jumpPoints = [],
    particles = [],
    asteroids = [],
    itemsLife = [],

    // Other
    hyperSpace = false,
    hyperSpaceStart = 0,
    itemLifePts = [
        [-16, -16],
        [16, -16],
        [16, 16],
        [-16, 16],
        [-16, -16],
    ],
    passengerPts = [
		[0, 0],
		[-2, 2],
		[-1, 3],
		[0, 2],
		[0, 7],
		[1, 7],
		[1, 4],
		[2, 4],
		[2, 7],
		[3, 7],
		[3, 2],
		[4, 3],
		[5, 2],
		[3, 0],
		[2, 0],
		[2,-1],
		[3,-1],
		[3,-4],
		[0,-4],
		[0,-1],
		[1,-1],
		[1, 0],
		[0, 0]
	],
    asteroidPts = [
        [-4, 0],
        [-2,-3],
        [1,-4],
        [4,-2],
        [3,0],
        [3,0],
        [4,1],
        [4,2],
        [2,4],
        [-1,4],
        [-2,4],
        [-4, 0]
    ],
    propellerPts = [
        [0, 0],
        [-1,0],
        [-3,-3],
        [3,-3],
        [1,0],
        [0, 0]
    ],
    enemiesWaveCounter = 0,

    timer           = 0,
    timers          = [],
    clearColor      = '#000',
    lastPress       = null,
    pressing        = [];

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
  FW = 800,
  FH = 640,
  W = 800,
  H = 640,
  GAME_MARGIN = 0,
  GAME_Y_MARGIN = GAME_MARGIN,
  GAME_INC_PADDING = 80,
  W = FW - 2 * GAME_MARGIN,
  H = FH - 2 * GAME_Y_MARGIN,
  borderLength = 2*(W+H+2*GAME_INC_PADDING),
  storage = localStorage,
  shakeScreen=[0,0];
  // DOM setup
  d.style.webkitTransformOrigin = d.style.transformOrigin = "0 0";

  g.width = c.width = W;
  g.height = c.height = H;
  c.style.top = GAME_Y_MARGIN + "px";
  c.style.left = GAME_MARGIN + "px";
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
