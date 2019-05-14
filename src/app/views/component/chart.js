var React = require('react');
var ZingChart = require('zingchart-react').core;
var LineChart = require('zingchart-react').line;
var BarChart = require('zingchart-react').bar;
var AreaChart = require('zingchart-react').area;
var ScatterChart = require('zingchart-react').scatter;
var PieChart = require('zingchart-react').pie;

var PieGraphs = React.createClass({
	render: function() {
		var config = this.props.config;
		var myConfig = {
		    "layout":"h",
		     "globals":{
		        "font-family":"Roboto"
		    },
		    "graphset":[
		        {
		            "type":"pie",
		            "background-color":"#fff",
		            "legend":{
		                "background-color":"none",
		                "border-width":0,
		                "shadow":false,
		                "layout":"float",
		                "marker":{
		                    "border-radius":3,
		                    "border-width":0
		                },
		                "item":{
		                    "color":"%backgroundcolor",
												"padding":0
		                },
										"margin-top":"85%",
										"margin-right":"auto"
		            },
		            "plotarea":{
		                "background-color":"#fff",
		                "border-color":"#DFE1E3",
		                "border-width":0,
		                "border-radius":3,
		                "margin":"15% 5%"
		            },
		            "plot":{
		                "size":80,
		                "slice":40,
		                "margin-right":100,
		                "border-width":0,
		                "shadow":0,
										"detach":false,
		                "value-box":{
		                    "visible":false
		                },
		                "tooltip":{
		                    "text":"%v 个",
		                    "shadow":false,
		                    "border-radius":3
		                }
		            },
		            "series":config.faultLevel
		        }
		    ]
		};

		return(
			<ZingChart id={config.id} height="220" width="100%" data={myConfig} theme="light"/>
		);
	}
});

var TreeGraphs = React.createClass({
	render: function() {
		var propdata = this.props.data;
		var myConfig = {
		    "type":"bar3d",
		    "background-color": "#fff",
		    "3d-aspect": {
		        "true3d": 0
		    },
		    "plot": {
		        "aspect": "cylinder",
		        "hover-marker": {
		            "background-color": "#888888",
		            "size": 3
		        },
		        "marker": {
		            "background-color": "#cccccc",
		            "size": 3
		        },
		        "preview": true,
		        "tooltip-text": "%v"
		    },
		    "scale-y": {
		        "font-size": 16,
		        "line-color": "#cccccc",
		        "bold": true,
		        "format": "%v",
		        "line-width": 2,
		        "font-family": "Helvetica",
		        "color": "#333333",
		        "tick": {
		            "line-gap-size": 0,
		            "line-color": "#cccccc",
		            "line-width": 1,
		            "size": 10
		        },
            "label": {
		            "text": propdata.y_text,
		            "color": "#333333"
		        },
		        "item": {
		            "font-size": 11,
		            "font-family": "Helvetica",
		            "color": "#333333"
		        }
		    },
		    "scale-x": {
		        "tick": {
		            "line-gap-size": 0,
		            "line-color": "#cccccc",
		            "line-width": 1,
		            "size": 10
		        },
		        "font-size": 16,
		        "line-color": "#cccccc",
		        "bold": true,
		        "item": {
		            "font-size": 11,
		            "font-family": "Helvetica",
		            "color": "#333333"
		        },
		        "guide": {
		            "line-width": 0
		        },
		        "label": {
		            "text": propdata.x_text,
		            "color": "#333333"
		        },
		        "line-width": 2,
		        "font-family": "Helvetica",
		        "color": "#333333",
		        "values": propdata.x_value
		    },
		    "plotarea": {
		        "margin-top": 20,
		        "margin-left": 70,
		        "margin-right": 30
		    },
		    "series": propdata.array
		};
		return(
			<ZingChart id={propdata.id} height="400" width="100%" data={myConfig} theme="light"/>
		);
	}
});


