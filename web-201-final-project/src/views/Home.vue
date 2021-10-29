<template>
  <div class="container w-10/12 mx-auto lg:flex lg:flex-col lg:justify-center lg:h-screen">
    <div v-if="locationPermission">
      <header class="flex flex-col py-5 m-0 lg:justify-between lg:flex-row">
        <h1 class="mb-3 text-xl font-semibold lg:text-3xl lg:mb-0">
          Hello
          <span class="text-red-600">{{ weather.timezone.split("/")[1] }}!</span>
        </h1>
        <div class="date-time">
          <div class="text-base font-semibold lg:text-3xl date">
            {{ this.getToday }}
          </div>
          <div class="text-base font-medium lg:text-xl time">{{ this.getTime }}</div>
        </div>
      </header>
      <div class="flex flex-col justify-between row lg:flex-row">
        <div class="box primary-box">
          <div class="flex flex-row justify-between w-full info">
            <div class="flex flex-col justify-center">
              <span class="mb-2 text-6xl">{{
                  Math.round(parseFloat(weather.current.temp), 10)
                }}&deg;</span>
              <span class="text-2xl font-light">{{
                weather.current.weather[0].main
              }}</span>
            </div>
            <div class="flex flex-col items-end">
              <figure class="flex flex-col w-32 h-32">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  shape-rendering="geometricPrecision"
                  text-rendering="geometricPrecision"
                  image-rendering="optimizeQuality"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  viewBox="0 0 64 64"
                >
                  <circle
                    r="22.97"
                    transform="rotate(15 -105.53 137.532) scale(.56228)"
                    fill="#ffc106"
                  />
                  <path
                    d="M32 12.4v2m-9.8.63c.76 1.32 1 1.73 1 1.73m-8.17 5.44c1.32.76 1.73 1 1.73 1M12.4 32h2m.63 9.8c1.32-.76 1.73-1 1.73-1m5.44 8.17c.76-1.32 1-1.73 1-1.73M32 51.6v-2m9.8-.63c-.76-1.32-1-1.73-1-1.73m8.17-5.44c-1.32-.76-1.73-1-1.73-1M51.6 32h-2m-.63-9.8c-1.32.76-1.73 1-1.73 1m-5.44-8.17c-.76 1.32-1 1.73-1 1.73"
                    fill="none"
                    stroke="#ffc106"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="bevel"
                    stroke-miterlimit="22.926"
                  />
                </svg>
              </figure>
              <div class="py-2 m-0 text-xl font-light text-center text-gray-900">
                Feels like
                <span class="font-semibold">{{
                    Math.round(parseFloat(weather.current.feels_like), 10)
                  }}&deg;</span>
              </div>
            </div>
          </div>
        </div>
        <div class="box primary-box">
          <div class="flex flex-row justify-between w-full info">
            <div class="flex flex-col justify-center">
              <span class="mb-2 text-6xl">{{ this.getWindName }}</span>
              <span class="text-2xl font-light">{{
                  (parseFloat(weather.current.wind_speed) * 3.6).toFixed(2)
                }}
                km/h</span>
            </div>
            <div class="flex flex-col items-end">
              <figure class="w-32 h-32 overflow-hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <g
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                  >
                    <path
                      class="arrow-grey"
                      :style="{transform:this.getCompassWay}"
                      fill="#D8D9D9"
                      d="M254.819 431.843L222.697 255.58l32.128-175.643 32.271 175.634z"
                    />
                    <path
                      class="arrow-red"
                      :style="{transform:this.getCompassWay}"
                      fill="#E1584B"
                      d="M253.777 80.274l32.271 175.634-64.399.009z"
                    />
                    <path
                      opacity="0.85"
                      fill="#383838"
                      d="M151.088 75.725C250.44 18.364 377.442 52.39 435.04 152.153c57.362 99.353 23.33 226.358-76.022 283.72-99.764 57.598-226.764 23.563-284.125-75.789-57.599-99.764-23.57-226.76 76.194-284.359zM127.055 34.1C4.513 104.85-37.48 261.574 33.27 384.117c70.516 122.138 227.244 164.138 349.786 93.388 122.139-70.517 164.135-227.25 93.619-349.388C405.924 5.574 249.194-36.417 127.055 34.1z"
                    />
                  </g>
                </svg>
              </figure>
              <div class="py-2 m-0 text-xl font-light text-center text-gray-900">
                Wind Gust
                <span class="font-semibold">{{
                    (parseFloat(weather.current.wind_gust) * 3.6).toFixed(2)
                  }}
                  km/h</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col justify-between pb-5 lg:flex-row">
        <div class="box secondary-box">
          <div class="w-12 h-12 mr-5">
            <svg
              data-name="Layer 1"
              id="Layer_1"
              viewBox="0 0 272 272"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs />
              <ellipse
                class="cls-1"
                cx="136"
                cy="136.89"
                rx="78.81"
                ry="79.36"
              />
              <path
                class="cls-1"
                d="M136 8l-17.11 29.84h34.22L136 8zM264 136.88l-29.63 17.23v-34.45L264 136.88zM8 136.88l29.63 17.23v-34.45L8 136.88zM45.49 45.75l8.85 33.28 24.2-24.36-33.05-8.92zM226.51 45.75l-33.05 8.92 24.2 24.36 8.85-33.28zM136 264l-17.11-29.84h34.22L136 264zM45.49 226.25l8.85-33.28 24.2 24.36-33.05 8.92zM226.51 226.25l-33.05-8.92 24.2-24.36 8.85 33.28z"
              />
            </svg>
          </div>
          <div class="item">
            <div class="text-2xl font-semibold item-name">UV Index</div>
            <div class="font-light item-value">{{ weather.current.uvi }}</div>
          </div>
        </div>
        <div class="box secondary-box">
          <div class="w-12 h-12 mr-5"><svg
              viewBox="0 0 320 320"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M238.1 179.9c0 43.1-34.9 78.1-78.1 78.1s-78-35-78-78.1 78-117.2 78-117.2 78.1 74 78.1 117.2z"
                fill="#43B1BF"
              />
              <path
                d="M169.8 248.2c-43.1 0-78.1-35-78.1-78.1 0-33.5 46.8-85.4 67.9-107C155.3 67.2 82 138 82 179.9c0 43.1 34.9 78.1 78 78.1 24 0 45.5-10.9 59.8-28-13.5 11.4-31 18.2-50 18.2z"
                fill="#66D0D8"
              />
              <path d="M160 260c-44.1 0-80-35.9-80-80.1 0-14.3 8.2-33.2 24.4-56.2l3.2 2.3c-15.7 22.4-23.7 40.5-23.7 54 0 42 34.1 76.2 76.1 76.2s76.1-34.2 76.1-76.2c0-38.8-65.8-104.4-76.1-114.5-4.7 4.6-21.3 21-37.6 41.1l-3-2.5c19.4-23.8 39.1-42.5 39.3-42.7L160 60l1.3 1.3c3.2 3 78.7 75.1 78.7 118.6 0 44.1-35.9 80.1-80 80.1z" />
              <circle
                cx="135.6"
                cy="204.3"
                fill="#66D0D8"
                r="14.6"
              />
            </svg></div>
          <div class="item">
            <div class="text-2xl font-semibold item-name">Humidity</div>
            <div class="font-light item-value">{{ weather.current.humidity }}%</div>
          </div>
        </div>
        <div class="box secondary-box">
          <div class="w-12 h-12 mr-5"><svg
              id="Layer_1"
              version="1.1"
              viewBox="0 0 30 30"
              xml:space="preserve"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.955 13.553a2.273 2.273 0 00-2.27 2.27c0 .244.045.482.12.71-.106.015-.211.018-.318.043a3.956 3.956 0 00-1.119-.8c-.088-.042-.183-.056-.273-.09a3.87 3.87 0 013.86-3.736 3.842 3.842 0 013.837 3.483 4.4 4.4 0 00-1.023.404 3.602 3.602 0 00-.362.228c-.079.05-.145.116-.22.172.025-.135.04-.273.04-.412a2.275 2.275 0 00-2.272-2.272z"
                fill="#6c91e8"
              />
              <path
                d="M14.944 8.871c-4.099 0-6.789 3.093-6.789 7.192 0 .056.248.192-.609.153-.105.061-.232.574-.316.635-.381.243-.686.106-.937.463-.104-.018-.216-.014-.322-.024a9.153 9.153 0 01-.094-1.239c0-5.017 4.082-9.099 9.099-9.099s9.098 4.082 9.098 9.099c0 .212-.021.419-.035.627a3.67 3.67 0 00-1.134.076c-.155-.159-.783-.233-.96-.366.003-.09-.154-.077-.154-.168-.001-4.099-2.748-7.349-6.847-7.349z"
                fill="#82be00"
              />
              <path
                d="M1.033 16.219c0-7.79 6.338-14.484 14.127-14.484 7.79 0 14.127 6.694 14.127 14.484 0 1.674-.303 3.301-.872 4.853a3.82 3.82 0 00-.318-.18 3.45 3.45 0 00-.315-.133c-.586-.394-1.05-1.462-1.302-1.971.207-.904.37-1.762.37-2.703 0-6.841-4.849-12.272-11.689-12.272-6.841 0-11.972 5.766-11.972 12.607 0 .915-.042 1.216.154 2.098.004.016.236.232.241.247-.202.307-.723 1.676-.858 2.067-.12.349-.356-.089-.357.31a3.215 3.215 0 00-.387.134 14.04 14.04 0 01-.949-5.057z"
                fill="#ff5a4e"
              />
              <path
                d="M13.98 17.091s-.58-.609-2.053 0c0 0-2.703-2.972-5.47.473 0 0-3.904-.002-3.927 3.647 0 0-4.936 2.797.928 5.045 0 0 1.772 3.282 4.628.657 0 0 3.35 2.689 5.137-.132 0 0 2.637 3.239 4.483.413 0 0 3.257 3.329 5.667-.328 0 0 6.272 3.127 5.913-4.174 0 0-.814-2.253-2.197-2.112 0 0-1.582-4.999-5.018-3.734 0 0-2.818-2.467-5.349.622-.001 0-2.258-.626-2.742-.377z"
                fill="#2cc0fe"
              />
              <path
                d="M15.161 6.431c-5.276 0-9.569 4.292-9.569 9.569 0 .398.041.794.09 1.187-.386.052-.78.188-1.218.426-.16.086-.737.632-.88.75-.109-.634-.148-1.906-.148-2.555 0-6.246 5.479-11.666 11.725-11.666 6.246 0 11.328 5.613 11.328 11.859 0 .598-.063 1.19-.155 1.775a3.548 3.548 0 00-.577-.511c-.447-.309-.99-.394-1.297-.49.02-.25.077-.362.077-.617-.001-5.277-4.101-9.727-9.376-9.727z"
                fill="#ffc83c"
              />
              <path
                d="M19.588 15.453c-.259-2.489-2.207-4.201-4.615-4.201-2.454 0-4.447 1.835-4.626 4.386a3.62 3.62 0 00-1.745.169c.098-3.637 2.916-6.566 6.374-6.566 3.45 0 6.263 2.916 6.372 6.543a3.61 3.61 0 00-1.76-.331z"
                fill="#00d7f0"
              />
              <path d="M28.994 21.54a4.993 4.993 0 00-.421-.46c.649-1.676.988-3.441.988-5.257 0-8.044-6.545-14.588-14.589-14.588S.384 7.779.384 15.823c0 1.847.352 3.639 1.022 5.34a2.776 2.776 0 00-.508.49c-.952 1.224-.897 2.902.13 3.902a2.696 2.696 0 001.894.749h.018c.43.75 1.07 1.31 1.785 1.555.614.212 1.163.271 1.675.184a3.35 3.35 0 001.585-.725c.683.637 1.662 1.011 2.638 1.011.138 0 .276-.008.413-.023a4.048 4.048 0 002.13-.915c.006-.005.008-.012.013-.017.381.412.827.73 1.315.898.641.221 1.212.283 1.743.192a3.5 3.5 0 001.664-.765c.711.671 1.737 1.064 2.76 1.064.144 0 .287-.008.429-.023a4.271 4.271 0 002.538-1.243c1.403.666 3.137.536 4.321-.35.907-.678 1.531-1.639 1.71-2.637.202-1.109-.042-2.193-.665-2.97zm-27.82-5.717c0-7.608 6.19-13.798 13.798-13.798 7.609 0 13.798 6.19 13.798 13.798a13.71 13.71 0 01-.852 4.74 3.505 3.505 0 00-.311-.176 3.19 3.19 0 00-.308-.13 5.613 5.613 0 00-.523-1.722 12.16 12.16 0 00.312-2.711c0-6.682-5.436-12.118-12.118-12.118S2.852 9.142 2.852 15.824c0 .894.097 1.783.289 2.644.004.016.014.027.019.042-.197.3-.372.631-.504 1.013a3.427 3.427 0 00-.18 1.108c-.13.034-.255.081-.378.131a13.76 13.76 0 01-.924-4.939zm13.906 1.17a3.525 3.525 0 00-1.4-.477 1.463 1.463 0 01-.189-.693 1.481 1.481 0 112.546 1.028c-.029.03-.047.066-.065.102-.12-.007-.233-.027-.361-.028-.175.003-.352.03-.531.068zm-.108-3.44a2.273 2.273 0 00-2.27 2.27c0 .244.045.482.12.71-.106.015-.211.018-.318.043a3.956 3.956 0 00-1.119-.8c-.088-.042-.183-.056-.273-.09a3.87 3.87 0 013.86-3.736 3.842 3.842 0 013.837 3.483 4.4 4.4 0 00-1.023.404 3.602 3.602 0 00-.362.228c-.079.05-.145.116-.22.172.025-.135.04-.273.04-.412a2.275 2.275 0 00-2.272-2.272zm4.613 1.753c-.259-2.35-2.204-4.146-4.613-4.146-2.454 0-4.45 1.912-4.629 4.321a3.82 3.82 0 00-1.745.16c.098-3.435 2.916-6.2 6.374-6.2 3.45 0 6.263 2.754 6.372 6.179a3.774 3.774 0 00-1.759-.314zm-4.613-6.655c-3.955 0-7.173 3.218-7.173 7.173 0 .054.003.107.004.16-.101.059-.202.12-.284.179a3.297 3.297 0 00-.926.88c-.101-.017-.209-.014-.311-.023a8.842 8.842 0 01-.091-1.196c0-4.841 3.938-8.779 8.779-8.779s8.778 3.938 8.778 8.779c0 .204-.02.404-.034.605a3.508 3.508 0 00-1.094.074 4.193 4.193 0 00-.486-.417c.003-.087.009-.174.009-.262.002-3.956-3.216-7.173-7.171-7.173zm0-2.396c-5.276 0-9.569 4.292-9.569 9.569 0 .398.041.794.09 1.187-.386.052-.78.188-1.218.426-.16.086-.308.195-.451.313a11.358 11.358 0 01-.18-1.926c0-6.246 5.082-11.328 11.328-11.328 6.246 0 11.327 5.082 11.327 11.328 0 .598-.063 1.19-.155 1.775a3.548 3.548 0 00-.577-.511 3.928 3.928 0 00-1.069-.509c.02-.25.042-.5.042-.755.001-5.277-4.292-9.569-9.568-9.569zm-2.308 20.529a3.25 3.25 0 01-1.714.739 3.115 3.115 0 01-2.642-1.01c-.072-.086-.213-.101-.324-.104l-.008-.001c-.11 0-.25.078-.325.156a2.586 2.586 0 01-1.383.702c-.377.066-.797.015-1.284-.151-.591-.203-1.123-.71-1.457-1.39a.403.403 0 00-.392-.219c-.595.054-1.159-.129-1.554-.514-.841-.82-.658-2.081-.058-2.853a2.06 2.06 0 01.451-.412c.025-.005.48-.343.967-.385.21-.018.358-.216.34-.426a2.79 2.79 0 01.125-1.137c.188-.546.557-1.275 1.247-1.649.439-.238.807-.352 1.161-.357.307-.01.589.025.875.094a.395.395 0 00.437-.189c.192-.336.476-.631.838-.863.092-.067.188-.126.286-.181.915-.502 1.936-.554 2.798-.146.388.184.744.457 1.031.789.102.119.31.149.459.104a2.51 2.51 0 011.501.009l-.013.006c-.951.516-1.44 1.467-1.684 2.175a3.612 3.612 0 00-.187 1.166 3.077 3.077 0 00-1.658 1.069c-.99 1.274-.932 3.018.135 4.06.521.51 1.228.787 1.999.779.023.041.053.074.078.114-.015.01-.032.013-.045.025zm16.22-2.411c-.145.803-.657 1.585-1.406 2.144-1.022.764-2.558.824-3.736.151a.395.395 0 00-.493.082c-.6.684-1.397 1.113-2.245 1.207-1.012.106-2.078-.276-2.714-.987l-.07-.081a.397.397 0 00-.291-.137c-.1.014-.219.043-.296.125l-.071.071c-.436.408-.898.643-1.457.738-.4.069-.842.017-1.354-.159-.624-.215-1.184-.749-1.536-1.464a.396.396 0 00-.392-.219 2.03 2.03 0 01-1.64-.543c-.888-.866-.696-2.197-.063-3.01a2.296 2.296 0 011.496-.841.396.396 0 00.34-.425 2.934 2.934 0 01.132-1.197c.198-.575.586-1.343 1.314-1.737.461-.251.85-.37 1.223-.376.325-.015.616.027.922.1a.392.392 0 00.436-.188c.202-.357.502-.667.881-.91.098-.069.199-.133.303-.191.964-.528 2.036-.584 2.944-.152.408.194.783.48 1.086.83.102.117.309.15.461.103.833-.255 1.684-.107 2.46.429.8.553 1.28 1.515 1.429 2.861.017.16.131.293.286.336.146.041.289.095.428.163.416.203.761.493 1.117.936.481.601.665 1.454.506 2.341z" />
            </svg></div>
          <div class="item">
            <div class="text-2xl font-semibold item-name">Clouds</div>
            <div class="font-light uppercase item-value">
              {{ weather.current.weather[0].description }}
            </div>
          </div>
        </div>
        <div class="box secondary-box">
          <div class="w-12 h-12 mr-5"><svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
            >
              <path
                d="M0 0h48v48H0z"
                fill="none"
              />
              <path d="M24 9C14 9 5.46 15.22 2 24c3.46 8.78 12 15 22 15 10.01 0 18.54-6.22 22-15-3.46-8.78-11.99-15-22-15zm0 25c-5.52 0-10-4.48-10-10s4.48-10 10-10 10 4.48 10 10-4.48 10-10 10zm0-16c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z" />
            </svg></div>
          <div class="item">
            <div class="text-2xl font-semibold item-name">Visibility</div>
            <div class="font-light item-value">
              {{ weather.current.visibility / 1000 }} km
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="flex flex-col items-center justify-center h-screen"
    >
      <div class="p-5 font-light text-red-700 bg-red-200 border border-l-8 border-red-700 border-solid rounded-md">
        <p>Location permission denied. Please check your browser settings.</p>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import moment from 'moment';
