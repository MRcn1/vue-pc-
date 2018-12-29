<template>
    <div class='home2'>
        <div id="app">
            <div class="loading-demo">
                <loading :dot-color-val="dotColor" :dot-nums="dotNums" :loading-radius-val="loadingRadius" :dot-radius-val="dotRadius" :style="changeStyle"></loading>
            </div>
            <!-- <loading></loading> -->
            
            <div class="control">
                <div class="control-form">
                    <label for="dotNums">圆点个数:</label>
                    <input type="number" step="1" min="10" max="20" id="dotNums" v-model.number="dotNums"   />
                </div>
                <div class="control-form">
                    <label for="loadingRadius">容器半径:</label>
                    <input type="range" min="50" max="200" step="1" id="loadingRadius" v-model.number="loadingRadius"  />
                </div>
                <div class="control-form">
                    <label for="dotRadius">圆点半径:</label>
                    <input type="range" min="8" max="30" step="1" id="dotRadius" v-model.number="dotRadius"  />
                </div>
                <div class="control-form">
                    <label for="dotColor">圆点颜色:</label>
                    <input type="color" v-model="dotColor" id="dotColor"  />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import loading from "../loading/component/loading";
export default {
  data() {
    return {
      loadingRadius: 168,
      dotRadius: 20,
      dotColor: "#ff3366",
      dotNums: 12
    };
  },

  components: {
    loading
  },

  created() {},

  methods: {},
  computed: {
    changeStyle: function() {
      let rootEle = document.documentElement;
      rootEle.style.setProperty("--loadingRadius", `${this.loadingRadius}px`);
      rootEle.style.setProperty("--dotRadius", `${this.dotRadius}px`);
      rootEle.style.setProperty("--dotColor", this.dotColor);
    }
  }
};
</script>

<style scoped lang='less'>

body {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
#app {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  
  > div {
    margin: 0 2rem;
  }
}

:root {
  --loadingRadius: 168px;
  --dotRadius: 24px;
  --dotColor: #d8d8d8;
}


</style>

