<template>
  <div id="recording">
      <div class="card">
        <div class="card-content" id="holder">
            <h1 class="title">Starfish Prime</h1>
        </div>
      </div>
  </div>
</template>
<script>

/* eslint new-cap: "off" */
import p5 from 'p5'
import 'p5/lib/addons/p5.sound'
export default {
  name: 'Recording',
  data () {
    return {
      p: {}
    }
  },
  mounted () {
    console.log('creating sketch')
    this.p = new p5(sketch => {
      let song = null
      let fft = new p5.FFT()
      sketch.preload = () => {
        console.log('loading song')
        song = sketch.loadSound(require('../assets/starfish-prime.mp3'))
      }
      sketch.setup = () => {
        sketch.createCanvas(800, 200)
      }
      sketch.draw = () => {
        sketch.background(0)
        let waveform = fft.waveform()
        sketch.noFill()
        sketch.beginShape()
        sketch.stroke(255, 0, 0)
        sketch.strokeWeight(3)
        let i = 0
        for (var sample of waveform) {
          let x = sketch.map(i++, 0, waveform.length, 0, sketch.width)
          let y = sketch.map(sample, -1, 1, 0, sketch.height)
          sketch.vertex(x, y)
        }
        sketch.endShape()
      }
      sketch.mousePressed = () => {
        if (song == null) {
          console.log('song is null')
          return
        }
        if (song.isPlaying()) {
          song.stop()
          sketch.background(255, 0, 0)
        } else {
          song.play()
          sketch.background(0, 255, 0)
        }
      }
    }, 'holder')
  },
  beforeDestroy () {
    console.log('destroying sketch')
    this.p = {}
  }
}
</script>
<style lang="sass">

</style>
