#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define nm (u_mouse/u_resolution)
// #define st gl_FragCoord/u_resolution

#define func identity

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

float sq(float x) { return x * x; }

// Plot a line on Y using a value between 0.0-1.0
float plot(vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) -
          smoothstep( pct, pct+0.01, st.y);
}

//!!! functions

float identity(float x) {
    return x;
}

float wave(float x) {
    return (sin(nm.x*PI*x+ u_time) + 1.0)/2.0;
}

float waves(float x) {
    float y = 0.0;
    x += u_time*0.5;
    bool even = true;
    const float num = 10.0;
    float a = 1.0/(2.0*num);
    for (float j = 0.0; j < num; j++) {
        y += ( (0.0 + (even ? sin(x) : cos(x))) * a * nm.y);        
        even = !even;
        x += nm.x * 3.0;
    }
    return y + 0.5;
}

float smoothtest(float x) {
    return smoothstep(0.1, 0.9, x);
}

float smoothMouse(float x) {
    float t = nm.x;
    return smoothstep(0.0,t,x) -  
                smoothstep(t,1.0,x);
}

float almostIdentity(float x) {
    /*Say you don't want to change a value unless it's too small and screws some of your computations up. 
    Then, rather than doing a sharp conditional branch, you can blend your value with your threshold, and do it smoothly (say, with a cubic polynomial)*/
    float m = nm.x;  // threshold
    float n = nm.y;  // minimum

    if(x > m) return x;

    float a = 2.0 * n - m;
    float b = 2.0 * m - 3.0 * n;
    float t = x / m;

    return (a * t + b) * t * t + n;
}

float impulse(float x) {
    /*
    Great for triggering behaviours or making envelopes for music or animation, and for anything that grows fast and then slowly decays. 
    Use k to control the stretching o the function. Btw, it's maximum, which is 1.0, happens at exactly x = 1/k.
    */
    float k = 1.0 / nm.x;
    float h = k * x;
    return h * exp(1.0 - h);
}

float cubicPulse(float x) {
    /*
    Of course you found yourself doing smoothstep(c-w,c,x)-smoothstep(c,c+w,x) very often, probably cause you were trying to isolate some features. Then this cubicPulse() is your friend. 
    Also, why not, you can use it as a cheap replacement for a gaussian.
    */
    float c = nm.x;
    float w = nm.y;
    x = abs(x - c);
    if(x > w) return 0.0;
    x /= w;
    return 1.0 - x * x * (3.0 - 2.0*x);
}

float expStep(float x) {
    /*A natural attenuation is an exponential of a linearly decaying quantity: exp(-x).
     A gaussian, is an exponential of a quadratically decaying quantity: exp(-x²).
      You can go on increasing powers, and get a sharper and sharper smoothstep(), until you get a step() in the limit.*/
      float k = 1.0/nm.x;
    //   float k = 1.0;
      return exp(-k * pow(x , nm.y*10.0));
}

float gain(float x) {
    /*Remapping the unit interval into the unit interval by expanding the sides and compressing the center, and keeping 1/2 mapped to 1/2, that can be done with the gain() function.
    This was a common function in RSL tutorials (the Renderman Shading Language). 
    k=1 is the identity curve, k<1 produces the classic gain() shape, and k>1 produces "s" shaped curves. The curves are symmetric (and inverse) for k=a and k=1/a.*/
    float t = nm.x * 2.0;
    float k = (t < 1.0) ? t : t*20.0-19.0;
    // float k = 15.;
    float a = 0.5 * pow(2.0 * (x < 0.5 ? x : 1.0 - x), k);
    return (x < 0.5) ? a : 1.0 - a;
}
float parabola(float x) {
    /*
    A nice choice to remap the 0...1, such that the corners are rempped to 0 and the center to 1. 
    */
    float k = (2.0*nm.x) + 1.0;
    return pow(4.0 * x * (k - x), nm.y*2.0);
}

float pcurve(float x) {
    float a = nm.x;
    float b = nm.y;
    float k = pow(a+b, a+b) / (pow(a, a)*pow(b, b));
    // float k = 1.0;
    return k * pow(x, a) * pow(1.0-x, b);
}
float sinc(float x) {
    float k = nm.x*10.0+1.0;
    float a = PI * (k * x - 1.0);
    return (sin(nm.y*a)/a);
}

