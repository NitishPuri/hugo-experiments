---
layout: sketch
tags: ["p5", "showcase", "algorithms", "2018"]
libs:
    - custom/heap.js    
scripts:  
    - sketch.js
date: "2018-07-07"
title: Kruskal's Minimum Spanning Tree
---

A **minimum spanning tree(MST)** or **minimum weight spanning tree** is a subset of tge edges of a *connected*, edge-weighted graph that connects all the vertices together, without any cycles and with the minimum possible total edge weight.    

In the above demonstration we have a *planner* graph whose edge weights/lengths follow triangle equality, although this is not a requirement to calculate the MST. 

## Kruskal's MST
A greedy algorithm which finds an edge of the least possible weight that connects any two trees in the forest.   

### Algorithm   

$$   
\mathbf{KRUSKAL}(G): \\\
\quad A = \varnothing   \\\
\quad \mathbf{foreach} \; v \in G.V: \\\
\quad \quad \text{MAKE-SET}(v)  \\\
\quad \mathbf{foreach} \; (u, v) \in G.E \text{ ordered by weight}(u, v), \text{increasing:} \\\
\quad \quad \mathbf{if}\; \text{FIND-SET}(u) \neq \text{FIND-SET}(v): \\\
\quad \quad \quad A = A \cup \{(u, v)\} \\\
\quad \quad \quad \text{UNION}(u, v) \\\
\quad \mathbf{return} \; A
$$


References::
* [Minimum Spanning Tree :: Wikipedia](https://en.wikipedia.org/wiki/Minimum_spanning_tree)
* [Prim's MST Algorithm](https://en.wikipedia.org/wiki/Prim%27s_algorithm)
* [Kruskal's MST Algorithm](https://en.wikipedia.org/wiki/Kruskal%27s_algorithm)
