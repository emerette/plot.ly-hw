# plotly_challenge

Please click on the [link](https://lensin3.github.io/plotly_challenge/) to see the project deployed on GitHub pages.

This project involves building an interactive dashboard using **javaScript**, **d3** and **plotly** to visualize the [Belly Button Biodiversity dataset](http://robdunnlab.com/projects/belly-button-biodiversity/), which catalogs the microbes that colonize human navels.

![Bacteria by filterforge.com](Images/bacteria.jpg)

## Tasks

The following tasks were accomplished during this project:

## Step 1: Plotly

1. Use the D3 library to read in `samples.json`.

2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.


  ![bar Chart](Images/hw01.png)

3. Create a bubble chart that displays each sample.

![Bubble Chart](Images/bubble_chart.png)

4. Display the sample metadata, i.e., an individual's demographic information.

5. Display each key-value pair from the metadata JSON object somewhere on the page.

![hw](Images/hw03.png)

6. Update all of the plots any time that a new sample is selected.

7. Create a dashboard with all the charts as seen below.

![hw](Images/hw02.png)

8. Adapt the Gauge Chart from <https://plot.ly/javascript/gauge-charts/> to plot the weekly washing frequency of the individual.

9. Modify the example gauge code to account for values ranging from 0 through 9

10. Update the chart whenever a new sample is selected.

![Weekly Washing Frequency Gauge](Images/gauge.png)

## Tools and Libraries

- **javaScript**
- **d3.js**
- **plotly.js**
- **html**

## Additional sources and reference codes to create Gauge Chart
- <https://jsfiddle.net/331wpjLk/>
- <https://stackoverflow.com/questions/53211506/calculating-adjusting-the-needle-in-gauge-chart-plotly-js>






