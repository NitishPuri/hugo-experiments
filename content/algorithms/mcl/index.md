---
layout: sketch
tags: ["algorithms", "localization"]
scripts: 
    - sketch.js
    - robot.js
date: "2018-04-30"
title: Monte Carlo Localization(MCL)
header_image: mcl.jpg
summary: "Monte Carlo Localization visualization."

---

## Algorithm
Also known as particle filter localization, is an algorithm for robots to localize using a particle filter.   
Given a map of the environment, the goal of the algorithm is for the robot to dterine its pose within the environment.   

At every time \\(t\\) the algorithm takes as input the previous belief \\(X_{t-1}=\{x_{t-1}^{[1]}, x_{t-1}^{[2]},...,x_{t-1}^{[M]}\}\\), 
an actuation command \\(u_t\\), and data received from sensors \\(z_t\\); and the algorithm outputs the new belief \\(X_t\\).   

$$
\mathbf{MCL}(X{t-1}, u_t, z_t): \\\   
\quad \bar X_t = X_t = \varnothing \\\
\quad \text{for } m = 1 \text{to } M: \\\
\quad \quad x_t^{[m]} = \mathbf{motion\_update}(u_t, x_{t-1}^{[m]}) \\\
\quad \quad w_t^{[m]} = \mathbf{sensor\_update}(z_t, x_{t}^{[m]}) \\\
\quad \quad \bar X_t = \bar X_t + <x_t^{[m]}, w_t^{[m]}> \\\
\quad \text{endfor} \\\
\quad \text{for } m = 1 \text{to } M: \\\
\quad \quad \text{draw } x_t^{[m]} \text{ from } \bar X_t \text{ with probability } \varpropto w_t^{[m]} \\\
\quad \quad X_t = X_t + m_t^{[m]} \\\
\quad \text{endfor} \\\
\quad \text{return } X_t
$$

TODO::
* Add support for localization in a randomly generated map!!
* Improve interaction.
* Add optional arrows for visualizing estimated motion direction.

References::
* [Monte Carlo localization :: Wikipedia](https://en.wikipedia.org/wiki/Monte_Carlo_localization)
* [Monte Carlo Localization for Mobile Robots:: Paper by Sabastian Thrun](https://www.cc.gatech.edu/~dellaert/ftp/Dellaert99icra.pdf)
* [Robust Monte Carlo Localization for Mobile Robots :: by Sabastian Thrun](http://robots.stanford.edu/papers/thrun.robust-mcl.pdf)