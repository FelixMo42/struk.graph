<a name="Graph"></a>

## Graph
**Kind**: global class  

* [Graph](#Graph)
    * [new Graph(options)](#new_Graph_new)
    * _instance_
        * [.trackingEdges()](#Graph+trackingEdges) ⇒ <code>boolean</code>
        * [.trackingNodes()](#Graph+trackingNodes) ⇒
        * [.addNode(data)](#Graph+addNode) ⇒ <code>node</code>
        * [.removeNode(node)](#Graph+removeNode)
        * [.addEdge(from, to, data)](#Graph+addEdge)
        * [.hasEdge(from, to)](#Graph+hasEdge) ⇒ <code>boolean</code>
        * [.hasEdgeFrom(from, to)](#Graph+hasEdgeFrom) ⇒ <code>boolean</code>
        * [.hasEdgeTo(to, from)](#Graph+hasEdgeTo) ⇒ <code>boolean</code>
        * [.getEdge(node1, node2)](#Graph+getEdge) ⇒ <code>edge</code>
        * [.getEdgeFrom(from, to)](#Graph+getEdgeFrom) ⇒ <code>edge</code>
        * [.getEdgeTo(to, from)](#Graph+getEdgeTo) ⇒ <code>edge</code>
        * [.removeEdge(edge)](#Graph+removeEdge)
        * [.edges(node)](#Graph+edges) ⇒
        * [.edgesTo(node)](#Graph+edgesTo)
        * [.edgesFrom(node)](#Graph+edgesFrom)
        * [.allNodes()](#Graph+allNodes)
        * [.getTotalNodes()](#Graph+getTotalNodes)
        * [.allEdges()](#Graph+allEdges)
        * [.getTotalEdges()](#Graph+getTotalEdges)
    * _static_
        * [.multigraph](#Graph.multigraph)

<a name="new_Graph_new"></a>

### new Graph(options)
Represents a graph object.


| Param | Type |
| --- | --- |
| options | <code>\*</code> | 

<a name="Graph+trackingEdges"></a>

### graph.trackingEdges() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Graph</code>](#Graph)  
**Returns**: <code>boolean</code> - whether the graph is tracking edges  
<a name="Graph+trackingNodes"></a>

### graph.trackingNodes() ⇒
**Kind**: instance method of [<code>Graph</code>](#Graph)  
**Returns**: whether the graph is tracking nodes  
<a name="Graph+addNode"></a>

### graph.addNode(data) ⇒ <code>node</code>
Adds a node with given data to graph.

**Kind**: instance method of [<code>Graph</code>](#Graph)  
**Returns**: <code>node</code> - the new node  

| Param | Type |
| --- | --- |
| data | <code>any</code> | 

<a name="Graph+removeNode"></a>

### graph.removeNode(node)
Removes node from graph.

**Kind**: instance method of [<code>Graph</code>](#Graph)  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>node</code> | node to remove |

<a name="Graph+addEdge"></a>

### graph.addEdge(from, to, data)
Adds edge to graph.

**Kind**: instance method of [<code>Graph</code>](#Graph)  

| Param | Type | Description |
| --- | --- | --- |
| from | <code>node</code> | starting point of new edge |
| to | <code>node</code> |  |
| data | <code>any</code> |  |

<a name="Graph+hasEdge"></a>

### graph.hasEdge(from, to) ⇒ <code>boolean</code>
Checks if the graph has given edge (undirected).

**Kind**: instance method of [<code>Graph</code>](#Graph)  
**Returns**: <code>boolean</code> - whether such an edge exist  

| Param | Type | Description |
| --- | --- | --- |
| from | <code>node</code> | one of the nodes nodes in the edge |
| to | <code>node</code> | the outhe node in the edge |

<a name="Graph+hasEdgeFrom"></a>

### graph.hasEdgeFrom(from, to) ⇒ <code>boolean</code>
Checks if the graph has given edge (directed).

**Kind**: instance method of [<code>Graph</code>](#Graph)  
**Returns**: <code>boolean</code> - whether such an edge exist  

| Param | Type | Description |
| --- | --- | --- |
| from | <code>node</code> | the origin of the edge |
| to | <code>node</code> | the target of the edge |

<a name="Graph+hasEdgeTo"></a>

### graph.hasEdgeTo(to, from) ⇒ <code>boolean</code>
Checks if the graph has given edge (directed).

**Kind**: instance method of [<code>Graph</code>](#Graph)  
**Returns**: <code>boolean</code> - whether such an edge exist  

| Param | Type | Description |
| --- | --- | --- |
| to | <code>node</code> | the target of the edge |
| from | <code>node</code> | the origin of the edge |

<a name="Graph+getEdge"></a>

### graph.getEdge(node1, node2) ⇒ <code>edge</code>
Gets the first edge it finds going between the two nodes (undirected).

**Kind**: instance method of [<code>Graph</code>](#Graph)  
**Returns**: <code>edge</code> - the first valid edge  

| Param | Type | Description |
| --- | --- | --- |
| node1 | <code>node</code> | one of the nodes nodes in the edge |
| node2 | <code>node</code> | the outhe node in the edge |

<a name="Graph+getEdgeFrom"></a>

### graph.getEdgeFrom(from, to) ⇒ <code>edge</code>
Gets the first edge it finds going between the two nodes (directed).

**Kind**: instance method of [<code>Graph</code>](#Graph)  
**Returns**: <code>edge</code> - the first valid edge  

| Param | Type | Description |
| --- | --- | --- |
| from | <code>node</code> | the origin of the edge |
| to | <code>node</code> | the target of the edge |

<a name="Graph+getEdgeTo"></a>

### graph.getEdgeTo(to, from) ⇒ <code>edge</code>
Gets the first edge it finds going between the two nodes (directed).

**Kind**: instance method of [<code>Graph</code>](#Graph)  
**Returns**: <code>edge</code> - the first valid edge  

| Param | Type | Description |
| --- | --- | --- |
| to | <code>node</code> | the target of the edge |
| from | <code>node</code> | the origin of the edge |

<a name="Graph+removeEdge"></a>

### graph.removeEdge(edge)
Removes an edge from the graph

**Kind**: instance method of [<code>Graph</code>](#Graph)  

| Param | Type | Description |
| --- | --- | --- |
| edge | <code>edge</code> | the edge to remove |

<a name="Graph+edges"></a>

### graph.edges(node) ⇒
**Kind**: instance method of [<code>Graph</code>](#Graph)  

| Param | Type |
| --- | --- |
| node | <code>node</code> | 

<a name="Graph+edgesTo"></a>

### graph.edgesTo(node)
**Kind**: instance method of [<code>Graph</code>](#Graph)  

| Param | Type |
| --- | --- |
| node | <code>node</code> | 

<a name="Graph+edgesFrom"></a>

### graph.edgesFrom(node)
**Kind**: instance method of [<code>Graph</code>](#Graph)  

| Param | Type |
| --- | --- |
| node | <code>node</code> | 

<a name="Graph+allNodes"></a>

### graph.allNodes()
**Kind**: instance method of [<code>Graph</code>](#Graph)  
<a name="Graph+getTotalNodes"></a>

### graph.getTotalNodes()
**Kind**: instance method of [<code>Graph</code>](#Graph)  
<a name="Graph+allEdges"></a>

### graph.allEdges()
**Kind**: instance method of [<code>Graph</code>](#Graph)  
<a name="Graph+getTotalEdges"></a>

### graph.getTotalEdges()
**Kind**: instance method of [<code>Graph</code>](#Graph)  
<a name="Graph.multigraph"></a>

### Graph.multigraph
**Kind**: static property of [<code>Graph</code>](#Graph)  
