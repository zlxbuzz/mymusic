<template>
<div>
  <div v-for="i in data" class="bz-lists">
    <p class="bz-list">{{i.title}}</p>
    <p class="bz-list">{{i.author}}</p>
    <p @click="playSong(i.song_id)" class="bz-list-play"></p>
  </div>
</div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
    props : {
        data : Array
    },
    methods:{
        ...mapActions([`play`]),
        async playSong(songid){
            const data = await this.play(songid)
        }
    }
}
</script>
<style>
@component-namespace bz{
    @b lists {
        height:100px;
        display:flex;
    }
    @b list{
        margin-left:15px;
        @e play{
            width:30px;
            height:30px;
            border:1px solid red;
        }
    }
}
</style>
