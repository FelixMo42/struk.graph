// Dont want to use lodash just for this one function
function removeItem(arr, item) {
    if (arr[arr.length - 1] == item) {
        return arr.pop()
    }

    let i = arr.length - 2

    while (i >= 0) {
        let c = arr[i]

        arr[i] = arr[i + 1]

        if ( c == item ) {
            break
        }

        i--
    }

    return arr.pop()
}

class Graph {
    constructor(options={}) {
        this.options = {}

        // track nodes

        if ("trackNodes" in options) {
            this.options.trackNodes = options.trackNodes
        } else {
            this.options.trackNodes = false
        }

        if (this.options.trackNodes) {
            this.nodeList = []
        }

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

    trackingEdges() {
        return this.options.trackEdge
    }

    trackingNodes() {
        return this.options.trackNodes
    }

    // == NODE FUNCTIONS == //

    addNode(data) {
        let node = {
            edges: [],
            data: data
        }

        if (this.options.trackNodes) {
            this.nodeList.push(node)
        }

        return node
    }

    removeNode(node) {
        for (let edge of this.edges(node)) {
            this.removeEdge(edge)
        }

        if (this.options.trackNodes) {
            removeItem(this.nodeList, node)
        }
    }

    // == EDGE FUNCTIONS == //

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

    hasEdge(node1, node2) {
        for ( let edge of this.edges(node1) ) {
            if ( edge.nodes[0] == node2 || edge.nodes[1] == node2 ) {
                return true
            }
        }

        return false
    }

    hasEdgeFrom(from, to) {
        for ( let edge of this.edgesFrom(from) ) {
            if ( edge.nodes[1] == to ) {
                return true
            }
        }

        return false
    }

    hasEdgeTo(to, from) {
        for ( let edge of this.edgesTo(to) ) {
            if ( edge.nodes[0] == from ) {
                return true
            }
        }

        return false
    }

    removeEdge(edge) {
        for (let node of edge.nodes) {
            removeItem(node.edges, edge)
        }

        if (this.options.trackEdges) {
            removeItem(this.edgeList, edge)
        }
    }

    // == EDGE GENERATORS == //

    *edges(node) {
        for (let edge of node.edges) {
            yield edge
        }
    }

    *edgesTo(node) {
        for (let edge of node.edges) {
            if (edge.nodes[1] == node) {
                yield edge
            }
        }
    }

    *edgesFrom(node) {
        for (let edge of node.edges) {
            if (edge.nodes[0] == node) {
                yield edge
            }
        }
    }

    // == TRACKERS == //

    *allNodes() {
        for (let node of this.nodeList) {
            yield node
        }
    }

    getTotalNodes() {
        return this.nodeList.length
    }

    *allEdges() {
        for (let edge of this.edgeList) {
            yield edge
        }
    }

    getTotalEdges() {
        return this.nodeList.length
    }
}

Graph.multigraph = Object.freeze({
    NONE: Symbol("multigraph.none"),
    DIRECTED: Symbol("multigraph.directed"),
    UNDIRECTED: Symbol("multigraph.undirected")
})

module.exports = Graph