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

        let node = trackingGraph.addNode({})

        let nodes = trackingGraph.nodes

        expect(nodes).toIncludeSameMembers([ node ])
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
        expect(edge.nodes).toEqual(
            expect.arrayContaining([node1, node2])
        )
    })

    test("added link to nodes", () => {
        let edgeList = expect.arrayContaining([edge])

        expect(node1.edges).toEqual(edgeList)
        expect(node2.edges).toEqual(edgeList)
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
        let edges = trackingGraph.edges

        expect(edges.length).toBe(1)
        expect(edges).toEqual(expect.arrayContaining([edge]))
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
        expect( graph.hasEdge(node2, node3) ).toBe( false )
    })
})