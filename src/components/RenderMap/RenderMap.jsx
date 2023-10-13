import React, { Component } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import Overlay from 'ol/Overlay';
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Style, Icon } from "ol/style";
import './RenderMap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightAndDownLeftFromCenter, faDownLeftAndUpRightToCenter } from '@fortawesome/free-solid-svg-icons';

class MapComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isIconEnlarged: false,
      markers: new VectorSource(),
    };
  }

  toggleIconSize = () => {
    this.setState((prevState) => ({
      isIconEnlarged: !prevState.isIconEnlarged,
    }));
  };

  componentDidMount() {
    if (!this.map) {
      this.createMap();
    }
  }

  handleMapClick = (event) => {
    const coordinate = event.coordinate;

    const markerFeature = new Feature({
      geometry: new Point(coordinate),
    });

    const markerStyle = new Style({
      image: new Icon({
        src: "/games/elden ring/assets/marker.png", // Add the path to your marker image
        scale: 0.35, // Adjust the scale as needed
      }),
    });

    markerFeature.setStyle(markerStyle);

    this.state.markers.addFeature(markerFeature);
  };

  createMap() {
    const maxExtent = [-19789118.42804759, -14646879.501659576, 16839108.363496605, 19819641.988605317];

    this.map = new Map({
      target: "map",
      view: new View({
        center: [0, 0],
        zoom: 1.45,
        minZoom: 1.45,
        maxZoom: 6,
        extent: maxExtent,
      }),
    });

    const tileUrl = "/games/elden ring/tiles/{z}/{x}/{y}.png";

    const tileLayer = new TileLayer({
      source: new XYZ({
        url: tileUrl,
        maxZoom: 4,
        wrapX: false,
      }),
    });

    this.map.addLayer(tileLayer);

    // Add a VectorLayer to display markers
    const markersLayer = new VectorLayer({
      source: this.state.markers,
    });
    this.map.addLayer(markersLayer);

    // Attach a click event listener to the map
    this.map.on("click", this.handleMapClick);

    // Label for locations
    this.addTextLabel([-10172593.823245227, -6798719.637270926], 'Limgrave');
    this.addTextLabel([1000000.43509253906, -9207097.638147412], 'Caelid');
    this.addTextLabel([-7090317.662602342, 1671455.4889062573], 'Liurnia');
    this.addTextLabel([-8524891.343605913, 12522241.428087795], 'Altus Plateau');
    this.addTextLabel([5923178.9926493885, 6447822.162273667], 'Mountaintops of the Giants');
  }

  addTextLabel(position, labelText) {
    const textOverlay = new Overlay({
      element: document.createElement('div'),
      positioning: 'center-center',
    });

    textOverlay.setPosition(position);

    const labelElement = document.createElement('div');
    labelElement.className = 'text-label';
    labelElement.innerHTML = labelText;
    textOverlay.getElement().appendChild(labelElement);
    this.map.addOverlay(textOverlay);
  }

  render() {
    const { isIconEnlarged } = this.state;
    const icon = isIconEnlarged
      ? faDownLeftAndUpRightToCenter
      : faUpRightAndDownLeftFromCenter;

    const iconMarginLeft = isIconEnlarged ? '1200px' : '588px';

    return (
      <div className={`map-card ${isIconEnlarged ? 'enlarged' : ''}`}>
        <div id="map" className={`map ${isIconEnlarged ? 'enlarged' : ''}`}>
          <style>
            {`.ol-zoom {display: none;}`}
          </style>
        </div>
        <div className="enlarge-icon" onClick={this.toggleIconSize} style={{ marginLeft: iconMarginLeft }}>
          <FontAwesomeIcon icon={icon} />
        </div>
      </div>
    );
  }
}

export default MapComponent;