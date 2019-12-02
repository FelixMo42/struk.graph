// Dont want to use lodash just for this one function
function removeItem(arr, item) {
    let i = arr.length - 1

    while (i >= 0) {
        if ( arr[i] == item ) {
            arr[i] = arr[arr.length - 1]
        }

        i--
    }

    return arr.pop()
}

class Graph {
    /**
     * Represents a graph object.
     * @param {*} options 
     */
    constructor(options={}) {
        this.options = {}

        // track nodes

        if ("trackNodes" in options) {
            this.options.trackNodes = options.trackNodes
        } else {
            this.options.trackNodes = true
        }

        if (this.options.trackNodes) {
            this.nodeHead = {isHead: true}
            this.nodeTail = {isTail: true}

            this.nodeHead.prev = this.nodeTail
            this.nodeTail.next = this.nodeHead    
        }

        this.nodeCount = 1

        // track edges

        if ("trackEdges" in options) {
            this.options.trackEdges = options.trackEdges
        } else {
            this.options.trackEdges = false
        }

        if (this.options.trackEdges) {
            this.edgeList = []
        }

        // multigraph
        
        if ("multigraph" in options) {
            this.options.multigraph = options.multigraph
        } else {
            this.options.multigraph = Graph.multigraph.NONE
        }
    }

    // == OPTIONS == //

    /**
     * @returns {boolean} whether the graph is tracking edges 
     */
    trackingEdges() {
        return this.options.trackEdge
    }

    /**
     * @returns whether the graph is tracking nodes
     */
    trackingNodes() {
        return this.options.trackNodes
    }

    // == NODE FUNCTIONS == //

    /**
     * Adds a node with given data to graph.
     * @param {any} data 
     * @returns {node} the new node
     */
    addNode(data) {
        let node = {
            edges: [],
            data: data
        }

        if (this.options.trackNodes) {
            node.next = this.nodeHead
            node.prev = this.nodeHead.prev

            this.nodeHead.prev.next = node
            this.nodeHead.prev = node

            this.nodeCount += 1
        }

        return node
    }

    /**
     * Removes node from graph.
     * @param {node} node node to remove
     */
    removeNode(node) {
        for (let edge of node.edges) {
            this.removeEdge(edge)
        }

        if (this.options.trackNodes) {
            node.next.prev = node.prev
            node.prev.next = node.next

            this.nodeCount -= 1
        }
    }

    // == EDGE FUNCTIONS == //

    /**
     * Adds edge to graph.
     * @param {node} from starting point of new edge
     * @param {node} to 
     * @param {any} data 
     */
    addEdge(from, to, data) {
        if (this.options.multigraph == Graph.multigraph.NONE) {
        } else if (this.options.multigraph == Graph.multigraph.DIRECTED) {
            if ( this.hasEdgeFrom(from, to) ) {
                return false
            }
        } else if (this.options.multigraph == Graph.multigraph.UNDIRECTED) {
            if ( this.hasEdge(from, to) ) {
                return false
            }
        }

        let edge = {
            nodes: [from, to],
            data: data
        }

        from.edges.push(edge)
        to.edges.push(edge)

        if (this.options.trackEdges) {
            this.edgeList.push(edge)
        }

        return edge
    }

    /**
     * Checks if the graph has given edge (undirected).
     * @param {node} from one of the nodes nodes in the edge
     * @param {node} to the outhe node in the edge
     * @returns {boolean} whether such an edge exist
     */
    hasEdge(from, to) {
        for ( let edge of this.edges(from) ) {
            if ( edge.nodes[0] == to || edge.nodes[1] == to ) {
                return true
            }
        }

        return false
    }

    /**
     * Checks if the graph has given edge (directed).
     * @param {node} from the origin of the edge
     * @param {node} to the target of the edge
     * @returns {boolean} whether such an edge exist
     */
    hasEdgeFrom(from, to) {
        for ( let edge of this.edgesFrom(from) ) {
            if ( edge.nodes[1] == to ) {
                return true
            }
        }

        return false
    }

    /**
     * Checks if the graph has given edge (directed).
     * @param {node} to the target of the edge
     * @param {node} from the origin of the edge
     * @returns {boolean} whether such an edge exist
     */
    hasEdgeTo(to, from) {
        for ( let edge of this.edgesTo(to) ) {
            if ( edge.nodes[0] == from ) {
                return true
            }
        }

        return false
    }

    /**
     * Gets the first edge it finds going between the two nodes (undirected).
     * @param {node} node1 one of the nodes nodes in the edge
     * @param {node} node2 the outhe node in the edge
     * @returns {edge} the first valid edge
     */
    getEdge(node1, node2) {
        for ( let edge of this.edges(node1) ) {
            if ( edge.nodes[0] == node2 || edge.nodes[1] == node2 ) {
                return edge
            }
        }
    }

    /**
     * Gets the first edge it finds going between the two nodes (directed).
     * @param {node} from the origin of the edge
     * @param {node} to the target of the edge
     * @returns {edge} the first valid edge
     */
    getEdgeFrom(from, to) {
        for ( let edge of this.edgesFrom(from) ) {
            if ( edge.nodes[1] == to ) {
                return edge
            }
        }
    }

    /**
     * Gets the first edge it finds going between the two nodes (directed).
     * @param {node} to the target of the edge
     * @param {node} from the origin of the edge
     * @returns {edge} the first valid edge
     */
    getEdgeTo(to, from) {
        for ( let edge of this.edgesTo(to) ) {
            if ( edge.nodes[0] == from ) {
                return edge
            }
        }
    }

    /**
     * Removes an edge from the graph
     * @param {edge} edge the edge to remove
     */
    removeEdge(edge) {
        for (let node of edge.nodes) {
            removeItem(node.edges, edge)
        }

        if (this.options.trackEdges) {
            removeItem(this.edgeList, edge)
        }
    }

    // == EDGE GENERATORS == //

    /**
     * 
     * @param {node} node 
     * @returns {}
     */
    *edges(node) {
        for (let edge of node.edges) {
            yield edge
        }
    }

    /**
     * 
     * @param {node} node 
     */
    *edgesTo(node) {
        for (let edge of node.edges) {
            if (edge.nodes[1] == node) {
                yield edge
            }
        }
    }

    /**
     * 
     * @param {node} node 
     */
    *edgesFrom(node) {
        for (let edge of node.edges) {
            if (edge.nodes[0] == node) {
                yield edge
            }
        }
    }

    // == TRACKERS == //

    /**
     * 
     */
    *allNodes() {
        let node = this.nodeTail.next

        while (node !== this.nodeHead) {
            yield node
            node = node.next
        }
    }

    /**
     * 
     */
    getTotalNodes() {
        return this.nodeCount
    }

    /**
     * 
     */
    *allEdges() {
        for (let edge of this.edgeList) {
            yield edge
        }
    }

    /**
     * 
     */
    getTotalEdges() {
        return this.nodeList.length
    }
}

/**
 * 
 */
Graph.multigraph = Object.freeze({
    NONE: Symbol("multigraph.none"),
    DIRECTED: Symbol("multigraph.directed"),
    UNDIRECTED: Symbol("multigraph.undirected")
})

module.exports = Graph