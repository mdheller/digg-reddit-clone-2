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
                            <textarea class="form-control" rows="5" placeholder="topic content" v-model="topic.content"></textarea>
                        </div>
                        <span>{{topic.content.length}} / 255</span>
                        <button class="btn btn-success pull-right" @click="tosubmit">Create Topic</button>
                    </div>
                </div>
                <div class="row" style="margin-top: 20px">
                    
                </div>
            </div>
        </div>
    </div>
</template>
<script>
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
    }
  }
}
</script>
