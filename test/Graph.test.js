const Graph = require("../src/Graph")

describe("constructor", () => {
    let graph = new Graph({})
})

describe("#addNode", () => {
    test("set data correctly", () => {
        let graph = new Graph()

        let data = {}
        let node = graph.addNode(data)

        expect(node.data).toBe(data)
    })

    test("adds node to tracker", () => {
        let trackingGraph = new Graph({trackNodes: true})

        let node1 = trackingGraph.addNode({})
        let node2 = trackingGraph.addNode({})

        let allNodes = trackingGraph.allNodes()

        expect([
            allNodes.next().value,
            allNodes.next().value
        ]).toIncludeSameMembers([ node1, node2 ])

        expect( allNodes.next().done ).toBe(true)
    })
})

describe("#addEdge", () => {
    let graph = new Graph()

    let node1 = graph.addNode({})
    let node2 = graph.addNode({})

    let edge = graph.addEdge(node1, node2)

    test("has number of nodes", () => {
        expect(edge.nodes.length).toBe(2)
    })

    test("has correct nodes", () => {
        expect(edge.nodes).toIncludeSameMembers([node1, node2])
    })

    test("set data correctly", () => {
        let node3 = graph.addNode({})
        let data = {}
        let edge2 = graph.addEdge(node2, node3, data)
        expect(edge2.data).toBe(data)
    })

    test("adds link to tracker", () => {
        let trackingGraph = new Graph({trackEdges: true})

        let node1 = trackingGraph.addNode({})
        let node2 = trackingGraph.addNode({})

        let edge = trackingGraph.addEdge(node1, node2)

        let allEdges = trackingGraph.allEdges()

        expect([
            allEdges.next().value
        ]).toIncludeSameMembers([edge])

        expect( allEdges.next().done ).toBe( true )
    })

    test("respects directed multigraphs graphs", () => {
        let directedGraph = new Graph({
            multigraph: Graph.multigraph.DIRECTED,
        })

        let node1 = directedGraph.addNode({})
        let node2 = directedGraph.addNode({})

        expect( directedGraph.addEdge(node1, node2) ).not.toBe( false )
        expect( directedGraph.addEdge(node1, node2) ).toBe( false )

        expect( directedGraph.addEdge(node2, node1) ).not.toBe( false )
        expect( directedGraph.addEdge(node2, node1) ).toBe( false )
    })

    test("respects directed multigraphs graphs", () => {
        let undirectedGraph = new Graph({
            multigraph: Graph.multigraph.UNDIRECTED
        })

        let node1 = undirectedGraph.addNode({})
        let node2 = undirectedGraph.addNode({})

        expect( undirectedGraph.addEdge(node1, node2) ).not.toBe( false )
        expect( undirectedGraph.addEdge(node1, node2) ).toBe( false )
        expect( undirectedGraph.addEdge(node2, node1) ).toBe( false )
    })
})

describe("#removeEdge", () => {
    test("removes link from nodes", () => {
        let graph = new Graph()

        let node1 = graph.addNode("n1")
        let node2 = graph.addNode("n2")

        let edge1 = graph.addEdge(node1, node2, "e1")
        let edge2 = graph.addEdge(node1, node2, "e2")
        graph.removeEdge(edge2)

        let edges = graph.edges(node1)

        expect( edges.next().value ).toBe(edge1)
        expect( edges.next().done ).toBe(true)        
    })

    test("removes link from tracker", () => {
        let trackingGraph = new Graph({trackEdges: true})
        let node1 = trackingGraph.addNode({})
        let node2 = trackingGraph.addNode({})
        let edge1 = trackingGraph.addEdge(node1, node2)
        let edge2 = trackingGraph.addEdge(node1, node2)
        let edge3 = trackingGraph.addEdge(node1, node2)
        trackingGraph.removeEdge(edge2)

        let allEdges = trackingGraph.allEdges()

        expect([
            allEdges.next().value,
            allEdges.next().value
        ]).toIncludeSameMembers([edge1, edge3])

        expect( allEdges.next().done ).toBe( true )
    })
})

