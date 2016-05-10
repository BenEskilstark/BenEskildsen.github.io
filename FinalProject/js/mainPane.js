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
                    name: 'Tree',axiom: {"name":"leaf","primitive":{"name":"leaf","lines":[{"startX":-0.12335526315789025,"startY":1.973684210526315,"endX":-5.057565789473685,"endY":-10.85526315789474},{"startX":-5.057565789473685,"startY":-10.85526315789474,"endX":-6.044407894736835,"endY":-23.684210526315788},{"startX":-6.044407894736835,"startY":-23.684210526315788,"endX":3.82401315789474,"endY":-28.618421052631582},{"startX":3.82401315789474,"startY":-28.618421052631582,"endX":14.67927631578948,"endY":-25.657894736842103},{"startX":14.67927631578948,"startY":-25.657894736842103,"endX":12.705592105263165,"endY":-14.80263157894737},{"startX":12.705592105263165,"startY":-14.80263157894737,"endX":5.797697368421055,"endY":-4.934210526315795},{"startX":5.797697368421055,"startY":-4.934210526315795,"endX":-0.12335526315789025,"endY":1.973684210526315}],"color":"green"},"transformations":[{"scale":1,"rotation":0,"transX":500,"transY":700}],"matrix":[[1,0,500],[0,1,700],[0,0,1]]},primitives: {"branch":{"name":"branch","lines":[{"startX":-0.12335526315789025,"startY":24.671052631578945,"endX":-0.12335526315789025,"endY":15.78947368421052},{"startX":-0.12335526315789025,"startY":15.78947368421052,"endX":-0.12335526315789025,"endY":6.90789473684211},{"startX":-0.12335526315789025,"startY":6.90789473684211,"endX":-0.12335526315789025,"endY":-2.9605263157894797}],"color":"brown"},"leaf":{"name":"leaf","lines":[{"startX":-0.12335526315789025,"startY":1.973684210526315,"endX":-5.057565789473685,"endY":-10.85526315789474},{"startX":-5.057565789473685,"startY":-10.85526315789474,"endX":-6.044407894736835,"endY":-23.684210526315788},{"startX":-6.044407894736835,"startY":-23.684210526315788,"endX":3.82401315789474,"endY":-28.618421052631582},{"startX":3.82401315789474,"startY":-28.618421052631582,"endX":14.67927631578948,"endY":-25.657894736842103},{"startX":14.67927631578948,"startY":-25.657894736842103,"endX":12.705592105263165,"endY":-14.80263157894737},{"startX":12.705592105263165,"startY":-14.80263157894737,"endX":5.797697368421055,"endY":-4.934210526315795},{"startX":5.797697368421055,"startY":-4.934210526315795,"endX":-0.12335526315789025,"endY":1.973684210526315}],"color":"green"}},productionRules: {"branch":[{"source":{"name":"branch","lines":[{"startX":0,"startY":30,"endX":0,"endY":0}],"color":"brown"},"productions":[{"primitive":{"name":"branch","lines":[{"startX":0,"startY":30,"endX":0,"endY":0}],"color":"brown"},"transformations":[{"scale":1,"rotation":0,"transX":0,"transY":0}],"matrix":[[1,0,0],[0,1,0],[0,0,1]]}]}],"leaf":[{"source":{"name":"leaf","lines":[{"startX":0,"startY":0,"endX":13,"endY":-25},{"startX":-13,"startY":-25,"endX":0,"endY":-50},{"startX":0,"startY":0,"endX":-13,"endY":-25},{"startX":13,"startY":-25,"endX":0,"endY":-50}],"color":"green"},"productions":[{"primitive":{"name":"leaf","lines":[{"startX":0,"startY":0,"endX":13,"endY":-25},{"startX":-13,"startY":-25,"endX":0,"endY":-50},{"startX":0,"startY":0,"endX":-13,"endY":-25},{"startX":13,"startY":-25,"endX":0,"endY":-50}],"color":"green"},"transformations":[{"scale":1,"rotation":-20,"transX":0,"transY":-25}],"matrix":[[0.9396926207859084,0.3420201433256687,0],[-0.3420201433256687,0.9396926207859084,-25],[0,0,1]]},{"primitive":{"name":"branch","lines":[{"startX":-0.12335526315789025,"startY":24.671052631578945,"endX":-0.12335526315789025,"endY":15.78947368421052},{"startX":-0.12335526315789025,"startY":15.78947368421052,"endX":-0.12335526315789025,"endY":6.90789473684211},{"startX":-0.12335526315789025,"startY":6.90789473684211,"endX":-0.12335526315789025,"endY":-2.9605263157894797}],"color":"brown"},"transformations":[{"scale":1,"rotation":0,"transX":0,"transY":-25}],"matrix":[[1,0,0],[0,1,-25],[0,0,1]]},{"primitive":{"name":"leaf","lines":[{"startX":-0.12335526315789025,"startY":1.973684210526315,"endX":-5.057565789473685,"endY":-10.85526315789474},{"startX":-5.057565789473685,"startY":-10.85526315789474,"endX":-6.044407894736835,"endY":-23.684210526315788},{"startX":-6.044407894736835,"startY":-23.684210526315788,"endX":3.82401315789474,"endY":-28.618421052631582},{"startX":3.82401315789474,"startY":-28.618421052631582,"endX":14.67927631578948,"endY":-25.657894736842103},{"startX":14.67927631578948,"startY":-25.657894736842103,"endX":12.705592105263165,"endY":-14.80263157894737},{"startX":12.705592105263165,"startY":-14.80263157894737,"endX":5.797697368421055,"endY":-4.934210526315795},{"startX":5.797697368421055,"startY":-4.934210526315795,"endX":-0.12335526315789025,"endY":1.973684210526315}],"color":"green"},"transformations":[{"scale":1,"rotation":20,"transX":0,"transY":-25}],"matrix":[[0.9396926207859084,-0.3420201433256687,0],[0.3420201433256687,0.9396926207859084,-25],[0,0,1]]}]}]}
                },
                {
                        name: 'Ant Hill',axiom: {"name":"tunnel1","primitive":{"name":"tunnel1","lines":[{"startX":-24.794407894736842,"startY":-49.34210526315789,"endX":-24.794407894736842,"endY":-38.48684210526316},{"startX":-24.794407894736842,"startY":-38.48684210526316,"endX":-24.794407894736842,"endY":-18.75},{"startX":-24.794407894736842,"startY":-18.75,"endX":-24.794407894736842,"endY":-1.973684210526315},{"startX":-24.794407894736842,"startY":-1.973684210526315,"endX":-24.794407894736842,"endY":8.881578947368425},{"startX":-24.794407894736842,"startY":8.881578947368425,"endX":-24.794407894736842,"endY":17.763157894736835},{"startX":23.56085526315789,"startY":-49.34210526315789,"endX":23.56085526315789,"endY":-38.48684210526316},{"startX":23.56085526315789,"startY":-38.48684210526316,"endX":23.56085526315789,"endY":-15.789473684210527},{"startX":23.56085526315789,"startY":-15.789473684210527,"endX":23.56085526315789,"endY":5.921052631578945},{"startX":23.56085526315789,"startY":5.921052631578945,"endX":26.52138157894737,"endY":25.65789473684211},{"startX":-23.807565789473685,"startY":6.90789473684211,"endX":-23.807565789473685,"endY":22.69736842105263},{"startX":-23.807565789473685,"startY":22.69736842105263,"endX":-24.794407894736842,"endY":36.513157894736835},{"startX":-24.794407894736842,"startY":36.513157894736835,"endX":-25.78125,"endY":47.368421052631575},{"startX":24.547697368421055,"startY":19.736842105263165,"endX":24.547697368421055,"endY":34.53947368421052},{"startX":24.547697368421055,"startY":34.53947368421052,"endX":24.547697368421055,"endY":46.381578947368425}],"color":"brown"},"transformations":[{"scale":1,"rotation":0,"transX":460,"transY":60}],"matrix":[[1,0,460],[0,1,60],[0,0,1]]},primitives: {"tunnel1":{"name":"tunnel1","lines":[{"startX":-24.794407894736842,"startY":-49.34210526315789,"endX":-24.794407894736842,"endY":-38.48684210526316},{"startX":-24.794407894736842,"startY":-38.48684210526316,"endX":-24.794407894736842,"endY":-18.75},{"startX":-24.794407894736842,"startY":-18.75,"endX":-24.794407894736842,"endY":-1.973684210526315},{"startX":-24.794407894736842,"startY":-1.973684210526315,"endX":-24.794407894736842,"endY":8.881578947368425},{"startX":-24.794407894736842,"startY":8.881578947368425,"endX":-24.794407894736842,"endY":17.763157894736835},{"startX":23.56085526315789,"startY":-49.34210526315789,"endX":23.56085526315789,"endY":-38.48684210526316},{"startX":23.56085526315789,"startY":-38.48684210526316,"endX":23.56085526315789,"endY":-15.789473684210527},{"startX":23.56085526315789,"startY":-15.789473684210527,"endX":23.56085526315789,"endY":5.921052631578945},{"startX":23.56085526315789,"startY":5.921052631578945,"endX":26.52138157894737,"endY":25.65789473684211},{"startX":-23.807565789473685,"startY":6.90789473684211,"endX":-23.807565789473685,"endY":22.69736842105263},{"startX":-23.807565789473685,"startY":22.69736842105263,"endX":-24.794407894736842,"endY":36.513157894736835},{"startX":-24.794407894736842,"startY":36.513157894736835,"endX":-25.78125,"endY":47.368421052631575},{"startX":24.547697368421055,"startY":19.736842105263165,"endX":24.547697368421055,"endY":34.53947368421052},{"startX":24.547697368421055,"startY":34.53947368421052,"endX":24.547697368421055,"endY":46.381578947368425}],"color":"brown"},"tunnel2":{"name":"tunnel2","lines":[{"startX":-23.807565789473685,"startY":-47.368421052631575,"endX":-23.807565789473685,"endY":-26.64473684210526},{"startX":-23.807565789473685,"startY":-26.64473684210526,"endX":-23.807565789473685,"endY":-8.881578947368425},{"startX":-23.807565789473685,"startY":-8.881578947368425,"endX":-22.820723684210527,"endY":6.90789473684211},{"startX":-22.820723684210527,"startY":6.90789473684211,"endX":-22.820723684210527,"endY":18.75},{"startX":-22.820723684210527,"startY":18.75,"endX":-26.768092105263158,"endY":38.486842105263165},{"startX":26.52138157894737,"startY":-47.368421052631575,"endX":26.52138157894737,"endY":-35.526315789473685},{"startX":26.52138157894737,"startY":-35.526315789473685,"endX":26.52138157894737,"endY":-8.881578947368425},{"startX":26.52138157894737,"startY":-8.881578947368425,"endX":26.52138157894737,"endY":8.881578947368425},{"startX":26.52138157894737,"startY":8.881578947368425,"endX":25.534539473684205,"endY":23.684210526315795},{"startX":25.534539473684205,"startY":23.684210526315795,"endX":24.547697368421055,"endY":38.486842105263165},{"startX":24.547697368421055,"startY":38.486842105263165,"endX":23.56085526315789,"endY":47.368421052631575}],"color":"brown"},"fork":{"name":"fork","lines":[{"startX":-24.794407894736842,"startY":-47.368421052631575,"endX":-24.794407894736842,"endY":-37.5},{"startX":-24.794407894736842,"startY":-37.5,"endX":-26.768092105263158,"endY":-28.618421052631582},{"startX":-26.768092105263158,"startY":-28.618421052631582,"endX":-28.741776315789473,"endY":-11.842105263157897},{"startX":-28.741776315789473,"startY":-11.842105263157897,"endX":-34.66282894736842,"endY":-4.934210526315795},{"startX":-34.66282894736842,"startY":-4.934210526315795,"endX":-42.557565789473685,"endY":5.921052631578945},{"startX":-42.557565789473685,"startY":5.921052631578945,"endX":-55.38651315789474,"endY":15.78947368421052},{"startX":-55.38651315789474,"startY":15.78947368421052,"endX":-66.24177631578948,"endY":19.736842105263165},{"startX":23.56085526315789,"startY":-48.35526315789474,"endX":23.56085526315789,"endY":-35.526315789473685},{"startX":23.56085526315789,"startY":-35.526315789473685,"endX":23.56085526315789,"endY":-21.710526315789473},{"startX":23.56085526315789,"startY":-21.710526315789473,"endX":25.534539473684205,"endY":-4.934210526315795},{"startX":25.534539473684205,"startY":-4.934210526315795,"endX":31.455592105263165,"endY":3.94736842105263},{"startX":31.455592105263165,"startY":3.94736842105263,"endX":40.337171052631575,"endY":8.881578947368425},{"startX":40.337171052631575,"startY":8.881578947368425,"endX":51.192434210526315,"endY":15.78947368421052},{"startX":51.192434210526315,"startY":15.78947368421052,"endX":64.02138157894737,"endY":21.71052631578948},{"startX":-23.807565789473685,"startY":49.34210526315789,"endX":-9.99177631578948,"endY":42.434210526315795},{"startX":-9.99177631578948,"startY":42.434210526315795,"endX":4.81085526315789,"endY":41.44736842105263},{"startX":4.81085526315789,"startY":41.44736842105263,"endX":16.652960526315795,"endY":41.44736842105263},{"startX":21.587171052631575,"startY":52.30263157894737,"endX":16.652960526315795,"endY":42.434210526315795}],"color":"brown"}},productionRules: {"tunnel1":[{"source":{"name":"tunnel1","lines":[{"startX":-24.794407894736842,"startY":-49.34210526315789,"endX":-24.794407894736842,"endY":-38.48684210526316},{"startX":-24.794407894736842,"startY":-38.48684210526316,"endX":-24.794407894736842,"endY":-18.75},{"startX":-24.794407894736842,"startY":-18.75,"endX":-24.794407894736842,"endY":-1.973684210526315},{"startX":-24.794407894736842,"startY":-1.973684210526315,"endX":-24.794407894736842,"endY":8.881578947368425},{"startX":-24.794407894736842,"startY":8.881578947368425,"endX":-24.794407894736842,"endY":17.763157894736835},{"startX":23.56085526315789,"startY":-49.34210526315789,"endX":23.56085526315789,"endY":-38.48684210526316},{"startX":23.56085526315789,"startY":-38.48684210526316,"endX":23.56085526315789,"endY":-15.789473684210527},{"startX":23.56085526315789,"startY":-15.789473684210527,"endX":23.56085526315789,"endY":5.921052631578945},{"startX":23.56085526315789,"startY":5.921052631578945,"endX":26.52138157894737,"endY":25.65789473684211},{"startX":-23.807565789473685,"startY":6.90789473684211,"endX":-23.807565789473685,"endY":22.69736842105263},{"startX":-23.807565789473685,"startY":22.69736842105263,"endX":-24.794407894736842,"endY":36.513157894736835},{"startX":-24.794407894736842,"startY":36.513157894736835,"endX":-25.78125,"endY":47.368421052631575},{"startX":24.547697368421055,"startY":19.736842105263165,"endX":24.547697368421055,"endY":34.53947368421052},{"startX":24.547697368421055,"startY":34.53947368421052,"endX":24.547697368421055,"endY":46.381578947368425}],"color":"brown"},"productions":[{"primitive":{"name":"tunnel1","lines":[{"startX":-24.794407894736842,"startY":-49.34210526315789,"endX":-24.794407894736842,"endY":-38.48684210526316},{"startX":-24.794407894736842,"startY":-38.48684210526316,"endX":-24.794407894736842,"endY":-18.75},{"startX":-24.794407894736842,"startY":-18.75,"endX":-24.794407894736842,"endY":-1.973684210526315},{"startX":-24.794407894736842,"startY":-1.973684210526315,"endX":-24.794407894736842,"endY":8.881578947368425},{"startX":-24.794407894736842,"startY":8.881578947368425,"endX":-24.794407894736842,"endY":17.763157894736835},{"startX":23.56085526315789,"startY":-49.34210526315789,"endX":23.56085526315789,"endY":-38.48684210526316},{"startX":23.56085526315789,"startY":-38.48684210526316,"endX":23.56085526315789,"endY":-15.789473684210527},{"startX":23.56085526315789,"startY":-15.789473684210527,"endX":23.56085526315789,"endY":5.921052631578945},{"startX":23.56085526315789,"startY":5.921052631578945,"endX":26.52138157894737,"endY":25.65789473684211},{"startX":-23.807565789473685,"startY":6.90789473684211,"endX":-23.807565789473685,"endY":22.69736842105263},{"startX":-23.807565789473685,"startY":22.69736842105263,"endX":-24.794407894736842,"endY":36.513157894736835},{"startX":-24.794407894736842,"startY":36.513157894736835,"endX":-25.78125,"endY":47.368421052631575},{"startX":24.547697368421055,"startY":19.736842105263165,"endX":24.547697368421055,"endY":34.53947368421052},{"startX":24.547697368421055,"startY":34.53947368421052,"endX":24.547697368421055,"endY":46.381578947368425}],"color":"brown"},"transformations":[{"scale":1,"rotation":0,"transX":0,"transY":0}],"matrix":[[1,0,0],[0,1,0],[0,0,1]]},{"primitive":{"name":"tunnel2","lines":[{"startX":-23.807565789473685,"startY":-47.368421052631575,"endX":-23.807565789473685,"endY":-26.64473684210526},{"startX":-23.807565789473685,"startY":-26.64473684210526,"endX":-23.807565789473685,"endY":-8.881578947368425},{"startX":-23.807565789473685,"startY":-8.881578947368425,"endX":-22.820723684210527,"endY":6.90789473684211},{"startX":-22.820723684210527,"startY":6.90789473684211,"endX":-22.820723684210527,"endY":18.75},{"startX":-22.820723684210527,"startY":18.75,"endX":-26.768092105263158,"endY":38.486842105263165},{"startX":26.52138157894737,"startY":-47.368421052631575,"endX":26.52138157894737,"endY":-35.526315789473685},{"startX":26.52138157894737,"startY":-35.526315789473685,"endX":26.52138157894737,"endY":-8.881578947368425},{"startX":26.52138157894737,"startY":-8.881578947368425,"endX":26.52138157894737,"endY":8.881578947368425},{"startX":26.52138157894737,"startY":8.881578947368425,"endX":25.534539473684205,"endY":23.684210526315795},{"startX":25.534539473684205,"startY":23.684210526315795,"endX":24.547697368421055,"endY":38.486842105263165},{"startX":24.547697368421055,"startY":38.486842105263165,"endX":23.56085526315789,"endY":47.368421052631575}],"color":"brown"},"transformations":[{"scale":1,"rotation":0,"transX":0,"transY":91}],"matrix":[[1,0,0],[0,1,91],[0,0,1]]}]}],"tunnel2":[{"source":{"name":"tunnel2","lines":[{"startX":-23.807565789473685,"startY":-47.368421052631575,"endX":-23.807565789473685,"endY":-26.64473684210526},{"startX":-23.807565789473685,"startY":-26.64473684210526,"endX":-23.807565789473685,"endY":-8.881578947368425},{"startX":-23.807565789473685,"startY":-8.881578947368425,"endX":-22.820723684210527,"endY":6.90789473684211},{"startX":-22.820723684210527,"startY":6.90789473684211,"endX":-22.820723684210527,"endY":18.75},{"startX":-22.820723684210527,"startY":18.75,"endX":-26.768092105263158,"endY":38.486842105263165},{"startX":26.52138157894737,"startY":-47.368421052631575,"endX":26.52138157894737,"endY":-35.526315789473685},{"startX":26.52138157894737,"startY":-35.526315789473685,"endX":26.52138157894737,"endY":-8.881578947368425},{"startX":26.52138157894737,"startY":-8.881578947368425,"endX":26.52138157894737,"endY":8.881578947368425},{"startX":26.52138157894737,"startY":8.881578947368425,"endX":25.534539473684205,"endY":23.684210526315795},{"startX":25.534539473684205,"startY":23.684210526315795,"endX":24.547697368421055,"endY":38.486842105263165},{"startX":24.547697368421055,"startY":38.486842105263165,"endX":23.56085526315789,"endY":47.368421052631575}],"color":"brown"},"productions":[{"primitive":{"name":"tunnel2","lines":[{"startX":-23.807565789473685,"startY":-47.368421052631575,"endX":-23.807565789473685,"endY":-26.64473684210526},{"startX":-23.807565789473685,"startY":-26.64473684210526,"endX":-23.807565789473685,"endY":-8.881578947368425},{"startX":-23.807565789473685,"startY":-8.881578947368425,"endX":-22.820723684210527,"endY":6.90789473684211},{"startX":-22.820723684210527,"startY":6.90789473684211,"endX":-22.820723684210527,"endY":18.75},{"startX":-22.820723684210527,"startY":18.75,"endX":-26.768092105263158,"endY":38.486842105263165},{"startX":26.52138157894737,"startY":-47.368421052631575,"endX":26.52138157894737,"endY":-35.526315789473685},{"startX":26.52138157894737,"startY":-35.526315789473685,"endX":26.52138157894737,"endY":-8.881578947368425},{"startX":26.52138157894737,"startY":-8.881578947368425,"endX":26.52138157894737,"endY":8.881578947368425},{"startX":26.52138157894737,"startY":8.881578947368425,"endX":25.534539473684205,"endY":23.684210526315795},{"startX":25.534539473684205,"startY":23.684210526315795,"endX":24.547697368421055,"endY":38.486842105263165},{"startX":24.547697368421055,"startY":38.486842105263165,"endX":23.56085526315789,"endY":47.368421052631575}],"color":"brown"},"transformations":[{"scale":1,"rotation":0,"transX":0,"transY":0}],"matrix":[[1,0,0],[0,1,0],[0,0,1]]},{"primitive":{"name":"fork","lines":[{"startX":-24.794407894736842,"startY":-47.368421052631575,"endX":-24.794407894736842,"endY":-37.5},{"startX":-24.794407894736842,"startY":-37.5,"endX":-26.768092105263158,"endY":-28.618421052631582},{"startX":-26.768092105263158,"startY":-28.618421052631582,"endX":-28.741776315789473,"endY":-11.842105263157897},{"startX":-28.741776315789473,"startY":-11.842105263157897,"endX":-34.66282894736842,"endY":-4.934210526315795},{"startX":-34.66282894736842,"startY":-4.934210526315795,"endX":-42.557565789473685,"endY":5.921052631578945},{"startX":-42.557565789473685,"startY":5.921052631578945,"endX":-55.38651315789474,"endY":15.78947368421052},{"startX":-55.38651315789474,"startY":15.78947368421052,"endX":-66.24177631578948,"endY":19.736842105263165},{"startX":23.56085526315789,"startY":-48.35526315789474,"endX":23.56085526315789,"endY":-35.526315789473685},{"startX":23.56085526315789,"startY":-35.526315789473685,"endX":23.56085526315789,"endY":-21.710526315789473},{"startX":23.56085526315789,"startY":-21.710526315789473,"endX":25.534539473684205,"endY":-4.934210526315795},{"startX":25.534539473684205,"startY":-4.934210526315795,"endX":31.455592105263165,"endY":3.94736842105263},{"startX":31.455592105263165,"startY":3.94736842105263,"endX":40.337171052631575,"endY":8.881578947368425},{"startX":40.337171052631575,"startY":8.881578947368425,"endX":51.192434210526315,"endY":15.78947368421052},{"startX":51.192434210526315,"startY":15.78947368421052,"endX":64.02138157894737,"endY":21.71052631578948},{"startX":-23.807565789473685,"startY":49.34210526315789,"endX":-9.99177631578948,"endY":42.434210526315795},{"startX":-9.99177631578948,"startY":42.434210526315795,"endX":4.81085526315789,"endY":41.44736842105263},{"startX":4.81085526315789,"startY":41.44736842105263,"endX":16.652960526315795,"endY":41.44736842105263},{"startX":21.587171052631575,"startY":52.30263157894737,"endX":16.652960526315795,"endY":42.434210526315795}],"color":"brown"},"transformations":[{"scale":1,"rotation":0,"transX":0,"transY":88}],"matrix":[[1,0,0],[0,1,88],[0,0,1]]}]}],"fork":[{"source":{"name":"fork","lines":[{"startX":-24.794407894736842,"startY":-47.368421052631575,"endX":-24.794407894736842,"endY":-37.5},{"startX":-24.794407894736842,"startY":-37.5,"endX":-26.768092105263158,"endY":-28.618421052631582},{"startX":-26.768092105263158,"startY":-28.618421052631582,"endX":-28.741776315789473,"endY":-11.842105263157897},{"startX":-28.741776315789473,"startY":-11.842105263157897,"endX":-34.66282894736842,"endY":-4.934210526315795},{"startX":-34.66282894736842,"startY":-4.934210526315795,"endX":-42.557565789473685,"endY":5.921052631578945},{"startX":-42.557565789473685,"startY":5.921052631578945,"endX":-55.38651315789474,"endY":15.78947368421052},{"startX":-55.38651315789474,"startY":15.78947368421052,"endX":-66.24177631578948,"endY":19.736842105263165},{"startX":23.56085526315789,"startY":-48.35526315789474,"endX":23.56085526315789,"endY":-35.526315789473685},{"startX":23.56085526315789,"startY":-35.526315789473685,"endX":23.56085526315789,"endY":-21.710526315789473},{"startX":23.56085526315789,"startY":-21.710526315789473,"endX":25.534539473684205,"endY":-4.934210526315795},{"startX":25.534539473684205,"startY":-4.934210526315795,"endX":31.455592105263165,"endY":3.94736842105263},{"startX":31.455592105263165,"startY":3.94736842105263,"endX":40.337171052631575,"endY":8.881578947368425},{"startX":40.337171052631575,"startY":8.881578947368425,"endX":51.192434210526315,"endY":15.78947368421052},{"startX":51.192434210526315,"startY":15.78947368421052,"endX":64.02138157894737,"endY":21.71052631578948},{"startX":-23.807565789473685,"startY":49.34210526315789,"endX":-9.99177631578948,"endY":42.434210526315795},{"startX":-9.99177631578948,"startY":42.434210526315795,"endX":4.81085526315789,"endY":41.44736842105263},{"startX":4.81085526315789,"startY":41.44736842105263,"endX":16.652960526315795,"endY":41.44736842105263},{"startX":21.587171052631575,"startY":52.30263157894737,"endX":16.652960526315795,"endY":42.434210526315795}],"color":"brown"},"productions":[{"primitive":{"name":"fork","lines":[{"startX":-24.794407894736842,"startY":-47.368421052631575,"endX":-24.794407894736842,"endY":-37.5},{"startX":-24.794407894736842,"startY":-37.5,"endX":-26.768092105263158,"endY":-28.618421052631582},{"startX":-26.768092105263158,"startY":-28.618421052631582,"endX":-28.741776315789473,"endY":-11.842105263157897},{"startX":-28.741776315789473,"startY":-11.842105263157897,"endX":-34.66282894736842,"endY":-4.934210526315795},{"startX":-34.66282894736842,"startY":-4.934210526315795,"endX":-42.557565789473685,"endY":5.921052631578945},{"startX":-42.557565789473685,"startY":5.921052631578945,"endX":-55.38651315789474,"endY":15.78947368421052},{"startX":-55.38651315789474,"startY":15.78947368421052,"endX":-66.24177631578948,"endY":19.736842105263165},{"startX":23.56085526315789,"startY":-48.35526315789474,"endX":23.56085526315789,"endY":-35.526315789473685},{"startX":23.56085526315789,"startY":-35.526315789473685,"endX":23.56085526315789,"endY":-21.710526315789473},{"startX":23.56085526315789,"startY":-21.710526315789473,"endX":25.534539473684205,"endY":-4.934210526315795},{"startX":25.534539473684205,"startY":-4.934210526315795,"endX":31.455592105263165,"endY":3.94736842105263},{"startX":31.455592105263165,"startY":3.94736842105263,"endX":40.337171052631575,"endY":8.881578947368425},{"startX":40.337171052631575,"startY":8.881578947368425,"endX":51.192434210526315,"endY":15.78947368421052},{"startX":51.192434210526315,"startY":15.78947368421052,"endX":64.02138157894737,"endY":21.71052631578948},{"startX":-23.807565789473685,"startY":49.34210526315789,"endX":-9.99177631578948,"endY":42.434210526315795},{"startX":-9.99177631578948,"startY":42.434210526315795,"endX":4.81085526315789,"endY":41.44736842105263},{"startX":4.81085526315789,"startY":41.44736842105263,"endX":16.652960526315795,"endY":41.44736842105263},{"startX":21.587171052631575,"startY":52.30263157894737,"endX":16.652960526315795,"endY":42.434210526315795}],"color":"brown"},"transformations":[{"scale":1,"rotation":0,"transX":0,"transY":0}],"matrix":[[1,0,0],[0,1,0],[0,0,1]]},{"primitive":{"name":"tunnel1","lines":[{"startX":-24.794407894736842,"startY":-49.34210526315789,"endX":-24.794407894736842,"endY":-38.48684210526316},{"startX":-24.794407894736842,"startY":-38.48684210526316,"endX":-24.794407894736842,"endY":-18.75},{"startX":-24.794407894736842,"startY":-18.75,"endX":-24.794407894736842,"endY":-1.973684210526315},{"startX":-24.794407894736842,"startY":-1.973684210526315,"endX":-24.794407894736842,"endY":8.881578947368425},{"startX":-24.794407894736842,"startY":8.881578947368425,"endX":-24.794407894736842,"endY":17.763157894736835},{"startX":23.56085526315789,"startY":-49.34210526315789,"endX":23.56085526315789,"endY":-38.48684210526316},{"startX":23.56085526315789,"startY":-38.48684210526316,"endX":23.56085526315789,"endY":-15.789473684210527},{"startX":23.56085526315789,"startY":-15.789473684210527,"endX":23.56085526315789,"endY":5.921052631578945},{"startX":23.56085526315789,"startY":5.921052631578945,"endX":26.52138157894737,"endY":25.65789473684211},{"startX":-23.807565789473685,"startY":6.90789473684211,"endX":-23.807565789473685,"endY":22.69736842105263},{"startX":-23.807565789473685,"startY":22.69736842105263,"endX":-24.794407894736842,"endY":36.513157894736835},{"startX":-24.794407894736842,"startY":36.513157894736835,"endX":-25.78125,"endY":47.368421052631575},{"startX":24.547697368421055,"startY":19.736842105263165,"endX":24.547697368421055,"endY":34.53947368421052},{"startX":24.547697368421055,"startY":34.53947368421052,"endX":24.547697368421055,"endY":46.381578947368425}],"color":"brown"},"transformations":[{"scale":1,"rotation":49,"transX":-75,"transY":64}],"matrix":[[0.6560590289905073,-0.754709580222772,-75],[0.754709580222772,0.6560590289905073,64],[0,0,1]]},{"primitive":{"name":"tunnel2","lines":[{"startX":-23.807565789473685,"startY":-47.368421052631575,"endX":-23.807565789473685,"endY":-26.64473684210526},{"startX":-23.807565789473685,"startY":-26.64473684210526,"endX":-23.807565789473685,"endY":-8.881578947368425},{"startX":-23.807565789473685,"startY":-8.881578947368425,"endX":-22.820723684210527,"endY":6.90789473684211},{"startX":-22.820723684210527,"startY":6.90789473684211,"endX":-22.820723684210527,"endY":18.75},{"startX":-22.820723684210527,"startY":18.75,"endX":-26.768092105263158,"endY":38.486842105263165},{"startX":26.52138157894737,"startY":-47.368421052631575,"endX":26.52138157894737,"endY":-35.526315789473685},{"startX":26.52138157894737,"startY":-35.526315789473685,"endX":26.52138157894737,"endY":-8.881578947368425},{"startX":26.52138157894737,"startY":-8.881578947368425,"endX":26.52138157894737,"endY":8.881578947368425},{"startX":26.52138157894737,"startY":8.881578947368425,"endX":25.534539473684205,"endY":23.684210526315795},{"startX":25.534539473684205,"startY":23.684210526315795,"endX":24.547697368421055,"endY":38.486842105263165},{"startX":24.547697368421055,"startY":38.486842105263165,"endX":23.56085526315789,"endY":47.368421052631575}],"color":"brown"},"transformations":[{"scale":1,"rotation":-39,"transX":68,"transY":72}],"matrix":[[0.7771459614569709,0.6293203910498374,68],[-0.6293203910498374,0.7771459614569709,72],[0,0,1]]}]}]}
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
