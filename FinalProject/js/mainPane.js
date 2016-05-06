var MainPane = React.createClass({

    getDefaultProps: function() {
        return {
            patterns: [
                {
                    name: "Sierpinski",
                    axiom: {
                        primitive: PRIMITIVES.triangle,
                        transformations: [{scale: 5, rotation: 0, transX: 500, transY: 350}],
                        matrix: [[5, 0, 500], [0, 5, 350], [0, 0, 1]]
                    },
                    primitives: {triangle: PRIMITIVES.triangle},
                    productionRules: {
                        triangle: [{
                            source: PRIMITIVES.triangle,
                            productions: [
                                {
                                    primitive: PRIMITIVES.triangle,
                                    transformations: [{scale: 0.5, rotation: 0, transX: 15, transY: 0}],
                                    matrix: [[0.5, 0, 15], [0, 0.5, 0], [0, 0, 1]]
                                },
                                {
                                    primitive: PRIMITIVES.triangle,
                                    transformations: [{scale: 0.5, rotation: 0, transX: 0, transY: -30}],
                                    matrix: [[0.5, 0, 0], [0, 0.5, -30], [0, 0, 1]]
                                },
                                {
                                    primitive: PRIMITIVES.triangle,
                                    transformations: [{scale: 0.5, rotation: 0, transX: -15, transY: 0}],
                                    matrix: [[0.5, 0, -15], [0, 0.5, 0], [0, 0, 1]]
                                },
                            ]
                        }]
                    }
                },
                {
                    name: "Tree",axiom: {"primitive":{"name":"branch","lines":[{"startX":0,"startY":30,"endX":0,"endY":0}],"color":"brown"},"transformations":[{"scale":1,"rotation":0,"transX":500,"transY":730}],"matrix":[[1,0,500],[0,1,730],[0,0,1]]},primitives: {"branch":{"name":"branch","lines":[{"startX":0,"startY":30,"endX":0,"endY":0}],"color":"brown"},"leaf":{"name":"leaf","lines":[{"startX":0,"startY":0,"endX":13,"endY":-25},{"startX":-13,"startY":-25,"endX":0,"endY":-50},{"startX":0,"startY":0,"endX":-13,"endY":-25},{"startX":13,"startY":-25,"endX":0,"endY":-50}],"color":"green"}},productionRules: {"branch":[{"source":{"name":"branch","lines":[{"startX":0,"startY":30,"endX":0,"endY":0}],"color":"brown"},"productions":[{"primitive":{"name":"branch","lines":[{"startX":0,"startY":30,"endX":0,"endY":0}],"color":"brown"},"transformations":[{"scale":1.6,"rotation":0,"transX":0,"transY":-18}],"matrix":[[1.6,0,0],[0,1.6,-18],[0,0,1]]}]}],"leaf":[{"source":{"name":"leaf","lines":[{"startX":0,"startY":0,"endX":13,"endY":-25},{"startX":-13,"startY":-25,"endX":0,"endY":-50},{"startX":0,"startY":0,"endX":-13,"endY":-25},{"startX":13,"startY":-25,"endX":0,"endY":-50}],"color":"green"},"productions":[{"primitive":{"name":"leaf","lines":[{"startX":0,"startY":0,"endX":13,"endY":-25},{"startX":-13,"startY":-25,"endX":0,"endY":-50},{"startX":0,"startY":0,"endX":-13,"endY":-25},{"startX":13,"startY":-25,"endX":0,"endY":-50}],"color":"green"},"transformations":[{"scale":1,"rotation":0,"transX":0,"transY":0}],"matrix":[[1,0,0],[0,1,0],[0,0,1]]}]}]}
                },
                {
                    name: "Blank",
                    axiom: {
                        primitive: PRIMITIVES.branch,
                        transformations: [{scale: 1, rotation: 0, transX: 500, transY: 350}],
                        matrix: [[1, 0, 500], [0, 1, 350], [0, 0, 1]]
                    },
                    primitives: {branch: PRIMITIVES.branch},
                    productionRules: {
                        branch: [{
                            source: PRIMITIVES.branch,
                            productions: [
                                {
                                    primitive: PRIMITIVES.branch,
                                    transformations: [{scale: 1, rotation: 0, transX: 0, transY: 0}],
                                    matrix: [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
                                }
                            ]
                        }]
                    }
                },
            ]
        };
    },

    patternToString: function() {
        var toPrint = "";
        toPrint += "name: '" + this.props.patterns[this.state.currentPattern].name;
        toPrint += "',axiom: " + JSON.stringify(this.state.axiom);
        toPrint += ",primitives: " + JSON.stringify(this.state.primitives);
        toPrint += ",productionRules: " + JSON.stringify(this.state.productionRules);
        console.log(toPrint);
    },

    getInitialState: function() {
        return {
            iterations: 0,
            maxIterations: 8,
            axiom: this.props.patterns[0].axiom,
            primitives: this.props.patterns[0].primitives,
            productionRules: this.props.patterns[0].productionRules,
            iterationProductions: [],
            play: false,
            step: 500,
            currentPattern: 0
        };
    },

    handlePatternSelect: function(nextPattern) {
        this.setState({
            currentPattern: nextPattern,
            axiom: this.props.patterns[nextPattern].axiom,
            primitives: this.props.patterns[nextPattern].primitives,
            productionRules: this.props.patterns[nextPattern].productionRules,
            iterationProductions: [],
        }, this.computeIterations);
    },

    playFunction: function() {
        if (this.state.play) {
            this.setState({iterations: (this.state.iterations + 1) % (this.state.maxIterations + 1)});
        }
    },

    componentDidMount: function() {
        this.interval = setInterval(this.playFunction, this.state.step);
    },

    componentWillUnmount: function() {
        clearInterval(this.interval);
    },

    handleSpeedChange: function(nextSpeed) {
        this.setState({step: nextSpeed}, function() {
            clearInterval(this.interval);
            this.interval = setInterval(this.playFunction, this.state.step);
        });
    },

    handlePlayClick: function() {
        this.setState({play: true});
    },

    handlePauseClick: function() {
        this.setState({play: false});
    },

    handleMaxIterationsChange: function(nextIterations) {
        this.setState({maxIterations: nextIterations}, this.computeIterations);
    },

    handleIterationsChange: function(nextIterations) {
        this.setState({iterations: nextIterations});
    },

    handleAxiomChange: function(nextAxiom) {
        if (nextAxiom !== this.state.axiom) {
            this.setState({axiom: nextAxiom}, this.computeIterations);
        }
    },

    handlePrimitivesChange: function(nextPrimitives) {
        this.setState({primitives: nextPrimitives});
    },

    handleProductionRulesChange: function(nextProductionRules) {
        this.setState({productionRules: nextProductionRules}, this.computeIterations);
    },

    componentWillMount: function() {
        this.computeIterations();
    },

    computeIterations: function(nextAxiom) {
        var axiom = nextAxiom || this.state.axiom;
        var iterations = [];
        iterations.push([axiom]);

        // loop for filling out all the possible iterations ahead of time
        for (var i = 0; i < this.state.maxIterations; i++) {
            var nextProduction = [];
            // loop for figuring out which productions are in the next iteration by looking at the previous iteration
            for (var j = 0; j < iterations[i].length; j++) {
                var currentProduction = iterations[i][j];
                var productions = this.state.productionRules[currentProduction.primitive.name];
                if (!productions) {
                    console.log("Bad production: ", currentProduction);
                    return;
                }
                // loop for going through each of the production outputs of the previous iterations' production
                // This is the loop level for non-determinism or choices, etc.
                for (var k = 0; k < productions.length; k++) {
                    // loop for going through each of the primitives specified by a given production and actually
                    // adding them to the iterations
                    for (var m = 0; m < productions[k].productions.length; m++) {
                        var specificProduction = productions[k].productions[m];
                        var transformations = this.copyTransformations(currentProduction.transformations);
                        // transformations.push(this.copyTransformations(specificProduction.transformations)[0]);
                        nextProduction.push({
                            primitive: specificProduction.primitive,
                            transformations: transformations,
                            matrix: matrixProduct(currentProduction.matrix, specificProduction.matrix)
                        });
                    }
                }
            }
            iterations.push(nextProduction);
        }
        this.setState({iterationProductions: iterations});
    },

    copyTransformations: function(transformations) {
        var copy = [];
        for (var i = 0; i < transformations.length; i++) {
            var trans = transformations[i];
            copy.push({
                scale: trans.scale,
                rotation: trans.rotation,
                transX: trans.transX,
                transY: trans.transY
            });
        }
        return copy;
    },

    render: function() {
        return (
            <span>
                <CanvasPane
                    axiom={this.state.axiom}
                    iterations={this.state.iterations}
                    primitives={this.state.primitives}
                    iterationProductions={this.state.iterationProductions} />
                <SideBarPane
                    patterns={this.props.patterns}
                    patternToString={this.patternToString}
                    currentPattern={this.state.currentPattern}
                    handlePatternSelect={this.handlePatternSelect}
                    play={this.state.play}
                    step={this.state.step}
                    handleSpeedChange={this.handleSpeedChange}
                    handlePlayClick={this.handlePlayClick}
                    handlePauseClick={this.handlePauseClick}
                    iterations={this.state.iterations}
                    maxIterations={this.state.maxIterations}
                    handleIterationsChange={this.handleIterationsChange}
                    handleMaxIterationsChange={this.handleMaxIterationsChange}
                    axiom={this.state.axiom}
                    handleAxiomChange={this.handleAxiomChange}
                    primitives={this.state.primitives}
                    handlePrimitivesChange={this.handlePrimitivesChange}
                    productionRules={this.state.productionRules}
                    handleProductionRulesChange={this.handleProductionRulesChange} />
            </span>
        );
    }
});

function matrixProduct(m1, m2) {
    var result = makeEmptyMatrix();
    for (var row = 0; row < 3; row++) {
        for (var col = 0; col < 3; col++) {
            var sum = 0;
            for (var inner = 0; inner < 3; inner++) {
                sum += m1[row][inner] * m2[inner][col];
            }
            result[row][col] = sum;
        }
    }
    return result;
}

function makeEmptyMatrix() {
    return [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
}

React.render(<MainPane />, document.getElementById('container'));
