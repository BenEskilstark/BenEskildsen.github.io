var PRIMITIVES = {
    triangle: {
        name: "triangle",
        lines: [{startX: -30, startY: 0, endX: 30, endY: 0},
                {startX: -30, startY: 0, endX: 0, endY: -60},
                {startX: 30, startY: 0, endX: 0, endY: -60}],
        color: "black"
    },

    branch: {
        name: "branch",
        lines: [{startX: 0, startY: 30, endX: 0, endY: 0}],
        color: "brown"
    },

    leaf: {
        name: "leaf",
        lines: [{startX: 0, startY: 0, endX: 13, endY: -25},
                {startX: -13, startY: -25, endX: 0, endY: -50},
                {startX: 0, startY: 0, endX: -13, endY: -25},
                {startX: 13, startY: -25, endX: 0, endY: -50}],
        color: "green"
    },
}
