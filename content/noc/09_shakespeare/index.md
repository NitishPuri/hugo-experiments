---
layout: sketch
tags: ["p5", "noc"]
date: "2018-01-27"
scripts: 
    - DNA.js
    - population.js
    - sketch.js
title: Genetic Algorithm, Evolving Shakespeare
---
<style>
.stats, .all, .best {
 font-family: "Courier";
}
.best {
    font-size: 48pt;
}
.stats {
    font-size: 24pt;
}
</style>

Demonstration of using a genetic algorithm to perform a search.   

**setup()**   
 
 * The Population
    * Create an empty population (a list)
    * Fill it with DNA encoded objects (random values to start)

**draw()**   
* Selection
    * Create an empty mating pool( a list)
    * For every number of the population, evaluate its fitness based on some 
    criteria /function and add it to the mating pool with selection probability directly proportional to higher fitness.
* Reproduction 
    * Fill the new population by executing the following steps,
        * Pick two parents from the mating pool.
        * Crossover -- create  child by crossing over the parents.
        * Mutation -- mutate the child's DNA based on a given probability.
        * Add the child object to the new population.
    * Replace the old population with the new population.
* Rinse and Repeat.

