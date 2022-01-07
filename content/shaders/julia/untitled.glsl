#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
// uniform vec2 u_mouse;
uniform float u_time;
uniform vec2 u_mousePos;

// HSV2RGB
vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

vec2 coord(in vec2 p) {
    p = p / u_resolution.xy;
    // correct aspect ratio
    if (u_resolution.x > u_resolution.y) {
        p.x *= u_resolution.x / u_resolution.y;
        p.x += (u_resolution.y - u_resolution.x) / u_resolution.y / 2.0;
    } else {
        p.y *= u_resolution.y / u_resolution.x;
        p.y += (u_resolution.x - u_resolution.y) / u_resolution.x / 2.0;
    }
    // centering
    p -= 0.5;
    p *= vec2(-1.0, 1.0);
    return p;
}

#define rx 1.0 / min(u_resolution.x, u_resolution.y)
#define uv gl_FragCoord.xy / u_resolution.xy
#define st coord(gl_FragCoord.xy)
#define mx coord(u_mousePos)
#define aspect (u_resolution.y / u_resolution.x)

#define maxIterations 800
#define colorResolution 256

#define getColor getColorGreen

vec4 getColorGreen(in int iter) {
    float j = (float(iter) / float(colorResolution)) + 2.;
    float i = mod(float(iter) + 20.*u_time*j, float(colorResolution));
    float q = float(i) / float(colorResolution);
    q = clamp(0., 1., q);
    vec4 c = vec4(0.);
    if(q > 0.5) {
        c = vec4((q-0.5)*2., 1., (q-0.5)*2., 1.);
    } else {
        c = vec4(0., q*2., 0., 1.);
    }
    return c;
}

vec4 getColorWheel(in int iter) {
    float j = (float(iter) / float(colorResolution)) + 2.;
    float i = mod(float(iter) + 20.*u_time*j, float(colorResolution));
    float q = float(i) / float(colorResolution);
    q = clamp(0., 1., q);
    vec4 c = vec4(hsv2rgb(vec3(q, 1.0, 1.0)), 1.0); 
    return c;
}


void main() {
    vec2 c = 2.0 * mx;
    // vec2 c = vec2(-0.710,-0.360);

    vec2 z;

    vec2 pos = st;
    z.x = 3.0 * pos.x;
    z.y = 2.0 * pos.y;

    int iter = maxIterations;
    for (int i = 0; i < maxIterations; i++) {
        float x = (z.x * z.x - z.y * z.y) + c.x;
        float y = (z.y * z.x + z.x * z.y) + c.y;

        if ((x * x + y * y) > 4.0) {
            iter = i;
            break;
        }
        z.x = x;
        z.y = y;
    }

    gl_FragColor = getColor(iter);
    // gl_FragColor = getColorWheel(iter);
}
