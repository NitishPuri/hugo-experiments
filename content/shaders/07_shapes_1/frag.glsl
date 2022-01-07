#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define nm (u_mouse/u_resolution)
// #define st gl_FragCoord/u_resolution

#define func almostIdentity

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
// uniform float u_fraction;


// HSV2RGB
vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float constrain(float x, float a, float b) {
    return min(max(x, a), b);
}

void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st.x *= u_resolution.x/u_resolution.y;
  vec3 color = vec3(0.0);
  float d = 0.0;

  // Remap the space to -1. to 1.
  st = st *2.-1.;

  // Make the distance field
  d = length( abs(st)-.3 );
//   d = length( min(abs(st)-.3,0.) );
//   d = length( max(abs(st)-.3,0.) );

  // Visualize the distance field
//   gl_FragColor = vec4(vec3(fract(d*10.0)),1.0);

  // Drawing with the distance field
  gl_FragColor = vec4(vec3( step(.3,d) ),1.0);
  gl_FragColor = vec4(vec3( step(.3,d) * step(d,.4)),1.0);
//   gl_FragColor = vec4(vec3( smoothstep(.3,.4,d)* smoothstep(.6,.5,d)) ,1.0);
}