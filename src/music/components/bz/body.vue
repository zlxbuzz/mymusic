<template>
<div class="fix-overflow-scrolling">
  <div v-for="i in data" class="bz-lists">
    <img :src="i.pic_small" alt="zlx" class="bz-lists-img">
    <p class="bz-list">{{i.title}}</p>
    <p class="bz-list">{{i.author}}</p>
    <i @click="playSong(i)" style="font-size:32px" :class="{'ion-ios-pause' : getSong.id==i.song_id , 'ion-ios-play':getSong.id != i.song_id}" class="bz-list-play"></i>
  </div>
</div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
export default {
    props : {
        data : Array
    },
    computed:{
        ...mapGetters([`getSong`])
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
.bz-lists{
    font-size:15px;/*!no*/
}
@component-namespace bz{
    @b lists {
        height:200px;
        display:flex;
        align-items:center;
        position:relative;
        @e img{
            width:150px;
            height:150px;
        }
    }
    @b list{
        margin-left:15px;
        max-width:200px;
        @e play{
            position:absolute;
            right:50px;
        }
    }
}
</style>
