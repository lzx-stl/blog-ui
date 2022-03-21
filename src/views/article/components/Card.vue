<template>

  <div class="comment-card">
    <div class="user-avatar-img">
      <img :src="from.avatar" alt="">
    </div>
    <div class="con">
      <div class="user-name">{{from.name}}
      </div>
      <p class="con-text">
        {{obj.content}}
      </p>
      <div class="con-msg">
        <span>{{ getTime }}</span>
        <span><i class="iconfont icon-zhichi"> {{obj.up}}</i></span>
        <span><i class="iconfont icon-buzhichi">{{ obj.down }}</i></span>
        <span @click="change">回复</span>
      </div>
    </div>
  </div>

</template>

<script>
import {getComment} from '@/api/comment'
import {getInformation} from '@/api/user'
import moment from "moment/moment";
export default {
  name: 'Card',
  props:['obj'],
  data() {
    return {
      from: {},
      to: {},
      formatStr: 'YYYY-MM-DD HH:mm:ss'
    }
  },mounted() {
    this.getSrc();
    this.getTarget();
  },computed:{
    //格式化日期

    getTime(){
      let time = moment(this.obj.replyTime).format(this.formatStr);
      return time;
      // let delay = moment("20120901", this.formatStr).fromNow();
      // return moment(time).startOf('seconds').fromNow();
      // < 24 ;
    }
  },methods:{
    getSrc(){
      console.log(this.obj)
      getInformation(this.obj.fromId).then(res => {
        console.log("源: " + res)
        this.from = res;
      })
    },getTarget(){
      if(!this.obj.parentId || this.obj.toId === this.obj.parentId)  return '';
      let name = null;
      getInformation(this.obj.toId).then(res => {
        this.to = res;
      })
      return '回复@' + name;
    },
    change(){
      this.$store.dispatch('comment/change', this.obj.parentId ? this.obj.parentId : this.obj.id );
    }
  }
}
</script>

<style>
.comment-card{
  width: 100%;
  float: left;
  min-height: 40px;
}

.user-avatar-img{
  float: left;
  width: 82px;
  height: 48px;
  box-sizing: border-box;
  margin-top: 24px;
  position: relative;

}

.user-avatar-img img{
  width: 48px;
  height: 48px;
  cursor: pointer;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.con{

  float: left;
  width: 655px;
  height: 100%;
  box-sizing: border-box;
  padding: 22px 22px 14px 0;
}

.user-name{
  cursor: pointer;
  color: #FB7299;
  line-height: 18px;
  height: 18px;
  margin: 2px 0;
  font-weight: bold;
}


.con-text{
  font-size: 15px;
  color: #222222;
  margin: 10px 0;
}

.con-msg{
  color: #99a2aa;
  font-size: 14px;
  height: 14px;
  line-height: 14px;
}

.con-msg > span{
  padding-right:15px;
  cursor: pointer;
}

</style>