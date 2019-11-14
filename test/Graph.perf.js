const benny = require("benny")
const _ = require("lodash")

const NODE_COUNTS = [ 100 ]
const EDGE_DENSITY = [ .2 ]

const NODE_COUNT = 100

const GRAPHS = {
    "ngraph.graph": class {
        constructor() {
            this.graph = require("ngraph.graph")()
        }

        addNode(id) {
            this.graph.addNode(id)
            return id
        }

        removeNode(id) {
            this.graph.removeNode(id)
        }
    },
    "struk.graph": class {
        constructor() {
            this.graph = new (require("../src/Graph"))()
        }

        addNode(id) {
            return this.graph.addNode(id)
        }

        removeNode(id) {
            this.graph.removeNode(id)
        }
    },
    "graphlib": class {
        constructor() {
            this.graph = new (require("graphlib")).Graph()
        }

        addNode(id) {
            this.graph.setNode(id)
            return id
        }

        removeNode(id) {
            this.graph.removeNode(id)
        }
    }
}

const TESTS = {
    "Add nodes": (Graph) => {
        let graph = new Graph()

        for (let i = 0; i < 5000; i++){
            graph.addNode(i)
        }
    },
    "Removing nodes": (Graph) => {
        let graph = new Graph()

        let nodes = []
        for (let i = 0; i < 5000; i++){
            nodes.push(graph.addNode(i))
        }
        nodes = _.shuffle(nodes)

        return () => {
            for (let i = 0; i < 5000; i++){
                graph.removeNode( nodes[i] )
            }
        }
    }
}

function generateTest(test) {
    return Object.entries(GRAPHS).map(([name, Graph]) => 
        benny.add(name, () => test(Graph))
    )
}

// benny.add(name, test(Graph))

Object.entries(TESTS).forEach(([name, test]) => {
    benny.suite(
        name,

        ...generateTest(test),

        benny.cycle(),
        benny.complete()
    )
})