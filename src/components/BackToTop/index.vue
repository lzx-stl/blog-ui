<template>
  <div class="top-container" :style="customStyle" v-show="visible"
  @click="backToTop">
  </div>
</template>

<script>
export default {
  props: {
    visibilityHeight: {
      type: Number,
      default: 780
    },
    backPosition: {
      type: Number,
      default: 0
    },
    customStyle: {
      type: Object,
      default: function() {
        return {
          right: '40px',
          bottom: '100px',
          width: '70px',
          height: '600px',
          'border-radius': '4px',
          'line-height': '45px',
          background: 'transport'
        }
      }
    },
    transitionName: {
      type: String,
      default: 'fade'
    }
  },
  data() {
    return {
      visible: false,
      interval: null,
      isMoving: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
    if (this.interval) {
      clearInterval(this.interval)
    }
  },
  methods: {
    handleScroll() {

      this.visible = window.pageYOffset > this.visibilityHeight
    },
    easeInOutQuad(t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t + b
      return -c / 2 * (--t * (t - 2) - 1) + b
    },
    backToTop() {
      if (this.isMoving) return
      const start = window.pageYOffset
      let i = 0
      this.isMoving = true
      this.interval = setInterval(() => {
        const next = Math.floor(this.easeInOutQuad(10 * i, start, -start, 500))
        if (next <= this.backPosition) {
          window.scrollTo(0, this.backPosition)
          clearInterval(this.interval)
          this.isMoving = false
        } else {
          window.scrollTo(0, next)
        }
        i++
      }, 16.7)
    }
  }
}
</script>

<style>
@keyframes back-top {
  0% {
    top: 0;
  }
  50% {
    top: -20px;
  }
  100% {
    top: 0;
  }
}

.top-container {
  position: fixed;
  z-index: 40;
  background-image: url('../../assets/top.png');
  background-size: 100% 100%;
  background-color: transparent;
  border: 0;
  border-radius: 0;
  cursor: pointer;
  animation-name: back-top;
  animation-timing-function: ease-in-out;
  /* animation-delay: 0.3s; */
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  transition: all .5s ease-in-out;
}

.top-container:hover {
  background-color: transparent;
  border: 0;
  box-shadow: none;
}
</style>
