// Based on a renderman shader by Michael Rivero
uniform int maxIterations;
varying vec2 uv;
void main (void)
{
  float tmpval;
  int iter;
  float tempreal, tempimag, Creal, Cimag;
  float r2;
  vec2 pos = fract (uv);
  float real = (pos.s * 3.0 ) - 2.0;
  float imag = (pos.t * 3.0 ) - 1.5;
  Creal = real;
  Cimag = imag;
  for (iter = 0; iter < maxIterations; iter++)
  {
    // z = z^2 + c
    tempreal = real;
    tempimag = imag;
    real = (tempreal * tempreal) - (tempimag * tempimag);
    imag = 2 * tempreal * tempimag;
    real += Creal;
    imag += Cimag;
    r2 = (real * real) + (imag * imag);
    if (r2 >= 4)
      break;
  }
  // Base the color on the number of iterations
  vec4 color;
  if (r2 >= 4)
    color = vec4 (0, 0, 0, 1.0); // black
  else
  {
    tmpval = fract ((iter / 10));
    color = vec4 (tmpval, tmpval, tmpval, 1.0);
  }
  gl_FragColor = color;