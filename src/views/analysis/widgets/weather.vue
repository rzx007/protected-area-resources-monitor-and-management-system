<!--
 * @Author: 阮志雄
 * @Date: 2021-10-16 13:09:24
 * @LastEditTime: 2021-10-16 15:32:51
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\views\analysis\widgets\weather.vue
-->
<template>
  <div class="analysis-item">
    <div class="title">天气情况</div>
    <div class="container">
      <div class="weather-side">
        <div class="weather-gradient"></div>
        <div class="date-container">
          <h2 class="date-dayname">Tuesday</h2>
          <span class="date-day">15 Jan 2019</span><i class="location-icon" data-feather="map-pin"></i>
        </div>
        <div class="weather-container">
          <i class="weather-icon" data-feather="sun"></i>
          <h1 class="weather-temp">29°C</h1>
          <h3 class="weather-desc">Sunny</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,700,900&display=swap');
.analysis-item {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  @include font_color(null);
  @include content-background();
  border-radius: 10px;
  @include box-shadow();
  .title {
    font-weight: bold;
    font-size: 19px;
  }
  .container {
    width: 100%;
    color: #ffffff;
    height: 200px;
    padding-top: 12px;
  }

  .weather-side {
    position: relative;
    height: 100%;
    border-radius: 10px;
    background-image: url('https://images.unsplash.com/photo-1559963110-71b394e7494d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80');
    box-shadow: 0 0 20px -10px rgba(0, 0, 0, 0.2);
    transition: -webkit-transform 300ms ease;
    transition: transform 300ms ease;
    transition: transform 300ms ease, -webkit-transform 300ms ease;
    transform: translateZ(0) scale(1.02) perspective(1000px);
  }

  // .weather-side:hover {
  //   transform: scale(1.1) perspective(1500px) rotateY(10deg);
  // }
  .weather-gradient {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-image: linear-gradient(135deg, #72edf2 10%, #5151e5 100%);
    border-radius: 10px;
    opacity: 0.8;
  }

  .date-container {
    position: absolute;
    top: 25px;
    left: 25px;
  }

  .date-dayname {
    margin: 0;
  }

  .date-day {
    display: block;
  }

  .location {
    display: inline-block;
    margin-top: 10px;
  }

  .location-icon {
    display: inline-block;
    height: 0.8em;
    width: auto;
    margin-right: 5px;
  }

  .weather-container {
    position: absolute;
    bottom: 25px;
    left: 25px;
  }

  .weather-icon.feather {
    height: 60px;
    width: auto;
  }

  .weather-temp {
    margin: 0;
    font-weight: 700;
    font-size: 3em;
  }

  .weather-desc {
    margin: 0;
  }

  .info-side {
    position: relative;
    float: left;
    height: 100%;
    padding-top: 25px;
  }

  .today-info {
    padding: 15px;
    margin: 0 25px 25px 25px;
    /* 	box-shadow: 0 0 50px -5px rgba(0, 0, 0, 0.25); */
    border-radius: 10px;
  }

  .today-info > div:not(:last-child) {
    margin: 0 0 10px 0;
  }

  .today-info > div .title {
    float: left;
    font-weight: 700;
  }

  .today-info > div .value {
    float: right;
  }
}
</style>
