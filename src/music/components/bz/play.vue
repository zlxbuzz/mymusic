<template>
<div>
    <audio autoplay="autoplay" style="display:none" :src="getSong" controls="controls"></audio>
    <div class="bz-play">
            <i style="font-size:32px" :class="{'ion-ios-pause' : getSong , 'ion-ios-play':!getSong}"  class="bz-play-start" ></i>
    </div>
</div>
</template>
<script>
import {mapActions,mapGetters} from 'vuex'

export default {
    computed:{
        ...mapGetters([`getSong`])
    }
}
</script>
<style>
@component-namespace bz{
    @b play{
        width:100%;
        height:100px;
        position:absolute;
        display:flex;
        align-items: center;
        bottom:0;
        border:1px solid red;
        @e start{
            position:absolute;
            right:10px;
        }
    }
}

</style>
