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
                                <button style="margin: 5px" class="btn btn-default" type="submit" @click="upvote(item.id, i)"><i class="glyphicon glyphicon-triangle-top"></i> {{item.upvote}}</button> 
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
import axios from 'axios'
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
    async tosubmit () {
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
      try {
        const resp = await axios.post('/create/topic', this.topic)
        if(resp && resp.status === 200) {
          // if topic success to submit
          // empty form content
          this.topic = { title: '', content: '' }
          const data = resp.data
          if(data.success) this.topics.push(data.result)
          else alert('there something a wrong')
        }
      } catch (error) {
        alert('getting error from back-end')
      }
    },
    async sorting () {
      // orderBy upvote and sort desc
      try {
        const resp = await axios.get('/topic/sorting')
        if(resp && resp.status === 200) {
          const data = resp.data
          if(data.success) {
            // sorting when back-end has been sort
            // sorting alway same if never change on outside
            this.topics = _.orderBy(this.topics, ['upvote'], ['desc'])
          }
          else alert('there something a wrong')
        }
      } catch (error) {
          
      }
    },
    async upvote (id, index) {
      try {
        const resp = await axios.get('/topic/upvote/' + id) 
        if(resp && resp.status === 200) {
          const data = resp.data
          if(data.success) {
            // update upvote number
            this.topics[index].upvote = data.result.upvote
            // this.debounced()
          } else alert('there something a wrong')
        }
      } catch (error) {
          alert('getting error from back-end')
      }
    }
  },
  created () {
    // debounce using lodash for waiting user finish hit the button
    this.debounced = _.debounce(this.sorting, 2000)
  }
}
</script>