export default {
  name: "Home",
  components: {},
  props: {
    apiKey: {
      type: String,
      default: "YOUR_API_KEY"
    }
  },
  data () {
    return {
      loading: true,
      locationPermission: false,
      coordinate: {
        latitude: null,
        longitude: null,
        accuracy: null
      },
      weather: ""
    };
  },
  beforeMount () {
    this.findLocation();
  },
  computed: {
    getToday () {
      return moment().format('Do MMMM, YYYY');
    },
    getTime () {
      return moment().format('h:mm a');
    },
    getWindName () {
      const windArr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"];
      const windDeg = Number(this.weather.current.wind_deg.toFixed(1));
      const windIndex = Math.round(windDeg % 360 / 22.5 + 1, 10);
      return windArr[windIndex - 1];
    },
    getCompassWay () {
      return `rotate(${Number(this.weather.current.wind_deg.toFixed(1))}deg)`
    }
  },
  methods: {
    findLocation () {
      var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      navigator.geolocation.getCurrentPosition(
        this.locationSucces,
        this.locationError,
        options
      );
    },
    locationSucces (pos) {
      console.log(`Latitude : ${pos.coords.latitude}`);
      this.coordinate.latitude = pos.coords.latitude;
      console.log(`Longitude: ${pos.coords.longitude}`);
      this.coordinate.longitude = pos.coords.longitude;
      console.log(`More or less ${pos.coords.accuracy} meters.`);
      this.coordinate.accuracy = pos.coords.accuracy;
      this.getLocation();
    },
    locationError (err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
      this.locationPermission = false;
    },
    // getLocation () {
    //   axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.coordinate.latitude}&lon=${this.coordinate.longitude}&units=metric&appid=${this.apiKey}`)
    //     .then(response => {
    //       this.weather = response.data;
    //       this.locationPermission = true;
    //     }).catch(handleError => {
    //     // Very important to handle your error!!
    //       console.log(handleError);
    //     });
    // }
    async getLocation () {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${this.coordinate.latitude}&lon=${this.coordinate.longitude}&units=metric&appid=${this.apiKey}`
        );
        this.weather = response.data;
        this.locationPermission = true;
      } catch (error) {
        console.log(error);
        return -1;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  @apply border-2 border-solid border-gray-100 bg-white p-4 rounded-md mb-5;
}
.primary-box {
  @apply lg:w-6/12 lg:mr-5 flex flex-row lg:flex-col;
}
.primary-box:last-child {
  @apply mr-0;
}
.secondary-box {
  @apply lg:w-3/12 lg:mr-5 flex flex-row;
}
.secondary-box:last-child {
  @apply mr-0;
}
.arrow-red,
.arrow-grey {
  transform-origin: center;
}
</style>
