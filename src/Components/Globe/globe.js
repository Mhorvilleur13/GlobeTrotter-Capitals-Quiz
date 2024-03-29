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

const Globe = () => {
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

    // Disable touch interactions
    chart.touchZoom = chart.touchRotate = chart.touchOptions = false;

    chart.minZoomLevel = 1;
    chart.maxZoomLevel = 1;

    let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;

    let polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.fill = am4core.color("#579c49");

    polygonTemplate.stroke = am4core.color("#000033");
    polygonTemplate.strokeWidth = 0.5;
    //polygonTemplate.cursorOverStyle = am4core.MouseCursorStyle.pointer;
    //polygonTemplate.url = "https://www.datadrum.com/main.php?package={id}";
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

    const desiredColor = am4core.color("#6A5ACD");

    function updateCountry() {
      if (quizStarted) {
        const countryName = randomCountries[questionCounter].country;

        polygonSeries.events.on("inited", () => {
          polygonSeries.mapPolygons.each((polygon) => {
            if (randomCountries[questionCounter].area < 1500) {
              //polygon.isHover = true;
              chart.cursorTooltipEnabled = false; // disable cursor tooltip
              chart.tooltipContainer.hide(); // hide the cursor tooltip if it is already visible
              if (!chart.tooltipLabel) {
                // create tooltip label if it does not exist
                chart.tooltipLabel = chart.chartContainer.createChild(
                  am4core.Label
                );
                chart.tooltipLabel.fontSize = 12;
                chart.tooltipLabel.padding(5, 10, 5, 10);
                chart.tooltipLabel.background.fill = am4core.color("#000000");
                chart.tooltipLabel.background.fillOpacity = 0.7;
                chart.tooltipLabel.fill = am4core.color("#ffffff");
                chart.tooltipLabel.align = "center";
                chart.tooltipLabel.valign = "middle";
              }
              chart.tooltipLabel.text = countryName;
              chart.tooltipLabel.visible = true;
              chart.tooltipLabel.x = polygon.visualLongitude;
              chart.tooltipLabel.y = polygon.visualLatitude - 20; // position label above the country
            }
            if (polygon.dataItem.dataContext.name === countryName) {
              polygon.fill = am4core.color("#6A5ACD");
            }
          });
        });
        chart.deltaLatitude = -1 * randomCountries[questionCounter].latlng[0];
        chart.deltaLongitude = -1 * randomCountries[questionCounter].latlng[1];
      }
    }
    updateCountry();

    return () => {
      if (chart) {
        chart.dispose();
      }
    };
  }, [randomCountries, questionCounter]);

  return <div ref={chartRef} id="chartdiv" />;
};

export default Globe;