float doubleExponentialSeat (float x){

    float a = nm.x;
    float epsilon = 0.00001;
    float min_param_a = 0.0 + epsilon;
    float max_param_a = 1.0 - epsilon;
    a = constrain(a, min_param_a, max_param_a);

    float y = 0.0;
    if (x<=0.5){
        y = (pow(2.0*x, 1.0-a))/2.0;
    } else {
        y = 1.0 - (pow(2.0*(1.0-x), 1.0-a))/2.0;
    }
    return y;
}

float doubleExponentialSigmoid (float x){

    float a = nm.x;

    float epsilon = 0.00001;
    float min_param_a = 0.0 + epsilon;
    float max_param_a = 1.0 - epsilon;
    a = constrain(a, min_param_a, max_param_a);
    a = 1.0-a; // for sensible results
    
    float y = 0.0;
    if (x<=0.5){
        y = (pow(2.0*x, 1.0/a))/2.0;
    } else {
        y = 1.0 - (pow(2.0*(1.0-x), 1.0/a))/2.0;
    }
    return y;
}

float logisticSigmoid (float x){
    // n.b.: this Logistic Sigmoid has been normalized.

    float a = nm.x;
    float epsilon = 0.0001;
    float min_param_a = 0.0 + epsilon;
    float max_param_a = 1.0 - epsilon;
    a = constrain(a, min_param_a, max_param_a);
    a = (1.0/(1.0-a) - 1.0);

    float A = 1.0 / (1.0 + exp(0.0 -((x-0.5)*a*2.0)));
    float B = 1.0 / (1.0 + exp(a));
    float C = 1.0 / (1.0 + exp(0.0-a)); 
    float y = (A-B)/(C-B);
    return y;
}

float blinnWyvillCosineApproximation (float x){
    float x2 = x*x;
    float x4 = x2*x2;
    float x6 = x4*x2;
    
    float fa = ( 4.0/9.0);
    float fb = (17.0/9.0);
    float fc = (22.0/9.0);
    
    float y = fa*x6 - fb*x4 + fc*x2;
    return y;
}

float doubleCubicSeatWithLinearBlend (float x){

    float a = nm.x;
    float b = nm.y;

    float epsilon = 0.00001;
    float min_param_a = 0.0 + epsilon;
    float max_param_a = 1.0 - epsilon;
    a = constrain(a, min_param_a, max_param_a);
    b = constrain(b, min_param_a, max_param_a);
    b = 1.0 - b; //reverse for intelligibility.
    
    float y = 0.0;
    if (x<=a){
        y = b*x + (1.0-b)*a*(1.0-pow(1.0-x/a, 3.0));
    } else {
        y = b*x + (1.0-b)*(a + (1.0-a)*pow((x-a)/(1.0-a), 3.0));
    }
    return y;
}

float doubleOddPolynomialSeat (float x){

    float n = 3.0;
    float a = nm.x;
    float b = nm.y;

    float epsilon = 0.00001;
    float min_param_a = 0.0 + epsilon;
    float max_param_a = 1.0 - epsilon;
    a = constrain(a, min_param_a, max_param_a);
    b = constrain(b, min_param_a, max_param_a);

    float p = 2.0*n + 1.0;
    float y = 0.0;
    if (x <= a){
        y = b - b*pow(1.0-x/a, p);
    } else {
        y = b + (1.0-b)*pow((x-a)/(1.0-a), p);
    }
    return y;
}

float doublePolynomialSigmoid (float x){
  
    float n = 5.0;
  
    float y = 0.0;
    if (mod(n,2.0) == 0.0){ 
        // even polynomial
        if (x<=0.5){
        y = pow(2.0*x, n)/2.0;
        } else {
        y = 1.0 - pow(2.0*(x-1.0), n)/2.0;
        }
    } 
    
    else { 
        // odd polynomial
        if (x<=0.5){
        y = pow(2.0*x, n)/2.0;
        } else {
        y = 1.0 + pow(2.0*(x-1.0), n)/2.0;
        }
    }

    return y;
}

float quadraticThroughAGivenPoint (float x){
  
    float a = nm.x;
    float b = nm.y;
  
    float epsilon = 0.00001;
    float min_param_a = 0.0 + epsilon;
    float max_param_a = 1.0 - epsilon;
    a = constrain(a, min_param_a, max_param_a);
    b = constrain(b, min_param_a, max_param_a);
    
    float A = (1.0-b)/(1.0-a) - (b/a);
    float B = (A*(a*a)-b)/a;
    float y = A*(x*x) - B*(x);
    y = min(1.0,max(0.0,y)); 
    
    return y;
}

