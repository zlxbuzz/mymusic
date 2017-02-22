<template>
<div>
    <audio   style="display:none" ref="aud" autoplay="autoplay"  :src="getSong.src" controls="controls"></audio>
    <div class="bz-play">
        <img :src="getMusic.pic_small" alt="zlx" class="bz-play-img">
        <p class="bz-play-list">{{getMusic.title}}</p>
        <p class="bz-play-list">{{getMusic.author}}</p>
    </div>
</div>
</template>
<script>
import {mapActions,mapGetters} from 'vuex'

export default {
    computed:{
        ...mapGetters([`getSong`,`getMusic`,`getSongList`])
    },
    mounted(){
        this.$refs.aud.addEventListener('ended',()=>{
            //todo 单曲，循环
            //暂时随机
            this.play(this.getSongList.filter(v=>v.song_id!=this.getMusic.song_id)[parseInt((this.getSongList.length-1)*Math.random())])
            //this.$refs.aud.play();
        });
    },
    methods:{
        ...mapActions([`play`]),
    }
}
</script>
<style>
@component-namespace bz{
    @b play{
        width:100%;
        height:100px;
        position:fixed;
        background:#49c8fb;
        display:flex;
        align-items: center;
        bottom:0;
        @e img{
            width:100px;
        }
        @e start{
            position:absolute;
            right:10px;
        }
    }
}

</style>
