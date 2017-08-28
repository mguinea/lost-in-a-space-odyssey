/*
* original script from @gre
* https://github.com/gre/behind-asteroids/blob/master/src/effects.sh
*/

function setFrameBuffer(buffer, texture, shader, time, colors){
  glBindFBO(buffer);
  glBindShader(shader);
  gl.uniform1i(glUniformLocation(shader, 'tex'), glBindTexture(texture, 0));

  gl.uniform1f(glUniformLocation(shader, 'testVar'), 0.0);
  if(time!=undefined){
    gl.uniform1f(glUniformLocation(shader, 'time'), time);
  }
  if(colors!= undefined){
    gl.uniform3fv(glUniformLocation(shader, 'colors'), colors);
  }

  gl.drawArrays(gl.TRIANGLES, 0, 6);
}

function drawPostProcessing (time) {
  glSetTexture(textureGame, g);
  // CRT
  setFrameBuffer(fbo1, textureGame, crtShader);
  // Glow
  setFrameBuffer(fbo2, glGetFBOTexture(fbo1), glowShader);
  // Final draw
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
  gl.flush();
}
