---
layout: sketch
tags: ["showcase", "algorithms", "graphs"]
libs:
    - custom/heap.js
scripts: 
    - sketch.js
date: "2018-04-30"
title: Prim's Minimum Spanning Tree
---

A **minimum spanning tree(MST)** or **minimum weight spanning tree** is a subset of tge edges of a *connected*, edge-weighted graph that connects all the vertices together, without any cycles and with the minimum possible total edge weight.    

In the above demonstration we have a *planner* graph whose edge weights/lengths follow triangle equality, although this is not a requirement to calculate the MST. 

## Prim's MST
A Greedy algorithm that starts from an arbitrary vertex and builds the tree by choosing the cheepest edge from the tree to another vertex.    

### Algorithm
1. *Initialize a tree with a single vertex, chosen arbitrarily from the graph.*
2. *Grow the tree by one edge; of the edges that connect the tree to vertices not yet in the tree, find the minimum-weight edge, and transfer it to the tree.*
3. *Repeat 2 (until all vertices are in the tree).*

References::
* [Minimum Spanning Tree :: Wikipedia](https://en.wikipedia.org/wiki/Minimum_spanning_tree)
* [Prim's MST Algorithm](https://en.wikipedia.org/wiki/Prim%27s_algorithm)
* [Kruskal's MST Algorithm](https://en.wikipedia.org/wiki/Kruskal%27s_algorithm)
