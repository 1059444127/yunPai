<template>
    <div class="educationalvideo-content">
      <div class="content-title">{{pageTitle}}</div>
      <div class="content-list">
        <ul>
          <li class="content-item pointer"
              v-for="item in dataList" 
              v-bind:key="item.index"
              @click="playVideo(item.path)">
              <div class="video-info">
                <div class="video-play">
                  <div class="video-play-icon"/>
                </div>
                <div>
                  <p class="video-title">{{item.name}}</p>
                  <p class="video-speaker">{{item.speaker}}</p>
                  <p class="video-time">{{item.time}}</p>
                </div>
              </div>
          </li>
        </ul>
      </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import * as apiConfig from "./../../api/config";

@Component({
  components: {}
})
export default class EducationalVideo extends Vue {
  pageTitle: string = "教学视频点播";

  dataList: {}[] = [
    {
      index: "2-1",
      icon: "",
      path: "/",
      time: "2017-12-06 15:33",
      speaker: "主讲人 : 宋志刚",
      name: "嗅神经母细胞瘤的诊断及鉴别诊断"
    },
    {
      index: "2-2",
      icon: "",
      path: "/",
      time: "2017-12-07 09:23",
      speaker: "主讲人 : 张进功",
      name: "局部解剖学操作指导-器械"
    },
    {
      index: "2-3",
      icon: "",
      path: "/",
      time: "2017-12-06 11:04",
      speaker: "主讲人 : 潘自强",
      name: "霍奇金淋巴瘤"
    },
    {
      index: "2-4",
      icon: "",
      path: "",
      time: "2017-12-02 13:55",
      speaker: "主讲人 : 李明",
      name: "室管膜下瘤的诊断与鉴别诊断"
    },
    {
      index: "2-5",
      icon: "",
      path: "",
      time: "2017-12-06 11:04",
      speaker: "主讲人 : 潘自强",
      name: "霍奇金淋巴瘤"
    },
    {
      index: "2-6",
      icon: "",
      path: "",
      time: "2017-12-02 13:55",
      speaker: "主讲人 : 李明",
      name: "室管膜下瘤的诊断与鉴别诊断"
    }
  ];

  playVideo(val: any) {
    // 确保是在网站的根目录下打开
    var rootPath = window.location.href.split("#")[0];
    window.open(rootPath + "#/videoplaypage");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.educationalvideo-content {
  position: relative;
  width: 100%;
  height: 100%;

  .content-title {
    height: 40px;
    line-height: 40px;
    padding-left: 5px;
    font-size: 18px;
    color: #42e0b7;
    width: 100%;
    border-bottom: 1px solid #eee;
    font-weight: bold;
  }

  .content-list {
    ul {
      overflow: hidden;
      padding: 0;
      margin: 0;

      .content-item {
        float: left;
        padding: 20px;
        width: 270px;
        margin: 20px 30px 0 0;
        height: 270px;
        border: 1px solid lightgray;

        &:hover {
          border: 1px solid gray;

          .video-play-icon {
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5)
              url("./../../assets/image/education_play_icon.png") no-repeat
              center;
            background-size: 50px 50px;
          }
        }
        .video-info {
          .video-play {
            background: url("./../../assets/image/company_image_demo.png") no-repeat;
            width: 100%;
            height: 130px;
            margin-bottom: 10px;
          }

          .video-title {
            height: 40px;
            color: gray;
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 5px;
          }

          .video-speaker {
            color: gray;
            font-size: 12px;
            margin-bottom: 5px;
          }

          .video-time {
            font-size: 12px;
            color: gray;
          }
        }
      }
    }
  }
}
</style>
