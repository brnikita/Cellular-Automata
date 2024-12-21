# One-Cell Organism Simulation

A progressive simulation of cellular organisms that evolve from basic existence to autonomous intelligence.

## Development Levels

### Level 1: Basic Existence
- **Behavior**: Static cells occupy grid positions and can only detect neighboring cells
- **Abilities**: Sense immediate surroundings (neighbors or obstacles)
- **Algorithm Focus**: Basic rendering, neighbor detection, and simple visualization

### Level 2: Movement and Exploration
- **Behavior**: Random movement within the grid
- **Abilities**: Wander around the environment to explore new spaces
- **Algorithm Focus**: Randomized movement patterns with boundary checks

### Level 3: Resource Collection
- **Behavior**: Detect and move toward resources
- **Abilities**: Consume energy from resources for movement and growth
- **Algorithm Focus**: Pathfinding towards nearby resources, simple prioritization

### Level 4: Energy Management
- **Behavior**: Track energy levels for decision-making
- **Abilities**: Rest when energy is low, move when energy is abundant
- **Algorithm Focus**: Energy conservation strategies and state-based behavior

### Level 5: Memory and Learning
- **Behavior**: Memorize explored areas, prioritize unexplored regions
- **Abilities**: Avoid redundant exploration, predict resource locations
- **Algorithm Focus**: Memory arrays/maps and basic learning heuristics

### Level 6: Communication and Cooperation
- **Behavior**: Signal other cells about resources or dangers
- **Abilities**: Share information for coordinated behaviors
- **Algorithm Focus**: Message passing and collaborative decision-making

### Level 7: Adaptation to Dynamic Changes
- **Behavior**: React to environmental changes
- **Abilities**: Adjust priorities and paths dynamically
- **Algorithm Focus**: Real-time recalculations and event-driven behavior

### Level 8: Genetic Evolution
- **Behavior**: Implement mutation and reproduction mechanisms
- **Abilities**: Evolve efficient strategies through selection pressure
- **Algorithm Focus**: Genetic algorithms and fitness evaluation

### Level 9: Predictive Modeling and Strategy
- **Behavior**: Use probabilistic models for predictions
- **Abilities**: Forecast changes and optimize positioning
- **Algorithm Focus**: Bayesian networks, Markov chains, reinforcement learning

### Level 10: Autonomous Intelligence
- **Behavior**: Long-term planning and strategy adaptation
- **Abilities**: Form alliances, handle complex goals, modify algorithms
- **Algorithm Focus**: Neural networks and deep reinforcement learning

## Energy Efficiency Considerations

### Optimization Strategies
1. Minimize redundant calculations
2. Implement distributed processing
3. Use caching and memoization
4. Balance computation with asynchronous updates

## Setup and Installation

1. Clone the repository
2. Open `index.html` in a modern web browser
3. Ensure all script dependencies are properly loaded:
   - Lodash (via CDN)
   - Local JavaScript modules

## Project Structure
