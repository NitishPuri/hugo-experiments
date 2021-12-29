---
layout: sketch
tags: ["p5", "coding-challenge"]
date: "2018-04-03"
scripts: 
    - sketch.js
title: Recaman's Sequence
---

**Coding Challenge#110**

References ::   
* [Wolfram Alpha](http://mathworld.wolfram.com/RecamansSequence.html)
* [Online Encyclopedia of Integer Sequences](https://oeis.org/A005132)
* [Numberphile Video](https://www.youtube.com/watch?v=FGC5TdIiT9U)
* [Coding Train](https://youtu.be/pYnaBQgnARQ)

```
a(0) = 0;
for n > 0,
    a(n) = a(n-1) - n if positive and not already in the sequence,
        otherwise a(n) = a(n-1) + n.
```