---
layout: sketch
tags: ["coding-challenge", "algorithms"]
date: "2018-05-08"
scripts: 
    - spot.js
    - sketch.js
title: A* Path Finding
weight: 1
---

**Coding Challenge#51**

[Wikipedia Source](https://en.wikipedia.org/wiki/A*_search_algorithm)

A* (pronounced "A-star") is a graph traversal and path search algorithm, which is often used in many fields of computer science due to its completeness, optimality, and optimal efficiency.    
One major practical drawback is its \\( O(b^d) \\) space complexity, as it stores all generated nodes in memory. Thus, in practical travel-routing systems, it is generally outperformed by algorithms which can pre-process the graph to attain better performance, as well as memory-bounded approaches; however, A* is still the best solution in many cases.

Peter Hart, Nils Nilsson and Bertram Raphael of Stanford Research Institute (now SRI International) first published the algorithm in 1968.It can be seen as an extension of **Dijkstra's algorithm**.   
A* achieves better performance by using heuristics to guide its search.

Compared to Dijkstra's algorithm, the A* algorithm only finds the shortest path from a specified source to a specified goal, and not the shortest-path tree from a specified source to all possible goals.    
This is a necessary trade-off for using a specific-goal-directed heuristic. For Dijkstra's algorithm, since the entire shortest-path tree is generated, every node is a goal, and there can be no specific-goal-directed heuristic.

TODO
* Add Options for different heuristics
* Add better maze creation options.
* Improve visuals.
* Add implementation and discussion about variations of this algorithm.
