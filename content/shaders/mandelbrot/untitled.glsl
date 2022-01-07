#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// uniform

#define PI_TWO 1.570796326794897
#define PI 3.141592653589793
#define TWO_PI 6.283185307179586

vec2 coord(in vec2 p)
{
    p = p / u_resolution.xy;
    // correct aspect ratio
    if (u_resolution.x > u_resolution.y)
    {
        p.x *= u_resolution.x / u_resolution.y;
        p.x += (u_resolution.y - u_resolution.x) / u_resolution.y / 2.0;
    }
    else
    {
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
#define mx coord(u_mouse)
#define aspect (u_resolution.y / u_resolution.x)

#define maxIterations 100

float fract1(float f)
{
    return f - floor(f);
}

void main()
{
    vec2 center = vec2(0.7, 0.3);
    float scale = 0.005;

    vec2 z, c;

    vec2 pos = st;
    c.x = 1.3333 * pos.x * scale - center.x;
    c.y = pos.y * scale - center.y;

    int iter = maxIterations;
    z = c;
    for (int i = 0; i < maxIterations; i++)
    {
        float x = (z.x * z.x - z.y * z.y) + c.x;
        float y = (z.y * z.x + z.x * z.y) + c.y;

        if ((x * x + y * y) > 4.0)
        {
            iter = i;
            break;
        }
        z.x = x;
        z.y = y;
    }
    // Base the color on the number of iterations
    vec4 color;
    if (iter == maxIterations)
        color = vec4(0, 0, 0, 1.0); // black
    else
    {
        float tmpval = float(iter) / 10.0;
        color = vec4(tmpval, tmpval, tmpval, 1.384);
    }

    gl_FragColor = color;
}
