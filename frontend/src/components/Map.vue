<template>
  <div style="position: relative">
    <gmap-map
      id="map"
      :center="start.center"
      :zoom="16"
      ref="gmap"
      :options="options"
      map-type-id="terrain">
      <gmap-marker ref="markers" :position="start.center" :title="start.title" :icon="start.startIcon"  :draggable="false">
      </gmap-marker>

      <gmap-marker ref="finishMarkers" :position="finish.finishCenter" :title="finish.title" :icon="finish.finishIcon" :draggable="false">
      </gmap-marker>

      <gmap-marker ref="driverMarker" :position="driver.driverPosition" :title="driver.title" :icon="driver.driverIcon" :draggable="false">
      </gmap-marker>
    </gmap-map>
    <div class="container">
      <div class="row">
        <div class="col-md-12" align="center">
          <InfoBar :request="requestModel"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import InfoBar from '@/components/InfoBar.vue'
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBkwRNAhT2ic6ZMR3i10ms51YhUJGHTXaQ",
    libraries: 'places'
  }
})
export default {
  components: {
    InfoBar
  },
  data () {
    return {
      state4: '',
      timeout: null,
      marker: null,
      finishedMarker: null,
      driverMarker: null,
      inputData: '',
      requestModel: null,
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
        startIcon: {
          url: "http://image.flaticon.com/icons/svg/252/252025.svg",
          scaledSize: {width: 60, height: 60, f: 'px', b: 'px'}
        },
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
        finishIcon: {
          url: "https://image.flaticon.com/icons/svg/608/608671.svg",
          scaledSize: {width: 60, height: 60, f: 'px', b: 'px'}
        },
        title: "Điểm dừng"
      },
      driver: {
        driverPosition: {
          lat: 0,
          lng: 0
        },
        driverIcon: {
          url: "https://image.flaticon.com/icons/svg/1141/1141070.svg",
          scaledSize: {width: 60, height: 60, f: 'px', b: 'px'}
        },
        title: "Tài xế"
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
  },
  methods: {
    getRequestInfo(id) {
      if (id == null) return
      var requestPayload = {
        ID: id
      }

      this.$store.dispatch('getRequestDetail', requestPayload).then(value => {
        console.log(`get request detail ${id}`, value)
        this.requestModel = value
        this.start.position = {
          lat: parseFloat(value.Latitude),
          lng: parseFloat(value.Longtitude)
        }
        this.finish.finishPosition = {
          lat: parseFloat(value.FinishLatitude),
          lng: parseFloat(value.FinishLongtitude)
        }
        if (value.Driver != null) {
          this.driver.driverPosition = {
            lat: parseFloat(value.DriverLatitude),
            lng: parseFloat(value.DriverLongtitude)
          }
          this.driverMarker.$markerObject.setPosition(this.driver.driverPosition)
        }

        this.marker.$markerObject.setPosition(this.start.position)
        this.finishedMarker.$markerObject.setPosition(this.finish.finishPosition)
        this.calculateRoutes()
        console.log(value)
      }).catch(err => {
        console.log(err)
        this.$message({
            type: 'error',
            message: 'Không có vị trí chính xác để hiển thị'
          });
      })
    },
    calculateRoutes() {
      var self = this
      var start = new google.maps.LatLng(self.start.position.lat, self.start.position.lng)
      var end = new google.maps.LatLng(self.finish.finishPosition.lat, self.finish.finishPosition.lng);
      var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
      }
      self.directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          self.directionsDisplay.setDirections(response);
          self.directionsDisplay.setMap(self.map)
        } else {
          console.log("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status)

        }
      });
    },
    initializeValues() {
      this.directionsDisplay.setMap(null);
      this.start.position.lat = 0
      this.start.position.lng = 0
      this.finish.finishPosition.lat = 0
      this.finish.finishPosition.lng = 0
      this.driver.driverPosition.lat = 0
      this.driver.driverPosition.lng = 0
    }
  },
  mounted() {
    //do something after mounting vue instance
    this.$gmapApiPromiseLazy().then(() => {
      this.geocoder = new google.maps.Geocoder();
      this.directionsService = new google.maps.DirectionsService();
      this.directionsDisplay = new google.maps.DirectionsRenderer();
    })
    var self = this
    this.$refs.gmap.$mapPromise.then(map => {
      self.map = map
    });
    this.marker = this.$refs.markers
    this.finishedMarker = this.$refs.finishMarkers
    this.driverMarker = this.$refs.driverMarker
    this.mapModel = this.$refs.gmap
    this.getRequestInfo(this.$route.params.reqId)
  },
  watch: {
    $route(to, from) {
      this.initializeValues()
      console.log('change value and request to server', this.$route.query.refresh)
      this.getRequestInfo(this.$route.params.reqId)
    }
  }
}
</script>

<style lang="css">
  #map {
    min-height: calc(100vh - 90px);
  }

  .autocomplete-input {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    outline: 0;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 65%;
  }

  .container {
    position: absolute;
    top: 15px;
    left: 15px;
    z-index: 99;
  }
</style>
