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
  maxWidth: 980,
  margin: "0 auto",
}

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
      coordinates: [ 
        location.locations[0].latLng.lng, 
        location.locations[0].latLng.lat 
      ]
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
      })
    });
  }

  render() {

    const markers = parseLatLang(this.state.geoCodes)

    return (
      <div style={wrapperStyles}>
        <ComposableMap
          projectionConfig={{
            scale: 200,
          }}
          width={980}
          height={600}
          style={{
            width: "100%",
            height: "auto",
          }}
          >
          <ZoomableGroup center={[0,20]} disablePanning>
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
                    r={5}
                    style={{
                      stroke: "#FF5722",
                      strokeWidth: .1,
                      opacity: 0.9,
                    }}
                  />
                  {/* <text
                    textAnchor="middle"
                    y={marker.markerOffset}
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fill: "#607D8B",
                    }}
                    >
                    {marker.name}
                  </text> */}
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