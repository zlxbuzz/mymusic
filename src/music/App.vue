<style>

  .footer {
    border  : 1px solid darkcyan; /*no*/
    padding : 20px;
  }

  .hl {
    color : #00aeff;
  }

</style>

<template>
  <div class="app">
    <bz-header></bz-header>
    <bz-body :data="lists"></bz-body>
    <bz-play></bz-play>
  </div>
</template>

<script>
  import bzHeader from './components/bz/header.vue'
  import bzBody from './components/bz/body.vue'
  import bzPlay from './components/bz/play.vue'

  import {mapActions,mapGetters} from 'vuex'
  export default {
    data () {
      return {
          lists:[]
      }
    },
    computed:{
        ...mapGetters([`getSong`])
    },
    methods:{
        ...mapActions([`newList`]),
        async init(){
            const data = await this.newList();
            this.lists = data.song_list;
        }
    },
    mounted(){
        this.init();
    },
    components : {
        bzHeader,
        bzPlay,
        bzBody
    }
  }
</script>

