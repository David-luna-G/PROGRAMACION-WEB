import heapq

def a_star_search(graph, heuristic, start, goal):
    """
    Implementación del algoritmo A* para encontrar el camino más corto en un grafo.
    """

    open_set = []
    heapq.heappush(open_set, (heuristic[start], 0, start, [start]))
    
   
    g_costs = {start: 0}
    
    while open_set:
        f, g, current, path = heapq.heappop(open_set)
        
       
        if current == goal:
            return path, g
            
        if g > g_costs.get(current, float('inf')):
            continue
            
        for neighbor, weight in graph[current]:
            tentative_g = g + weight
            
          
            if tentative_g < g_costs.get(neighbor, float('inf')):
                g_costs[neighbor] = tentative_g
                f_score = tentative_g + heuristic.get(neighbor, 0)
                heapq.heappush(open_set, (f_score, tentative_g, neighbor, path + [neighbor]))
                
    return None, float('inf')


graph = {
    'A': [('B', 8), ('E', 4), ('D', 5)],
    'B': [('A', 8), ('C', 3), ('F', 4), ('E', 12)],
    'C': [('B', 3), ('G', 11), ('F', 9)],
    'D': [('A', 5), ('E', 9), ('H', 6)],
    'E': [('A', 4), ('B', 12), ('D', 9), ('F', 3), ('I', 8), ('J', 5)],
    'F': [('B', 4), ('C', 9), ('E', 3), ('G', 1), ('K', 8)],
    'G': [('C', 11), ('F', 1), ('K', 8), ('L', 7)],
    'H': [('D', 6), ('I', 2), ('M', 7)],
    'I': [('E', 8), ('H', 2), ('J', 10), ('M', 6)],
    'J': [('E', 5), ('I', 10), ('K', 6), ('N', 9)],
    'K': [('F', 8), ('G', 8), ('J', 6), ('L', 5), ('P', 7)],
    'L': [('G', 7), ('K', 5), ('P', 6)],
    'M': [('H', 7), ('I', 6), ('N', 2)],
    'N': [('J', 9), ('M', 2), ('P', 12)],
    'P': [('K', 7), ('L', 6), ('N', 12)]
}


heuristic = {
    'A': 15, 'B': 13, 'C': 14, 'D': 16, 'E': 10,
    'F': 9,  'G': 8,  'H': 14, 'I': 11, 'J': 6,
    'K': 5,  'L': 4,  'M': 10, 'N': 8,  'P': 0
}


inicio = 'H'
meta = 'P'

camino, costo_total = a_star_search(graph, heuristic, inicio, meta)

print("Camino más corto encontrado:", " -> ".join(camino))
print("Costo total del camino:", costo_total)