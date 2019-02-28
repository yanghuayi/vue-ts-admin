<template>
  <div :class="{'hidden': spinning, 'fullScreen': fullScreen}" class="loader">
    <div class="warpper">
      <div class="inner"/>
      <div class="txt">LOADING...</div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Emit, Vue, Inject, Provide,
} from 'vue-property-decorator';

@Component

export default class Loader extends Vue {
  @Prop() private spinning!: boolean;

  @Prop() private fullScreen!: boolean;
}
</script>

<style lang="less" scoped>
.loader {
  display: block;
  background-color: #fff;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100000;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  text-align: center;

  &.fullScreen {
    position: fixed;
  }

  .warpper {
    width: 100px;
    height: 100px;
    display: inline-flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .inner {
    width: 40px;
    height: 40px;
    margin: 0 auto;
    text-indent: -12345px;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
    border-right: 1px solid rgba(0, 0, 0, 0.08);
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    border-left: 1px solid rgba(0, 0, 0, 0.7);
    border-radius: 50%;
    z-index: 100001;

    animation: spinner 600ms infinite linear;
  }

  .text {
    width: 100px;
    height: 20px;
    text-align: center;
    font-size: 12px;
    letter-spacing: 4px;
    color: #000;
  }

  &.hidden {
    z-index: -1;
    opacity: 0;
    transition: opacity 1s ease 0.5s, z-index 0.1s ease 1.5s;
  }
}
@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