var SpeedAreaChart = React.createClass({
	render: function() {
		var monthSeries = [
			{ text : "Speed", values : [ ['MON',33], ['TUE',20], ['WED',28], ['THU',38], ['FRI',15], ['SAT',33], ['SUN',20] ] }
		];
		var monthData = {
			"type":"area",
			"scale-x":{
				"items-overlap":true
			},
			"series":monthSeries
		};
		return(
			<ZingChart id="speedAreaChart" height="250" width="100%" data={monthData} theme="light"/>
		);
	}
});
var SpeedLineChart = React.createClass({
	render: function() {
    var myLineValues = [
        { text : "First Series", values : [0,1,2,2,4,6,7] },
        { text : "Second Series", values : [18,12,7,14,1,19,4] },
        { text : "Third Series", values : [0,1,12,12,4,6,17] },
        { text : "Fourth Series", values : [18,22,17,4,1,9,4] },
        { text : "Fifth Series", values : [4,2,7,3,23,7,2] },
        { text : "Sixth Series", values : [10,6,8,2,6,3,9] },
    ];
		return(
			<LineChart id="chart1" height="300" width="600" series={myLineValues} legend="true" theme="light" title="Hello Line Chart"/>
		);
	}
});

var SpeedBarChart = React.createClass({
	render: function() {
    var myBarValues = [
        { text : "First Series", values : [0,1,2,2,4,6,7] }
    ];
		return(
			<BarChart id="chart2" height="300" width="600" series={myBarValues} legend="true" theme="dark" title="Hello Bar Chart"/>
		);
	}
});
var SpeedAreaChart3 = React.createClass({
	render: function() {
    var myAreaValues = [
        { text : "First Series", values : [0,1,2,2,4,6,7] },
        { text : "Second Series", values : [18,12,7,14,1,19,4] },
        { text : "Third Series", values : [0,1,12,12,4,6,17] },
        { text : "Fourth Series", values : [18,22,17,4,1,9,4] },
    ];
		return(
			<AreaChart id="chart3" height="300" width="600" series={myAreaValues} legend="true" theme="slate" title="Hello Area Chart"/>
		);
	}
});
var SpeedScatterChart = React.createClass({
	render: function() {
    var myScatterValues = [
        { text : "First Series", values : [ [5,2], [8,1], [2,6], [9,1] ] },
        { text : "Second Series", values : [ [8,3], [2,8], [6,9], [3,5] ] },
        { text : "Third Series", values : [ [18,3], [22,8], [16,9], [13,5] ] },
        { text : "Fourth Series", values : [ [18,3], [12,8], [26,9], [32,5] ] },
    ];
		return(
			<ScatterChart id="chart4" height="300" width="600" series={myScatterValues} legend="true" theme="light" title="Hello Scatter Chart"/>
		);
	}
});

var SpeedPieChart = React.createClass({
	render: function() {
    var pieSlices = [
        { text : "First Slice", values : [10] },
        { text : "Second Slice", values : [20] },
        { text : "Third Slice", values : [30] },
        { text : "Fourth Slice", values : [40] }
    ];
		return(
			<PieChart id="chart5" height="300" width="600" series={pieSlices} legend="true" theme="light" title="Hello Pie Chart"/>
		);
	}
});


