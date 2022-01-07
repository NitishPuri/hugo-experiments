#ifdef GL_ES
precision mediump float;
#endif

#define time u_time/4.0
#define res u_resolution
#define mouse u_mouse

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


void main() {
    vec2 p = (2.0*gl_FragCoord.xy-res.xy)/res.y;
    vec2 mp = mouse.xy/res.xy*0.5+0.5;
        
    float s = 1.0;
    for (int i=0; i < 7; i++) {
        s = max(s,abs(p.x)-0.375);
        p = abs(p*2.25)-mp*1.25;
        p *= mat2(cos(time+mp.x),-sin(time+mp.y),sin(time+mp.y),cos(time+mp.x));
    }
    
    vec3 col = vec3(4.0,2.0,1.0)/abs(atan(p.y,p.x))/s;
    
    gl_FragColor = vec4(col,1.0);
}