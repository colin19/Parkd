import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"


/**
 * Helper component to initialize and generate react google map
 */
const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCDAr3AbkaYlYX_BXWDQulywnMX0SXM1v4",
        loadingElement: <div style={{ height: '100%' }} />,
        containerElement: <div style={{ height: '250px'}} />,
        mapElement: <div style={{ height: '100%' }} />,
    }),
    withScriptjs,
    withGoogleMap
) ((props) =>
    <GoogleMap
        defaultZoom={props.zoom}
        defaultCenter={{ lat: props.lat, lng: props.lng }}
    >
        {props.isMarkerShown && <Marker position={{ lat: props.lat, lng: props.lng }}/>}
    </GoogleMap>
);

/**
 * ReactGoogleMap, a customized Google map element in React
 * Using the library react-google-maps
 */
export default class ReactGoogleMap extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isMarkerShown: props.isMarkerShown,
            lat: props.lat,
            lng: props.lng,
            zoom: props.zoom,
        };
    }

    render() {
        return (
            <MyMapComponent
                isMarkerShown={this.state.isMarkerShown}
                lat={this.state.lat}
                lng={this.state.lng}
                zoom={this.state.zoom}
            />
        )
    }
}
