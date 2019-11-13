const { Suite } = require('benchmark')

const Graph = require("../src/Graph")

const nodeCount = 1000


new Suite("")
    .on('cycle', function(event) {
        console.log(String(event.target))
    })

    .add("struk.graph[W/O tracking]#addNode", function() {
        let graph = new Graph({trackNodes: false})

        for (let i = 0; i < nodeCount; i++) {
            graph.addNode(i)
        }
    }, { minTime: 1 })
    .add("struk.graph[W/ tracking]#addNode", function() {
        let graph = new Graph({trackNodes: true})

        for (let i = 0; i < nodeCount; i++) {
            graph.addNode(i)
        }
    }, { minTime: 1 })
