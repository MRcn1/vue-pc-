<template>
   <div class='navHeader'>
       <header class="layout-header">
            <ul>
                <router-link :to="value.path" tag="li" class="clabs" v-for="(value,index) in routes" :key="index">{{value.meta.title}}</router-link>
            </ul>
        </header>
   </div>
</template>

<script>
export default {
    data () {
        return {
            routes:null,
        }
    },
    components: {

    },
    created(){
        this.routes = this.$router.options.routes.slice(1)
    },
    methods: {

    },
 }
</script>

<style scoped lang='less'>
.layout-header{
    width: 100%;
    height: 60px;
    background-color: #182836;
    color: #fff;
    .clabs{
        display: inline-block;
        width: 157px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        cursor: pointer;
    }
    .router-link-active{
        background-color: #4c9dea;
        color: #fff;
    }
}
 
</style>
