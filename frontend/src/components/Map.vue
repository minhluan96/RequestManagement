<template>
  <div style="position: relative">
    <gmap-map
      id="map"
      :center="start.center"
      :zoom="16"
      ref="gmap"
      :options="options"
      map-type-id="terrain">
      <gmap-marker ref="markers" :position="start.center" :title="start.title" :icon="start.startIcon"  :draggable="true" @drag="updateCoordinates">
      </gmap-marker>

      <gmap-marker ref="finishMarkers" :position="finish.finishCenter" :title="finish.title" :icon="finish.finishIcon" :draggable="true" @drag="updateFinishPositionCoordinates">
      </gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBkwRNAhT2ic6ZMR3i10ms51YhUJGHTXaQ",
    libraries: 'places'
  }
})
export default {
  props: ['request'],
  data () {
    return {
      state4: '',
      timeout: null,
      marker: null,
      finishedMarker: null,
      inputData: '',
      map: null,
      mapModel: null,
      selectedRequest: {},
      directionsService: null,
      directionsDisplay: null,
      geocoder: null,
      place: null,
      start: {
        position: {
          lat: 0,
          lng: 0
        },
        center: {
          lat: 10.762558,
          lng: 106.681426
        },
        startIcon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
        title: "Nơi đón"
      },
      finish: {
        finishPosition: {
          lat: 0,
          lng: 0
        },
        finishCenter: {
          lat: 10.762977,
          lng: 106.686948
        },
        finishIcon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        title: "Điểm dừng"
      },
      optionSelects: [
        {
          value: 1,
          label: 'Điểm đón'
        }, {
          value: 2,
          label: 'Điểm dừng'
        }
      ],
      selectedOption: 1,
      options: {
        disableDefaultUI : true,
        styles: [{
          'featureType': 'water',
          'stylers': [{'saturation': 43}, {'lightness': -11}, {'hue': '#0088ff'}]
        }, {
          'featureType': 'road',
          'elementType': 'geometry.fill',
          'stylers': [{'hue': '#ff0000'}, {'saturation': -100}, {'lightness': 99}]
        }, {
          'featureType': 'road',
          'elementType': 'geometry.stroke',
          'stylers': [{'color': '#808080'}, {'lightness': 54}]
        }, {
          'featureType': 'landscape.man_made',
          'elementType': 'geometry.fill',
          'stylers': [{'color': '#ece2d9'}]
        }, {
          'featureType': 'poi.park',
          'elementType': 'geometry.fill',
          'stylers': [{'color': '#ccdca1'}]
        }, {
          'featureType': 'road',
          'elementType': 'labels.text.fill',
          'stylers': [{'color': '#767676'}]
        }, {
          'featureType': 'road',
          'elementType': 'labels.text.stroke',
          'stylers': [{'color': '#ffffff'}]
        }, {'featureType': 'poi', 'stylers': [{'visibility': 'off'}]}, {
          'featureType': 'landscape.natural',
          'elementType': 'geometry.fill',
          'stylers': [{'visibility': 'on'}, {'color': '#b8cb93'}]
        }, {'featureType': 'poi.park', 'stylers': [{'visibility': 'on'}]}, {
          'featureType': 'poi.sports_complex',
          'stylers': [{'visibility': 'on'}]
        }, {'featureType': 'poi.medical', 'stylers': [{'visibility': 'on'}]}, {
          'featureType': 'poi.business',
          'stylers': [{'visibility': 'simplified'}]
        }]
      }
    }
  }
}
</script>

<style lang="css">
</style>
