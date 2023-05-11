import React, { useEffect, useRef, useState } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  randomCountriesAtom as randomCountriesState,
  questionCounterAtom as questionCounterState,
} from "../../state/atom";

am4core.useTheme(am4themes_animated);

const GlobeChart = () => {
  const chartRef = useRef(null);
  const spinGlobe = useRef(true);
  const [randomCountries, setRandomCountries] =
    useRecoilState(randomCountriesState);
  const [questionCounter, setQuestionCounter] =
    useRecoilState(questionCounterState);

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
    //polygonTemplate.fill = am4core.color("#FF6633");
    polygonTemplate.fill = am4core.color("#579c49");

    polygonTemplate.stroke = am4core.color("#000033");
    polygonTemplate.strokeWidth = 0.5;
    polygonTemplate.cursorOverStyle = am4core.MouseCursorStyle.pointer;
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

    // chart.seriesContainer.events.on("click", function () {
    //   animation.stop();
    // });
    document.addEventListener("click", function () {
      animation.stop();
      spinGlobe.current = false;
    });

    chart.goHome = function () {
      console.log(randomCountries[0].latlng[0]);
      console.log(randomCountries[0].latlng[1]);
      chart.deltaLatitude = -1 * randomCountries[questionCounter].latlng[0];
      chart.deltaLongitude = -1 * randomCountries[questionCounter].latlng[1];
      chart.zoomLevel = 1;
      //chart.color = "#333";
      console.log(chart);
    };

    return () => {
      if (chart) {
        chart.dispose();
      }
    };
  }, [randomCountries, questionCounter]);

  return <div ref={chartRef} style={{ width: "100%", height: "500px" }} />;
};

export default GlobeChart;
