import React, { useEffect, useRef, useState } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  randomCountriesAtom as randomCountriesState,
  questionCounterAtom as questionCounterState,
  quizStartedAtom as quizStartedState,
} from "../../state/atom";

am4core.useTheme(am4themes_animated);

const GlobeChart = () => {
  const chartRef = useRef(null);
  const spinGlobe = useRef(true);
  const [randomCountries, setRandomCountries] =
    useRecoilState(randomCountriesState);
  const [questionCounter, setQuestionCounter] =
    useRecoilState(questionCounterState);
  const [quizStarted, setQuizStarted] = useRecoilState(quizStartedState);

  useEffect(() => {
    let chart = am4core.create(chartRef.current, am4maps.MapChart);

    chart.geodata = am4geodata_worldLow;
    chart.projection = new am4maps.projections.Orthographic();
    chart.panBehavior = "rotateLongLat";
    chart.deltaLatitude = -20;
    chart.padding(20, 20, 20, 20);

    let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;

    let polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.fill = am4core.color("#FF6633");
    polygonTemplate.fill = am4core.color("#579c49");

    polygonTemplate.stroke = am4core.color("#000033");
    polygonTemplate.strokeWidth = 0.5;
    //polygonTemplate.cursorOverStyle = am4core.MouseCursorStyle.pointer;
    polygonTemplate.url = "https://www.datadrum.com/main.php?package={id}";
    polygonTemplate.urlTarget = "_blank";

    let graticuleSeries = chart.series.push(new am4maps.GraticuleSeries());
    graticuleSeries.mapLines.template.line.stroke = am4core.color("#ffffff");
    graticuleSeries.mapLines.template.line.strokeOpacity = 0.08;
    graticuleSeries.fitExtent = false;

    chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 0.1;
    chart.backgroundSeries.mapPolygons.template.polygon.fill =
      am4core.color("#ffffff");

    let hs = polygonTemplate.states.create("hover");
    hs.properties.fill = chart.colors.getIndex(0).brighten(-0.5);

    let animation;
    if (spinGlobe.current === true) {
      setTimeout(function () {
        animation = chart.animate(
          { property: "deltaLongitude", to: 100000 },
          20000000
        );
      }, 1000);
    }

    document.addEventListener("click", function () {
      animation.stop();
      spinGlobe.current = false;
    });

    chart.goHome = function () {
      const countryName = randomCountries[questionCounter].country;
      console.log(countryName);
      const desiredColor = am4core.color("#6A5ACD");
      if (quizStarted) {
        // Iterate through all the polygons on the map
        polygonSeries.mapPolygons.each((polygon) => {
          // Check if the name of the polygon matches the name of the country
          if (polygon.dataItem.dataContext.name == countryName) {
            // Set the fill color of the polygon to the desired color
            console.log(polygon);
            polygon.fill = desiredColor;
            // polygon.isHover = true;

            // chart.cursorTooltipEnabled = false; // disable cursor tooltip
            // chart.tooltipContainer.hide(); // hide the cursor tooltip if it is already visible
            // if (!chart.tooltipLabel) {
            //   // create tooltip label if it does not exist
            //   chart.tooltipLabel = chart.chartContainer.createChild(
            //     am4core.Label
            //   );
            //   chart.tooltipLabel.fontSize = 12;
            //   chart.tooltipLabel.padding(5, 10, 5, 10);
            //   chart.tooltipLabel.background.fill = am4core.color("#000000");
            //   chart.tooltipLabel.background.fillOpacity = 0.7;
            //   chart.tooltipLabel.fill = am4core.color("#ffffff");
            //   chart.tooltipLabel.align = "center";
            //   chart.tooltipLabel.valign = "middle";
            // }
            // chart.tooltipLabel.text = polygon.dataItem.dataContext.name;
            // chart.tooltipLabel.visible = true;
            // chart.tooltipLabel.x = polygon.visualLongitude;
            // chart.tooltipLabel.y = polygon.visualLatitude - 20; // position label above the country
          }
        });
      }
      console.log(randomCountries[0].latlng[0]);
      console.log(randomCountries[0].latlng[1]);
      chart.deltaLatitude = -1 * randomCountries[questionCounter].latlng[0];
      chart.deltaLongitude = -1 * randomCountries[questionCounter].latlng[1];
      //chart.zoomLevel = 1;
      console.log(chart);
    };

    return () => {
      if (chart) {
        chart.dispose();
      }
    };
  }, [randomCountries, questionCounter]);

  return <div ref={chartRef} />;
};

export default GlobeChart;