describe("#removeNode", () => {
    test("removes link from neighboring nodes", () => {
        let graph = new Graph()
        let node1 = graph.addNode({})
        let node2 = graph.addNode({})
        let edge1 = graph.addEdge(node1, node2)
        graph.removeNode(node2)
        let edges = graph.edges(node1)
        expect(edges.next().done).toBe(true)
    })

    test("removes node from tracker", () => {
        let trackingGraph = new Graph({trackNodes: true})

        let node1 = trackingGraph.addNode({})
        let node2 = trackingGraph.addNode({})
        let node3 = trackingGraph.addNode({})

        let edge1 = trackingGraph.addEdge(node1, node2)
        let edge2 = trackingGraph.addEdge(node2, node3)

        trackingGraph.removeNode(node2)
        
        let nodeList = trackingGraph.allNodes()

        expect([
            nodeList.next().value,
            nodeList.next().value
        ]).toIncludeSameMembers([node1, node3])

        expect( nodeList.next().done ).toBe(true)
    })

    test("removes connected links from tracker", () => {
        let trackingGraph = new Graph({trackEdges: true})

        let node1 = trackingGraph.addNode({})
        let node2 = trackingGraph.addNode({})
        let node3 = trackingGraph.addNode({})

        let edge1 = trackingGraph.addEdge(node1, node2)
        let edge2 = trackingGraph.addEdge(node2, node3)

        trackingGraph.removeNode(node1)

        let allEdges = trackingGraph.allEdges()
        
        expect([
            allEdges.next().value
        ]).toIncludeSameMembers([edge2])

        expect( allEdges.next().done ).toBe( true )
    })
})

describe("#edges", () => {
    let graph = new Graph()

    let node1 = graph.addNode({})
    let node2 = graph.addNode({})
    let node3 = graph.addNode({})

    let edge1 = graph.addEdge(node1, node2)
    let edge2 = graph.addEdge(node2, node3)
    let edge3 = graph.addEdge(node1, node3)

    test("gets correct edges", () => {
        let edges = graph.edges(node1)
        expect([ 
            edges.next().value,
            edges.next().value
        ]).toIncludeSameMembers([edge1, edge3])
        expect( edges.next().done ).toBe(true)
    })
})

describe("#edgesFrom", () => {
    let graph = new Graph()

    let node1 = graph.addNode({})
    let node2 = graph.addNode({})
    let node3 = graph.addNode({})

    let edge1 = graph.addEdge(node1, node2)
    let edge2 = graph.addEdge(node2, node3)
    let edge3 = graph.addEdge(node3, node1)

    test("gets correct edges", () => {
        let edges = graph.edgesFrom(node1)
        
        expect( edges.next().value ).toBe(edge1)
        expect( edges.next().done ).toBe(true)
    })
})

describe("#edgesTo", () => {
    let graph = new Graph()

    let node1 = graph.addNode({})
    let node2 = graph.addNode({})
    let node3 = graph.addNode({})

    let edge1 = graph.addEdge(node1, node2)
    let edge2 = graph.addEdge(node2, node3)
    let edge3 = graph.addEdge(node3, node1)

    test("gets correct edges", () => {
        let edges = graph.edgesTo(node1)
        
        expect( edges.next().value ).toBe(edge3)
        expect( edges.next().done ).toBe(true)
    })
})

describe("#hasEdge", () => {
    let graph = new Graph()

    let node1 = graph.addNode({})
    let node2 = graph.addNode({})
    let node3 = graph.addNode({})

    let edge1 = graph.addEdge(node1, node2)
    let edge3 = graph.addEdge(node1, node3)

    test("return correct thing", () => {
        expect( graph.hasEdge(node1, node2) ).toBe( true )
        expect( graph.hasEdge(node2, node1) ).toBe( true )
        expect( graph.hasEdge(node2, node3) ).toBe( false )
    })
})

describe("#hasEdgeFrom", () => {
    let graph = new Graph()

    let node1 = graph.addNode({})
    let node2 = graph.addNode({})
    let node3 = graph.addNode({})

    let edge1 = graph.addEdge(node1, node2)
    let edge3 = graph.addEdge(node1, node3)

    test("return correct thing", () => {
        expect( graph.hasEdgeFrom(node1, node2) ).toBe( true )
        expect( graph.hasEdgeFrom(node2, node1) ).toBe( false )
        expect( graph.hasEdgeFrom(node2, node3) ).toBe( false )
    })
})

describe("#hasEdgeTo", () => {
    let graph = new Graph()

    let node1 = graph.addNode({})
    let node2 = graph.addNode({})
    let node3 = graph.addNode({})

    let edge1 = graph.addEdge(node1, node2)
    let edge3 = graph.addEdge(node1, node3)

    test("return correct thing", () => {
        expect( graph.hasEdgeTo(node1, node2) ).toBe( false )
        expect( graph.hasEdgeTo(node2, node1) ).toBe( true )
        expect( graph.hasEdgeTo(node2, node3) ).toBe( false )
    })
})