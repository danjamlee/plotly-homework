//read json

function readJson(sample) {
	d3.json("samples.json").then((data) => {
		var metadata = data.metadata;
		//return key/value // return json sample's id and append
		var emptyArray = metadata.filter(object => object.id == sample);
		var finalArray = emptyArray[0];
		var Visual = d3.select("#sample-metadata");


		//empty the data everytime you select a new data
		Visual.html("");
	    // Use `Object.entries` to add each key and value pair to the panel
	    // Hint: Inside the loop, you will need to use d3 to append new
	    // tags for each key-value in the metadata.
		Object.entries(finalArray).forEach(([key, value]) => {
			Visual.append("h6").text(`${key} : ${value}`);
		});
	});
}

function Charts(sample) {
	d3.json("samples.json").then((data) => {
		var samples = data.samples;
		var emptyArray = samples.filter(object => object.id == sample);
		var finalArray = emptyArray[0];
		// labels from html
		//apply to finalarray
    var otu_ids = finalArray.otu_ids;
    var otu_labels = finalArray.otu_labels;
    var sample_values = finalArray.sample_values;

    // Build a Bubble Chart
    var bubbleLayout = {
      xaxis: { title: "OTU ID" },
    };

    var bubbleData = [
      {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
          size: sample_values,
          color: otu_ids,
        }
      }
    ];

    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    var yticks = otu_ids.slice(0, 10).map(otuname => `OTU ${otuname}`);
    var barData = [
      {
        y: yticks,
        x: sample_values.slice(0, 10)
        text: otu_labels.slice(0, 10),
        type: "bar",
        orientation: "h",
      }
    ];
 

    var layout = {
      margin: { t: 30, l: 150 }
    };

    Plotly.newPlot("bar", barData, layout);

	});
}

function dropdown() {
	var select = d3.select("#selDataset");

	d3.json("samples.json").then((data) => {
		var name = data.names;
		//select 'names' of json
		name.forEach((sample) => {
			select
				.append("option")
				.text(sample)
				.property("value", sample);
		});
 
		//use built functions and use names for 
		//first plot
		var charting = name[0];
		Charts(charting);
		readJson(charting);
	});
}
//use function name from html for repopulating
function optionChanged(final) {
	Charts(final);
	readJson(final);
}
//use dropdown() to populate
dropdown();