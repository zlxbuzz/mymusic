<template>
    <div class="bz-header">
      ding 音乐
    </div>
</template>
<style>
@component-namespace bz{
    @b header{
        width:100%;
        height:100px;
        background:#49c8fb;
        position:relative;
        top:0;
        display:flex;
        align-items:center;
        padding-left:100px;
        z-index:101;
    }
}
</style>
<script>
export default{
    data(){
        return {
            test:[]
        }
    },
    mounted(){
        this.test.push(1)
        console.log(this.test);
    }
}
</script>
