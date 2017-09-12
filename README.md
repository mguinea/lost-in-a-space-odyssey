# Lost in a space odyssey
---
![](https://img.shields.io/badge/js13kGames-2017-b12a34.svg) ![](https://img.shields.io/badge/version-%23desktop-yellow.svg)
## Synopsis
This is a madness!!! lots of passengers have been lost in the space, and you are the only one that can rescue them!

Be the commander of the ultimate spaceship from our stellar fleet and go with the A.I. through the deep space to save as passengers as you can before bad aliens attack you.

Controls
- W for acceleration, A and D to rotate the propeller of the bubble engine.
- Left click for laser (against enemies).
- Right click for anti-asteroid intersection laser (it takes time to cool down after much use).
- H to jump to hyperspace when all passengers of a sector are rescued and you are close enough to a jump point.

# The Game

## Data Structures
To save space I have used tuples with commented indexes.

For an entity, the main structure is:
- 0 position x
- 1 position y
- 2 angle (expressed in radians)
- 3 radius

### Tools I used
- http://www.superflashbros.net/as3sfxr/

### References
- https://coderwall.com/p/iygcpa/gameloop-the-correct-way
- https://developer.mozilla.org/es/docs/Web/API/WebGL_API/Tutorial/Using_shaders_to_apply_color_in_WebGL
- https://flatuicolors.com/
- http://paletton.com/
- https://github.com/Rajawali/Rajawali/issues/520

#### Building to send
```sh
$ gulp build
```

License
----

MIT
