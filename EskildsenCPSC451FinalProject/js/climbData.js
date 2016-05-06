var NORTHFORTYROUTES = [
    {
        name: "1. Amarillo Sunset",
        urls: ["AmarilloSunset0.png", "AmarilloSunset1.png", "AmarilloSunset2.png", "AmarilloSunset3.png", "AmarilloSunset4.png", "AmarilloSunset5.png", "AmarilloSunset6.png", "AmarilloSunset7.png", "AmarilloSunset8.png"],
        difficulty: "5.11b",
        stars: 4,
        shortDescription: "Amazing Line. One of the best 5.11s in the Red. Pull through unique moves on large holds on an exposed wall.",
        longDescription: ""
    },
    {
        name: "2. Samurai",
        urls: ["40_7.png"],
        difficulty: "5.12b",
        stars: 4,
        shortDescription: "",
        longDescription: ""
    },
    {
        name: "3. Barbed Wire",
        urls: ["GenericRRG.png"],
        difficulty: "5.12b",
        stars: 3,
        shortDescription: "",
        longDescription: ""
    },
    {
        name: "4. Yosemite Sam",
        urls: ["yosemite_sam.png"],
        difficulty: "5.12a",
        stars: 3,
        shortDescription: "",
        longDescription: ""
    },
    {
        name: "5. Summer Breeze",
        urls: ["summer_breeze.png"],
        difficulty: "5.8",
        stars: 2,
        shortDescription: "",
        longDescription: ""
    },
];
//////////////////////////////////////////////////////////////////////////////////////////
// keeps the above list less cluttered, but these lists should never be referenced directly
var PMRPCRAGS = [
    {
        name: "Brightside",
        urls: ["GenericRRGTopo2.png"],
        shortDescription: "Sunny area in PMRP",
        longDescription: "",
        subRegions: []
    },
    {
        name: "Courtesy Wall",
        urls: ["GenericRRGTopo1.png"],
        shortDescription: "Gorgeous amphitheater home to one of the hardest climbs at The Red.",
        longDescription: "",
        subRegions: []
    },
    {
        name: "Curbside",
        urls: ["GenericRRGTopo3.png"],
        shortDescription: "",
        longDescription: "",
        subRegions: []
    },
    {
        name: "North 40",
        urls: ["North40topo.png", "40_1.png", "40_2.png", "40_3.png", "40_4.png", "40_5.png", "40_6.png", "40_7.png"],
        shortDescription: "North facing wall featuring a handful of subRegions, including the gorgeous Amarillo Sunset.",
        longDescription: "",
        subRegions: NORTHFORTYROUTES
    },
    {
        name: "Drive-By Crag",
        urls: ["GenericRRGTopo4.png"],
        shortDescription: "",
        longDescription: "",
        subRegions: []
    },
    {
        name: "Solar Collector",
        urls: ["GenericRRGTopo5.png"],
        shortDescription: "",
        longDescription: "",
        subRegions: []
    }
];

var AREAS = [
    {
        name: "Muir Valley",
        urls: ["MuirValleyTopo.png"],
        shortDescription: "",
        longDescription: "",
        subRegions: []
    },
    {
        name: "PMRP",
        urls: ["PMRPMap.png", "pmrp1.png", "pmrp2.png", "pmrp3.png", "pmrp4.png", "pmrp5.png", "40_3.png", "AmarilloSunset3.png"],
        shortDescription: "Another triumph of climber ownership, the Pendergrass-Murray Recreational Preserve is a 700-acre area in the southern section of the Red River Gorge. It is owned and maintained by the Red River Gorge Climbers' Coalition. More than 300 routes in 20 separate areas are available to climbers thanks to the efforts of the RRGCC. As with Muir Valley, the other major climber-owned section of Red River Gorge, climbers must sign a liability waiver before climbing in the PMRP.",
        longDescription: "",
        subRegions: PMRPCRAGS
    },
    {
        name: "Natural Bridge",
        urls: ["NaturalBridgeTopo.png"],
        shortDescription: "",
        longDescription: "",
        subRegions: []
    },
    {
        name: "Miller Fork",
        urls: ["MillerForkTopo.png"],
        shortDescription: "",
        longDescription: "",
        subRegions: []
    },
    {
        name: "North Gorge",
        urls: ["NorthGorgeTopo.png"],
        shortDescription: "",
        longDescription: "",
        subRegions: []
    }
];
