import React, { Component } from "react"
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from "react-simple-maps"

import GeoJSON from './world-50m.json'

const wrapperStyles = {
  width: "100%",
}

// const markers = [
//   { markerOffset: -25, name: "Buenos Aires", coordinates: [-58.3816, -34.6037] },
//   { markerOffset: -25, name: "La Paz", coordinates: [-68.1193, -16.4897] },
//   { markerOffset: 35, name: "Brasilia", coordinates: [-47.8825, -15.7942] },
//   { markerOffset: 35, name: "Santiago", coordinates: [-70.6693, -33.4489] },
//   { markerOffset: 35, name: "Bogota", coordinates: [-74.0721, 4.7110] },
//   { markerOffset: 35, name: "Quito", coordinates: [-78.4678, -0.1807] },
//   { markerOffset: -25, name: "Georgetown", coordinates: [-58.1551, 6.8013] },
//   { markerOffset: -25, name: "Asuncion", coordinates: [-57.5759, -25.2637] },
//   { markerOffset: 35, name: "Paramaribo", coordinates: [-55.2038, 5.8520] },
//   { markerOffset: 35, name: "Montevideo", coordinates: [-56.1645, -34.9011] },
//   { markerOffset: -25, name: "Caracas", coordinates: [-66.9036, 10.4806] },
// ]

// const markers = [
//   { 
//     markerOffset: -25, 
//     name: "Centerville", 
//     coordinates: [ -95, 25 ] 
//   }
// ]
// console.log(markers)

function parseZips(recalls) {
  let recallsArray = recalls
  let zips = recallsArray.map(function(recall) {
    if (recall.postal_code === "" || recall.postal_code === undefined){
      let index = recalls.indexOf(recall)
      recalls.splice(index, 1)
    } else {
      return '&location=' + recall.postal_code
    }
  })

  let batchZips = JSON.stringify(zips)
  let stringZips = batchZips.replace(/[^a-z0-9&=-]/g, "")
  return stringZips
}


function parseLatLang(geoCodes) {
  let locationsArray = geoCodes
  let LatLangArray = locationsArray.map(function(location) {
    return { 
      markerOffset: -25,
      name: "Recall", 
      coordinates: [ location.locations[0].latLng.lng , location.locations[0].latLng.lat ]
    }
  })
  return LatLangArray
}


class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      geoCodes: [],
      zips: parseZips(props.recallData),
      recallMarkers: [], 
    };
  }

  componentDidMount() {
    // send the new zips array to mapquest
    fetch('http://open.mapquestapi.com/geocoding/v1/batch?&maxResults=1&key=agvvu4mpL1dwAO4yamqLSuMjhqKClQiz' + this.state.zips + '')
    .then(response => response.json())
    .then(data => {
      this.setState({
        geoCodes: data.results,
        recallMarkers: parseLatLang(this.state.geoCodes)
      })
    });
  }

  render() {

    const markers = parseLatLang(this.state.geoCodes)
    console.log(markers)

    return (
      <div style={wrapperStyles}>
        <ComposableMap
          projectionConfig={{ scale: 1000 }}
          width={1000}
          height={1000}
          style={{
            width: "100%",
            height: "auto",
            margin: "0px",
            maxWidth: "100%",
          }}
          >
          <ZoomableGroup center={[ -95, 25 ]} disablePanning>
            <Geographies geography={GeoJSON}>
              {(geographies, projection) =>
                geographies.map((geography, i) =>
                    <Geography
                      key={i}
                      geography={geography}
                      projection={projection}
                      style={{
                        default: {
                          fill: "#ECEFF1",
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none",
                        },
                        hover: {
                          fill: "#CFD8DC",
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none",
                        },
                        pressed: {
                          fill: "#FF5722",
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none",
                        },
                      }}
                    />
                  )
              }
            </Geographies>
            <Markers>
              {markers.map((marker, i) => (
                console.log(marker),
                <Marker
                  key={i}
                  marker={marker}
                  style={{
                    default: { fill: "#FF5722" },
                    hover: { fill: "#FFFFFF" },
                    pressed: { fill: "#FF5722" },
                  }}
                  >
                  <circle
                    cx={0}
                    cy={0}
                    r={10}
                    style={{
                      stroke: "#FF5722",
                      strokeWidth: 3,
                      opacity: 0.9,
                    }}
                  />
                  <text
                    textAnchor="middle"
                    y={marker.markerOffset}
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fill: "#607D8B",
                    }}
                    >
                    {marker.name}
                  </text>
                </Marker>
              ))}
            </Markers>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    )
  }
}

export default Map