var SpeedOther1 = React.createClass({
	render: function() {
    var myConfig = {
    "background-color": "#454754",
    "graphset": [
        {
            "type": "mixed",
            "width": "70%",
            "background-color": "#454754",
            "title": {
                "y": "10px",
                "text-align": "left",
                "background-color": "none",
                "text": "SALES OVERVIEW",
                "font-weight": "normal",
                "font-family": "Arial",
                "font-color": "#ffffff",
                "font-size": "18px",
                "height": "40px",
                "padding-left": "20px"
            },
            "plotarea": {
                "margin": "75px 75px 5px 67px"
            },
            "scale-x": {
                "values": [
                    "J",
                    "F",
                    "M",
                    "A",
                    "M",
                    "J",
                    "J",
                    "A",
                    "S",
                    "O",
                    "N",
                    "D"
                ],
                "flat": false,
                "line-color": "#55717c",
                "offset-y": "4px",
                "guide": {
                    "visible": false
                },
                "label": {
                    "font-size": "11px",
                    "font-family": "Arial",
                    "font-color": "#ffffff",
                    "font-weight": "normal"
                },
                "item": {
                    "tooltip": {
                        "text": "%months"
                    },
                    "font-size": "10px",
                    "font-family": "Arial",
                    "font-color": "#c0c0c0"
                },
                "tick": {
                    "visible": false
                }
            },
            "scale-y": {
                "line-color": "none",
                "values": "0:100000:20000",
                "multiplier": true,
                "label": {
                    "text": "Net Profit",
                    "font-size": "11px",
                    "font-family": "Arial",
                    "font-color": "#ffffff",
                    "font-weight": "normal"
                },
                "item": {
                    "font-size": "10px",
                    "font-family": "Arial",
                    "font-color": "#c0c0c0"
                },
                "guide": {
                    "line-style": "solid",
                    "line-color": "#5e606c",
                    "alpha": 1
                },
                "tick": {
                    "visible": false
                }
            },
            "scale-y-2": {
                "line-color": "none",
                "values": "0:500:100",
                "multiplier": true,
                "label": {
                    "text": "Units Sold",
                    "offset-x": "5px",
                    "font-size": "11px",
                    "font-family": "Arial",
                    "font-color": "#ffffff",
                    "font-weight": "normal"
                },
                "item": {
                    "font-size": "10px",
                    "font-family": "Arial",
                    "font-color": "#c0c0c0"
                },
                "guide": {
                    "visible": false
                },
                "tick": {
                    "visible": false
                }
            },
            "plot": {},
            "series": [
                {
                    "values": [
                        48000,
                        31000,
                        62000,
                        40500,
                        44550,
                        29500,
                        46000,
                        70050,
                        39500,
                        45800,
                        29000,
                        15000
                    ],
                    "type": "bar",
                    "background-color": "#6597a2",
                    "hover-state": {
                        "visible": 0
                    },
                    "tooltip": {
                        "background-color": "#2f6672",
                        "border-radius": "6px",
                        "shadow": false,
                        "padding": "5px 10px"
                    },
                    "animation": {
                        "delay": 0,
                        "effect": 4,
                        "speed": "1000",
                        "method": "0",
                        "sequence": "0"
                    }
                },
                {
                    "values": [
                        110,
                        58,
                        104,
                        357,
                        294,
                        367,
                        285,
                        340,
                        397,
                        425,
                        254,
                        187
                    ],
                    "type": "line",
                    "line-color": "#96feff",
                    "line-width": 2,
                    "marker": {
                        "background-color": "#a3bcb8",
                        "border-width": 2,
                        "shadow": 0,
                        "border-color": "#88f5fa"
                    },
                    "tooltip": {
                        "background-color": "#54ced4",
                        "font-color": "#454754",
                        "border-radius": "6px",
                        "shadow": false,
                        "padding": "5px 10px"
                    },
                    "animation": {
                        "delay": 500,
                        "effect": 5,
                        "speed": "1800",
                        "method": "0",
                        "sequence": "1"
                    },
                    "scales": "scale-x,scale-y-2"
                }
            ]
        },
        {
            "type": "pie",
            "width": "34%",
            "x": "66%",
            "background-color": "#454754",
            "title": {
                "background-color": "none",
                "font-weight": "normal",
                "font-family": "Arial",
                "font-color": "#ffffff",
                "height": "40px"
            },
            "plotarea": {
                "margin": "60px 10px 0px 0px"
            },
            "plot": {
                "value-box": {
                    "visible": false
                },
                "animation": {
                    "delay": 0,
                    "effect": 2,
                    "speed": "300",
                    "method": "0",
                    "sequence": "1"
                }
            },
            "series": [
                {
                    "text": "Product 1",
                    "values": [
                        15
                    ],
                    "background-color": "#57dce5",
                    "border-color": "#454754",
                    "border-width": "1px",
                    "shadow": 0,
                    "tooltip": {
                        "background-color": "#54ced4",
                        "font-color": "#454754",
                        "border-radius": "6px",
                        "shadow": false,
                        "padding": "5px 10px"
                    }
                },
                {
                    "text": "Product 2",
                    "values": [
                        18
                    ],
                    "background-color": "#9688f7",
                    "border-color": "#454754",
                    "border-width": "1px",
                    "shadow": 0,
                    "tooltip": {
                        "background-color": "#796bdd",
                        "font-color": "#ffffff",
                        "border-radius": "6px",
                        "shadow": false,
                        "padding": "5px 10px"
                    }
                },
                {
                    "text": "Product 3",
                    "values": [
                        20
                    ],
                    "background-color": "#b659b4",
                    "border-color": "#454754",
                    "border-width": "1px",
                    "shadow": 0,
                    "tooltip": {
                        "background-color": "#a03f9c",
                        "font-color": "#ffffff",
                        "border-radius": "6px",
                        "shadow": false,
                        "padding": "5px 10px"
                    }
                },
                {
                    "text": "Product 4",
                    "values": [
                        16
                    ],
                    "background-color": "#3bbcfc",
                    "border-color": "#454754",
                    "border-width": "1px",
                    "shadow": 0,
                    "tooltip": {
                        "background-color": "#1b9ede",
                        "font-color": "#ffffff",
                        "border-radius": "6px",
                        "shadow": false,
                        "padding": "5px 10px"
                    }
                },
                {
                    "text": "Product 5",
                    "values": [
                        21
                    ],
                    "background-color": "#6597a2",
                    "border-color": "#454754",
                    "border-width": "1px",
                    "shadow": 0,
                    "tooltip": {
                        "background-color": "#2f6672",
                        "font-color": "#ffffff",
                        "border-radius": "6px",
                        "shadow": false,
                        "padding": "5px 10px"
                    }
                }
            ]
        },
        {
            "type": "bar",
            "width": "100%",
            "background-color": "#454754",
            "border-bottom": "8px solid #565867",
            "plot": {
                "bar-space": "10px",
                "animation": {
                    "delay": 0,
                    "effect": 4,
                    "speed": "1000",
                    "method": "0",
                    "sequence": "0"
                }
            },
            "plotarea": {
                "margin": "45px 30px 40px 65px"
            },
            "scale-x": {
                "values": [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec"
                ],
                "line-color": "#55717c",
                "offset-y": "4px",
                "tick": {
                    "size": "5px",
                    "line-color": "#55717c",
                    "line-width": "1px",
                    "visible": false
                },
                "guide": {
                    "visible": false
                },
                "item": {
                    "font-size": "10px",
                    "font-family": "Arial",
                    "font-color": "#c0c0c0"
                }
            },
            "scale-y": {
                "line-color": "none",
                "values": "0:50000:10000",
                "multiplier": true,
                "guide": {
                    "line-style": "solid",
                    "line-color": "#5e606c",
                    "alpha": 1
                },
                "tick": {
                    "visible": false
                },
                "label": {
                    "text": "Sales by Employee",
                    "offset-x": "-5px",
                    "font-size": "11px",
                    "font-family": "Arial",
                    "font-color": "#ffffff",
                    "font-weight": "normal"
                },
                "item": {
                    "padding-left": "2px",
                    "font-size": "10px",
                    "font-family": "Arial",
                    "font-color": "#c0c0c0"
                }
            },
            "series": [
                {
                    "values": [
                        31000,
                        39500,
                        24300,
                        36000,
                        38000,
                        45500,
                        28500,
                        38000,
                        21000,
                        17000,
                        24000,
                        17500
                    ],
                    "background-color": "#57dde8",
                    "tooltip": {
                        "background-color": "#54ced4",
                        "font-color": "#454754",
                        "border-radius": "6px",
                        "shadow": false,
                        "padding": "5px 10px"
                    }
                },
                {
                    "values": [
                        11500,
                        36750,
                        7000,
                        44500,
                        11500,
                        28450,
                        42900,
                        26750,
                        13050,
                        32600,
                        12500,
                        14300
                    ],
                    "background-color": "#978af6",
                    "tooltip": {
                        "background-color": "#796bdd",
                        "font-color": "#ffffff",
                        "border-radius": "6px",
                        "shadow": false,
                        "padding": "5px 10px"
                    }
                },
                {
                    "values": [
                        21500,
                        29550,
                        14500,
                        16500,
                        28450,
                        35600,
                        21550,
                        18750,
                        11600,
                        7500,
                        14750,
                        16000
                    ],
                    "background-color": "#b857b4",
                    "tooltip": {
                        "background-color": "#a03f9c",
                        "font-color": "#ffffff",
                        "border-radius": "6px",
                        "shadow": false,
                        "padding": "5px 10px"
                    }
                }
            ]
        }
    ]
};
		return(
			<ZingChart id="speedOther" height="500" width="100%" data={myConfig} theme="light"/>
		);
	}
});

module.exports = {
	SpeedAreaChart: SpeedAreaChart,
	SpeedLineChart:SpeedLineChart,
  SpeedBarChart:SpeedBarChart,
  SpeedAreaChart3:SpeedAreaChart3,
  SpeedScatterChart:SpeedScatterChart,
  SpeedPieChart:SpeedPieChart,
  PieGraphs:PieGraphs,
  SpeedOther1:SpeedOther1,
	TreeGraphs:TreeGraphs
};
