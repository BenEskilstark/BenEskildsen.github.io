var Production = React.createClass({

    getInitialState: function() {
        return {
            currentLayer: 0,
            currentTransformations: this.props.rule.productions[0].transformations[0],
            currentMatrix: this.props.rule.productions[0].matrix,
        };
    },

    handleChange: function() {
        var scale = parseFloat(document.getElementById(
            "slider_production_" + this.props.rule.source.name + this.state.currentLayer + "_Scale").value / 10);
        var rotation = parseInt(document.getElementById(
            "slider_production_" + this.props.rule.source.name + this.state.currentLayer + "_Rotation").value);
        var transX = parseInt(document.getElementById(
            "slider_production_" + this.props.rule.source.name + this.state.currentLayer + "_TransX").value);
        var transY = parseInt(document.getElementById(
            "slider_production_" + this.props.rule.source.name + this.state.currentLayer + "_TransY").value);

        var currentTransformations = this.state.currentTransformations;
        currentTransformations.scale = scale;
        currentTransformations.rotation = rotation;
        currentTransformations.transX = transX;
        currentTransformations.transY = transY;

        var sin = Math.sin(rotation * Math.PI / 180);
        var cos = Math.cos(rotation * Math.PI / 180);
        var currentMatrix = this.state.currentMatrix;
        currentMatrix[0] = [scale * cos, scale * -sin, transX];
        currentMatrix[1] = [scale * sin, scale * cos, transY];
        currentMatrix[2] = [0, 0, 1];

        this.setState({currentTransformations: currentTransformations, currentMatrix: currentMatrix});
        this.props.handleProductionRulesChange(this.props.productionRules);
    },

    addLayer: function() {
        var select = document.getElementById("selectNewProductionLayer_" + this.props.name).value;

        var transformations = {scale: 1, rotation: 0, transX: 0, transY: 0};
        var matrix = makeEmptyMatrix();
        var newProduction = {
            primitive: this.props.primitives[select],
            transformations: [transformations],
            matrix: matrix
        }

        this.props.rule.productions.push(newProduction);
        this.setState(
            {
                currentLayer: this.props.rule.productions.length - 1,
                currentTransformations: transformations,
                currentMatrix: matrix
            },
            this.props.handleProductionRulesChange(this.props.productionRules)
        );
    },

    handleLayerSelect: function() {
        var select = document.getElementById("selectProductionLayer_" + this.props.name).value;
        var currentTransformations = this.props.rule.productions[select].transformations[0];
        var currentMatrix = this.props.rule.productions[select].matrix;
        this.setState({
            currentLayer: select,
            currentTransformations: currentTransformations,
            currentMatrix: currentMatrix
        });
    },

    handlePrimitiveSelect: function() {
        var select = document.getElementById("selectProductionPrimitive_" + this.props.name).value;
        this.props.rule.primitive = this.props.primitives[select];
        this.props.handleProductionRulesChange(this.props.productionRules);

    },

    renderLayerSelect: function(startValue) {
        var primitives = [];
        for (p in this.props.primitives) {
            primitives.push(this.props.primitives[p]);
        }

        var select = <select
            value={startValue}
            onChange={this.handleLayerSelect}
            id={"selectProductionLayer_" + this.props.name}>
                {this.props.rule.productions.map(function(production, i) {
                    return <option
                        value={i}
                        key={production.primitive.name + "_" + i}>
                            {production.primitive.name}
                        </option>
                })}
        </select>;

        return select;
    },

    renderNewLayerSelect: function(startValue) {
        var primitives = [];
        for (p in this.props.primitives) {
            primitives.push(this.props.primitives[p]);
        }

        var select = <select
            value={startValue}
            id={"selectNewProductionLayer_" + this.props.name}>
                {primitives.map(function(primitive) {
                    return <option
                        value={primitive.name}
                        key={primitive.name}>
                            {primitive.name}
                        </option>
                })}
        </select>;

        return select;
    },

    renderPrimitiveSelect: function(startValue) {
        var primitives = [];
        for (p in this.props.primitives) {
            primitives.push(this.props.primitives[p]);
        }

        var select = <select
            value={startValue}
            onChange={this.handlePrimitiveSelect}
            id={"selectProductionPrimitive_" + this.props.name}>
                {primitives.map(function(primitive) {
                    return <option
                        value={primitive.name}
                        key={primitive.name}>
                            {primitive.name}
                        </option>
                })}
        </select>;

        return select;
    },

    render: function() {
        var layer = this.renderLayerSelect(this.state.currentLayer);
        var newLayer = this.renderNewLayerSelect(this.props.currentLayer);

        return (
            <div className="primitive">
                <MiniCanvasProduction {...this.props}
                    rule={this.props.rule}
                    name={this.props.name} />
                <div className="productionRHS">
                    {"Current Symbol: "}
                    {layer}
                    <br />
                    <Slider
                        name={"Scale"}
                        id={"production_" + this.props.rule.source.name + this.state.currentLayer + "_Scale"}
                        min={0}
                        max={50}
                        isScale={true}
                        sliderValue={this.state.currentTransformations.scale * 10}
                        changeHandler={this.handleChange} />
                    <Slider
                        name={"Rotate"}
                        id={"production_" + this.props.rule.source.name + this.state.currentLayer + "_Rotation"}
                        min={-360}
                        max={360}
                        sliderValue={this.state.currentTransformations.rotation}
                        changeHandler={this.handleChange} />
                    <Slider
                        id={"production_" + this.props.rule.source.name + this.state.currentLayer + "_TransX"}
                        name={"Tran X"}
                        min={-100}
                        max={100}
                        sliderValue={this.state.currentTransformations.transX}
                        changeHandler={this.handleChange} />
                    <Slider
                        id={"production_" + this.props.rule.source.name + this.state.currentLayer + "_TransY"}
                        name={"Tran Y"}
                        min={-100}
                        max={100}
                        sliderValue={this.state.currentTransformations.transY}
                        changeHandler={this.handleChange} />
                    <button className={"fancyButton"}  onClick={this.addLayer}>
                        {"Add Symbol"}
                    </button>
                    {"Next Symbol: "}
                    {newLayer}
                </div>
            </div>
        );
    }
});