//------------------------------
float circularEaseIn (float x){
  float y = 1.0 - sqrt(1.0 - x*x);
  return y;
}

float circularEaseOut (float x){
  float y = sqrt(1.0 - pow(1.0 - x, 2.0));
  return y;
}
float doubleCircleSeat (float x){
    float a = nm.x;
    a = constrain(a, 0.0, 1.0);

    float y = 0.0;
    if (x<=a){
        y = sqrt(sq(a) - sq(x-a));
    } else {
        y = 1.0 - sqrt(sq(1.0-a) - sq(x-a));
    }
    return y;
}
float doubleCircleSigmoid (float x){
    float a = nm.x;
    a = constrain(a, 0.0, 1.0);

    float y = 0.0;
    if (x<=a){
        y = a - sqrt(a*a - x*x);
    } else {
        y = a + sqrt(sq(1.0-a) - sq(x-1.0));
    }
    return y;
}

float doubleEllipticSeat (float x){

    float a = nm.x;
    float b = nm.y;

    float epsilon = 0.00001;
    float min_param_a = 0.0 + epsilon;
    float max_param_a = 1.0 - epsilon;
    float min_param_b = 0.0;
    float max_param_b = 1.0;
    a = constrain(a, min_param_a, max_param_a);
    b = constrain(b, min_param_a, max_param_a);

    float y = 0.0;
    if (x<=a){
        y = (b/a) * sqrt(sq(a) - sq(x-a));
    } else {
        y = 1.0- ((1.0-b)/(1.0-a))*sqrt(sq(1.0-a) - sq(x-a));
    }
    return y;
}

float doubleEllipticSigmoid (float x){

    float a = nm.x;
    float b = nm.y;

    float epsilon = 0.00001;
    float min_param_a = 0.0 + epsilon;
    float max_param_a = 1.0 - epsilon;
    float min_param_b = 0.0;
    float max_param_b = 1.0;
    a = constrain(a, min_param_a, max_param_a);
    b = constrain(b, min_param_a, max_param_a);
 
    float y = 0.0;
    if (x<=a){
        y = b * (1.0 - (sqrt(sq(a) - sq(x))/a));
    } else {
        y = b + ((1.0-b)/(1.0-a))*sqrt(sq(1.0-a) - sq(x-1.0));
    }
    return y;
}

float quadraticBezier (float x){
    // adapted from BEZMATH.PS (1993)
    // by Don Lancaster, SYNERGETICS Inc. 
    // http://www.tinaja.com/text/bezmath.html

    float a = nm.x;
    float b = nm.y;


    float epsilon = 0.00001;
    a = constrain(a, 0.0, 1.0);
    b = constrain(b, 0.0, 1.0);
    if (a == 0.5){
        a += epsilon;
    }
    
    // solve t from x (an inverse operation)
    float om2a = 1.0 - 2.0*a;
    float t = (sqrt(a*a + om2a*x) - a)/om2a;
    float y = (1.0-2.0*b)*(t*t) + (2.0*b)*t;
    return y;
}

//------------------------------
// cubicBezier
//------------------------------

// Helper functions:
float slopeFromT (float t, float A, float B, float C){
  float dtdx = 1.0/(3.0*A*t*t + 2.0*B*t + C); 
  return dtdx;
}

float xFromT (float t, float A, float B, float C, float D){
  float x = A*(t*t*t) + B*(t*t) + C*t + D;
  return x;
}

float yFromT (float t, float E, float F, float G, float H){
  float y = E*(t*t*t) + F*(t*t) + G*t + H;
  return y;
}

