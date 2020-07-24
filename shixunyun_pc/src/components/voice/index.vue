<template>
  <div class="record">
      <h1>{{tipMsg}}</h1>
      <button @click="onStartVoice">开始</button>
      <button @click="onEndVoice">结束</button>
      <button @click="onPlayAudio">播放</button>
      <div class="record-play"
           v-show="isFinished">
        <h2>Current voice player is:</h2>
        <audio id="audioVoice"
               controls
               autoplay>
        </audio>
      </div>
    </div>
</template>
<script>
import Record from '@/recorderxs/record-sdk'
export default {
  name: 'voice',
  data () {
    return {
      isVoice: false,
      isFinished: false,
      tipMsg: '录音',
      audio: '',
      recorder: new Record()
    }
  },
  methods: {
    // 开始录音
    onStartVoice () {
      this.onStopAudio()
      this.isFinished = false
      this.recorder.startRecord({
        success: res => {
          this.isVoice = true
        },
        error: e => {
          this.isVoice = false
          this.$toast(e)
        }
      })
    },

    // 结束录音
    onEndVoice () {
      this.isFinished = false
      this.recorder.stopRecord({
        success: res => {
          this.isVoice = false
          // 此处可以获取音频源文件(res)，用于上传等操作
          console.log('音频源文件', res)
          const config = {
            headers: { 'Content-Type': 'multipart/form-data' }
          }
          let formData = new FormData()
          let blob = new Blob([res])
          //formData.append('file', res, 'a.mp3')
          formData.append('file', blob, 'a.mp3')
          console.log(blob)
          this.$axios.post(this.$location.uploadVoice, formData, config)
            .then(response => {
              console.log(response.data)
            })
            .catch(function (error) {
              // 请求失败处理
              console.log('查询请求处理失败')
              console.log(error)
            })
        },
        error: e => {
          this.isVoice = false
        }
      })
    },

    // 播放录音
    onPlayAudio () {
      this.isVoice = false
      this.isFinished = true
      this.audio = document.getElementById('audioVoice')
      this.recorder.play(this.audio)
    },

    // 停止播放录音
    onStopAudio () {
      this.recorder.clear(this.audio)
    }
  }
}
</script>
