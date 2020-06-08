<template>
    <div class='layout'>
        <div class="app-main">
            <main-content></main-content>
        </div>
    </div>
</template>

<script>
    import navHeader from "./components/navHeader"
    import navLeft from "./components/navLeft"
    import mainContent from "./components/mainContent"
    export default {
        data() {
            return {
                
            }
        },
        components: {
            navHeader,
            navLeft,
            mainContent
        },
        created() {},
        methods: {}
    
    };
</script>

<style scoped lang='less'>
.layout{
    height: 100%;
}
.app-main{
    display: flex;
    height: 100vh; 
    .mainContent{
        width: 100%;
        background-color: #fafafa;
        padding: 20px;
    }
}
</style>
