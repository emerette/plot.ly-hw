// Function to create plots
function createPlots(id) {
    
    // Read json file
    d3.json("./data/samples.json").then((data) => {

        // Extract metadata
        var metaData = data.metadata;
        console.log(metaData);

        // Extract wash frequency
        var wfreq = metaData.map(val => val.wfreq);
        console.log(wfreq);
         
        // Extract samples data    
        var samples_data = data.samples; 
        

        // Extract samples data corresponding to each id
        var samplesData = samples_data.filter(val => val.id.toString() === id)[0];
        console.log(samplesData);

        // Extract top 10 sample values and corresponding otu ID and labels
            
        var samplesVal= samplesData.sample_values.slice(0, 10);
        var samplesOTUID = (samplesData.otu_ids.slice(0, 10)).reverse();
        var otuIdLabel = samplesOTUID.map(val => 'OTU ' + val);
        var samplesLabel = samplesData.otu_labels.slice(0, 10);
        
        console.log(samplesVal);
        console.log(samplesOTUID);
        console.log(otuIdLabel);
        console.log(samplesLabel);

        // Create tick marks and ticklabels

        var tickvals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        var ticktext = otuIdLabel.map(val => val);

        // Horizontal Bar Graph
        var trace1 = {
            x: samplesVal.sort(function(a, b){return a - b}),
            y: otuIdLabel.toString(),
            text: samplesLabel.reverse(),
            type: 'bar',
            orientation: 'h'
        };

        var data1 = [trace1];

        var layout1 = {
            title: "<b>Top 10 OTU</b>",
            yaxis: {
                tickmode: "array",
                tickvals: tickvals,
                ticktext: ticktext
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };
        Plotly.newPlot("bar", data1, layout1);

        // Bubble chart
        var trace2 = {
            x: samplesData.otu_ids,
            y: samplesData.sample_values,
            mode: "markers",
            marker: {
                size: samplesData.sample_values,
                color: samplesData.otu_ids
            },
            text: samplesData.otu_labels
        };

        var data2 = [trace2];

        var layout2 = {
            title: '<b>Microbe Levels In The Human Navel</b>',
            xaxis: {title: "OTU ID"},
            height: 800,
            width: 1200
        };
        Plotly.newPlot("bubble", data2, layout2);

        // Gauge Chart
        var metaDataWfreq = metaData.filter(val => val.id.toString() === id);
        console.log(metaDataWfreq);
        
        // Extract wfreq for each id
        var levelWfreq = []

        Object.entries(metaDataWfreq).forEach(([key, value]) => {
            levelWfreq.push(value.wfreq);
        });

        console.log(levelWfreq);
        
       

        // calculate needle point and rescale to match the radians
        var degrees = 180 - (parseFloat(levelWfreq) * 20),
            radius = .5;
        var radians = degrees * Math.PI / 180;
        var x = radius * Math.cos(radians);
        var y = radius * Math.sin(radians);
    
        // create needle path
        var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
            pathX = String(x),
            space = ' ',
            pathY = String(y),
            pathEnd = ' Z';
        var path = mainPath.concat(pathX,space,pathY,pathEnd);
    
        var data = [{ type: 'scatter',
        x: [0], y:[0],
            marker: {size: 28, color:'850000'},
            showlegend: false,
            name: 'washfreq',
            text: levelWfreq.toString(),
            hoverinfo: 'text+name'},
        { values: [81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81],
        rotation: 90,
        text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9', ''],
        textinfo: 'text',
        textposition:'inside',	  
        marker: {colors:['rgba(30, 255, 76, 1)', 'rgba(30, 242, 76, 1)', 'rgba(30, 239, 76, 1)', 'rgba(30, 226, 76, 1)', 'rgba(30, 213, 76, 1)', 'rgba(30, 200, 76, 1)', 'rgba(30, 187, 76, 1)', 'rgba(30, 160, 76, 1)', 'rgba(30, 130, 76, 1)', 'rgba(255, 255, 255, 0)']},
        labels: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9', ''],
        hoverinfo: 'label',
        hole: .5,
        type: 'pie',
        showlegend: false,
        direction: "clockwise"
        }];
    
        var layout = {

            shapes:[{

                type: 'path',
                path: path,
                fillcolor: '850000',
                line: {

                    color: '850000'
                }
            }],
            title: '<b> Belly Button Washing Frequency</b> <br> Scrubs per Week',
            height: 600,
            width: 600,
            xaxis: {zeroline:false, showticklabels:false,
                        showgrid: false, range: [-1, 1]},
            yaxis: {zeroline:false, showticklabels:false,
                        showgrid: false, range: [-1, 1]}
            };
    
        Plotly.newPlot('gauge', data, layout);
        
    
    });
};

// Capture ID from metadata and display metadata
function metaDataByID(id) {

    // read samples data from json data file
    d3.json("./data/samples.json").then((data) => {
        // Extract metadata
        var metaData = data.metadata;
        console.log(metaData);

        // Extract metadata ID
        
        var metaDataId = metaData.filter(val => val.id.toString() === id)[0];
        console.log(metaDataId);

        // Make reference to panel-body
        
        var pbody = d3.select("#sample-metadata");
    
        // reset html after selection
        pbody.html("");
    
        // Append 'p' tag to hold the metadata       
    
        Object.entries(metaDataId).forEach(([key, value]) => {
            pbody.append("p").text(`${key}:${value}`);    
        });


    });

};

// Create function for event listener
function optionChanged(id) {
    createPlots(id);
    metaDataByID(id);
}

// Initialize default plots
function init() {
    // Capture data for dropdown selector
    var dropdown = d3.select("#selDataset");

    // read json data to extract names array
    d3.json("./data/samples.json").then((data) => {
        console.log(data);
        // Extract  names array
        var names = data.names;
        // Get id for dropdown selector
        names.forEach((value) => {
            dropdown.append("option").text(value).property("value");
        });

        // call the plot functions to display the plots
        createPlots(names[0]);
        metaDataByID(names[0]);

    });

}

init();










