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

module.exports = class Graph {
    constructor(options={}) {

        // track nodes

        if ("trackNodes" in options) {
            this.trackNodes = options.trackNodes
        } else {
            this.trackNodes = false
        }

        if (this.trackNodes) {
            this.nodeList = []
        }

        // track edges

        if ("trackEdges" in options) {
            this.trackEdges = options.trackEdges
        } else {
            this.trackEdges = false
        }

        if (this.trackEdges) {
            this.edgeList = []
        }

        // multigraph
        
        if ("multigraph" in options) {
            this.multigraph = options.multigraph
        } else {
            this.multigraph = true
        }

        // directed

        if ("directed" in options) {
            this.directed = options.directed
        } else {
            this.directed = false
        }
    }

    // == OPTIONS == //

    isMultigraph() {
        return this.multigraph
    }

    trackingEdges() {
        return this.trackEdge
    }

    trackingNodes() {
        return this.trackNodes
    }

    // == NODE FUNCTIONS == //

    addNode(data) {
        let node = {
            edges: [],
            data: data
        }

        if (this.trackNodes) {
            this.nodeList.push(node)
        }

        return node
    }

    subNode(node) {
        for (let edge of this.edges(node)) {
            this.subEdge(edge)
        }

        if (this.trackNodes) {
            removeItem(this.nodeList, node)
        }
    }

    // == EDGE FUNCTIONS == //

    addEdge(from, to, data) {
        let edge = {
            nodes: [from, to],
            data: data
        }

        from.edges.push(edge)
        to.edges.push(edge)

        if (this.trackEdges) {
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

    subEdge(edge) {
        for (let node of edge.nodes) {
            removeItem(node.edges, edge)
        }

        if (this.trackEdges) {
            removeItem(this.edgeList, edge)
        }
    }

    // == EDGE GENERATORS == //

    *edges(node) {
        for (let link of node.edges) {
            yield link
        }
    }

    *edgesTo(node) {
        for (let link of node.edges) {
            if (link.nodes[1] == node) {
                yield link
            }
        }
    }

    *edgesFrom(node) {
        for (let link of node.edges) {
            if (link.nodes[0] == node) {
                yield link
            }
        }
    }
}