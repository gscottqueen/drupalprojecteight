import React, { Component } from "react"
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  // Markers,
  // Marker,
} from "react-simple-maps"

import GeoJSON from './world-50m.json'

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto",
}

class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // recalls: [],
      geoCodes: [],
    };
  }

  componentDidMount(props) {

    // console.log('props', props.recallData)


    // get our fda response
    // console.log('geocodes', this.state.geoCodes)
    // console.log('props', props.recallData)

    // iterate through that and create a new array with just the zips

    // sent the new zips array to mapquest
    fetch('http://open.mapquestapi.com/geocoding/v1/address?key=agvvu4mpL1dwAO4yamqLSuMjhqKClQiz&location=92821-3652')
    .then(response => response.json())
    .then(data => {
      // console.log(data)
      this.setState({
        geoCodes: data.results[0],
      })
      // console.log('geocodes', this.state.geoCodes)
    });
  }

  render(props) {
    const recalls = props
    console.log(recalls)
    return (
      <div style={wrapperStyles}>
        <ComposableMap
          projectionConfig={{
            scale: 205,
            rotation: [-11,0,0],
          }}
          width={980}
          height={551}
          style={{
            width: "100%",
            height: "auto",
          }}
          >
          <ZoomableGroup center={[0,20]} disablePanning>
            <Geographies geography={GeoJSON}>
              {(geographies, projection) => geographies.map((geography, i) => geography.id !== "ATA" && (
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
                      fill: "#607D8B",
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
              ))}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    )
  }
}

export default Map