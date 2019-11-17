const benny = require("benny")
const _ = require("lodash")

const NODE_COUNTS = [ 100 ]
const EDGE_DENSITY = [ .2 ]

const NODE_COUNT = 5000

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
            // if ( this.graph.removeNode(id) == false ) {
            //     console.log( "count: ", this.graph.getNodesCount() )

            //     this.graph.forEachNode((node) => {
            //         console.log( node.id )
            //     })

            //     throw `error ${id}`
            // }
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

        for (let i = 0; i < NODE_COUNT; i++){
            graph.addNode(i)
        }
    },
    "Removing nodes": (Graph) => {
        let graph = new Graph()
        let nodes = []
        for (let i = 0; i < NODE_COUNT; i++){
            nodes.push(graph.addNode(i))
        }
        nodes = _.shuffle(nodes)

        graphs.push([
            nodes, graph
        ])

        return () => {
            let [nodes, graph] = graphs.pop()

            c++
            console.log(c)

            for (let i = 0; i < NODE_COUNT; i++) {
                graph.removeNode( nodes.pop() )
            }
        }
    }
}

function generateTest(test) {
    return Object.entries(GRAPHS).map(([name, Graph]) => 
        benny.add(name, () => test(Graph))
    )
}

Object.entries(TESTS).forEach(([name, test]) => {
    benny.suite(
        name,

        ...generateTest(test),

        benny.cycle(),
        benny.complete()
    )
})