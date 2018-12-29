<template>
   <div class='mainContent'>
       <div class="content">
           
               <keep-alive>
                   <transition name="fade" mode="out-in">
                        <router-view v-if="$route.meta.keepAlive"></router-view>
                    </transition>
                </keep-alive>
                <transition name="fade" mode="out-in">
                    <router-view v-if="!$route.meta.keepAlive"></router-view>
                </transition>
       </div>
   </div>
</template>

<script>
export default {
    data () {
        return {

        }
    },
    components: {

    },
    created(){

    },
    methods: {

    },
 }
</script>

<style scoped lang='less'>
.content{
    width: 100%;
    background-color: #fff;
    border-radius: 5px;
    padding: 20px;
    box-shadow: 1px 1px 1px 1px #ccc;
}
.fade-enter-active, .fade-leave-active{
    transition:all 0.2s ease-in
}
.fade-enter, .fade-leave-to{
    opacity:0
}
  
</style>