float cubicBezierImp(float x, float a, float b, float c, float d) {

    float y0a = 0.00; // initial y
    float x0a = 0.00; // initial x 
    float y1a = b;    // 1st influence y   
    float x1a = a;    // 1st influence x 
    float y2a = d;    // 2nd influence y
    float x2a = c;    // 2nd influence x
    float y3a = 1.00; // final y 
    float x3a = 1.00; // final x 

    float A =   x3a - 3.0*x2a + 3.0*x1a - x0a;
    float B = 3.0*x2a - 6.0*x1a + 3.0*x0a;
    float C = 3.0*x1a - 3.0*x0a;   
    float D =   x0a;

    float E =   y3a - 3.0*y2a + 3.0*y1a - y0a;    
    float F = 3.0*y2a - 6.0*y1a + 3.0*y0a;             
    float G = 3.0*y1a - 3.0*y0a;             
    float H =   y0a;

    // Solve for t given x (using Newton-Raphelson), then solve for y given t.
    // Assume for the first guess that t = x.
    float currentt = x;
    const int nRefinementIterations = 5;
    for (int i=0; i < nRefinementIterations; i++){
        float currentx = xFromT (currentt, A,B,C,D); 
        float currentslope = slopeFromT (currentt, A,B,C);
        currentt -= (currentx - x)*(currentslope);
        currentt = constrain(currentt, 0.0,1.0);
    } 

    float y = yFromT (currentt,  E,F,G,H);
    return y;
}
float cubicBezier (float x){ 
    float a = nm.x;
    float b = nm.y;
    float c = 1.0 - nm.x;
    float d = 1.0 - nm.y;
    return cubicBezierImp(x, a, b, c, d);
}

//------------------------------
// cubicBezierNearlyThroughTwoPoints
//------------------------------
// Helper functions. 
float B0 (float t){
  return (1.0-t)*(1.0-t)*(1.0-t);
}
float B1 (float t){
  return  3.0*t* (1.0-t)*(1.0-t);
}
float B2 (float t){
  return 3.0*t*t* (1.0-t);
}
float B3 (float t){
  return t*t*t;
}
float  findx (float t, float x0, float x1, float x2, float x3){
  return x0*B0(t) + x1*B1(t) + x2*B2(t) + x3*B3(t);
}
float  findy (float t, float y0, float y1, float y2, float y3){
    return y0*B0(t) + y1*B1(t) + y2*B2(t) + y3*B3(t);
}

float cubicBezierNearlyThroughTwoPoints(float x){

    float a = nm.x;
    float b = nm.y;
    float c = 1.0 - nm.x;
    float d = 1.0 - nm.y;

    float y = 0.0;
    float epsilon = 0.00001;
    float min_param_a = 0.0 + epsilon;
    float max_param_a = 1.0 - epsilon;
    a = constrain(a, min_param_a, max_param_a);
    b = constrain(b, min_param_a, max_param_a);

    float x0 = 0.0;  
    float y0 = 0.0;
    float x4 = a;  
    float y4 = b;
    float x5 = c;  
    float y5 = d;
    float x3 = 1.0;  
    float y3 = 1.0;
    float x1,y1,x2,y2; // to be solved.

    // arbitrary but reasonable 
    // t-values for interior control points
    float t1 = 0.3;
    float t2 = 0.7;

  float B0t1 = B0(t1);
  float B1t1 = B1(t1);
  float B2t1 = B2(t1);
  float B3t1 = B3(t1);
  float B0t2 = B0(t2);
  float B1t2 = B1(t2);
  float B2t2 = B2(t2);
  float B3t2 = B3(t2);

  float ccx = x4 - x0*B0t1 - x3*B3t1;
  float ccy = y4 - y0*B0t1 - y3*B3t1;
  float ffx = x5 - x0*B0t2 - x3*B3t2;
  float ffy = y5 - y0*B0t2 - y3*B3t2;

  x2 = (ccx - (ffx*B1t1)/B1t2) / (B2t1 - (B1t1*B2t2)/B1t2);
  y2 = (ccy - (ffy*B1t1)/B1t2) / (B2t1 - (B1t1*B2t2)/B1t2);
  x1 = (ccx - x2*B2t1) / B1t1;
  y1 = (ccy - y2*B2t1) / B1t1;

  x1 = constrain(x1, epsilon, 1.0-epsilon);
  x2 = constrain(x2, epsilon, 1.0-epsilon);

  // Note that this function also requires cubicBezier()!
  y = cubicBezierImp(x, x1,y1, x2,y2);
  y = constrain(y, 0.0, 1.0);
  return y;
}

//!!! functions

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;

    float y = func(st.x);
    // float y =st.x;

    // vec3 color = vec3(y);
    vec3 color = hsv2rgb(vec3(y, 1, 0.7)); 

    // Plot a line
    float pct = plot(st,y);
    color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

	gl_FragColor = vec4(color,1.0);
}
