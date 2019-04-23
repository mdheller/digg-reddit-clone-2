<template>
    <div class="container" style="padding-top: 40px">
        <div class="row">
            <div class="col-sm-5 col-sm-offset-3 col-md-6 col-md-offset-3">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="title" v-model="topic.title">
                        </div>
                        <div class="form-group">
                            <textarea class="form-control" rows="5" placeholder="topic content" @keyup="checklength" v-model="topic.content"></textarea>
                        </div>
                        <span>{{topic.content.length}} / 255</span>
                        <button class="btn btn-success pull-right" @click="tosubmit">Create Topic</button>
                    </div>
                </div>
                <div class="row" style="margin-top: 20px">
                    <div class="col-sm-12">
                        <div class="list-group">
                            <div class="list-group-item" v-for="(item, i) in gettopic" :key="i">
                                <h4 class="list-group-item-heading">{{item.title}}</h4>
                                <p class="list-group-item-text">{{item.content}}</p>
                                <button style="margin: 5px" class="btn btn-default" type="submit" @click="item.upvote++"><i class="glyphicon glyphicon-triangle-top"></i> {{item.upvote}}</button> 
                                <button style="margin: 5px" class="btn btn-default" type="submit" @click="item.downvote++"><i class="glyphicon glyphicon-triangle-bottom"></i> {{item.downvote}}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import _ from 'lodash'
export default {
  data () {
    return {
      topic: { title: '', content: '' },
      topics: []
    }
  },
  computed: {
    gettopic (){
      return this.topics.slice(0, 20)
    }
  },
  methods: {
    // check if text length more than 255
    checklength () {
      const size = this.topic.content.length
      // if counted more than 225
      if(size > 255) {
        // get fist 255 character
        let content = this.topic.content.slice(0, 255)
        this.topic.content = content
      }
    },  
    tosubmit () {
      // check if topic title is empty
      if(this.topic.title.length === 0) {
        alert('title can`t empty')
        return
      }
      // check if topic content is empty
      if(this.topic.content.length === 0) {
        alert('topic conent can`t empty')
        return
      }
      // push topic list
      this.topics.push(Object.assign({ upvote: 0, downvote: 0 }, this.topic))
      // empty form content
      this.topic = { title: '', content: '' }
    },
    sorting () {
      // orderBy upvote and sort desc
      this.topics = _.orderBy(this.topics, ['upvote'], ['desc'])
    }
  },
  created () {
    this.debounced = _.debounce(this.sorting, 2000)
  }
}
</script>
