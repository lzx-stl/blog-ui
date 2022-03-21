<template>
  <div class="comment-item">
    <Card :obj="obj"/>
    <Table :parentId="obj.id"/>
    <div class="comment-send" v-if="obj.id == target">
      <Reply
          :data="{'toId': target,
             'parentId': obj.id
      }"/>
    </div>
  </div>
</template>

<script>
import Card from '../components/Card'
import Table from "./Table";
import Reply from "./Reply";
import {mapState} from 'vuex'

export default {
  name: "Item",
  components: {
    Card, Table, Reply
  },
  props: ['obj'],
  computed: {
    ...mapState({
      target: state => state.comment.target
    }),
  }
};
</script>

<style>


.comment-item {
  float: left;
  width: 100%;
  min-height: 40px;
  border-top: 1px solid #e5e9ef;
}

.comment-item
.reply-container {
  width: 90%;
  float: right;
}

.comment-send {
  width: 100%;
  min-height: 70px;
  float: left;
}

.comment-send
.comment-user {
  width: 535px;
  overflow: auto;
}

.comment-send
.comment-user .reply-input {
  width: 70%;
}
</style>
