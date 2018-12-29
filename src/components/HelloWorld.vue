<template>
   <div class=''>
       <button @click="getdata">点击请求</button>
        <p>{{count}}</p>  
        <ul class="ull" v-for="n in 10">
            <li>{{n}}</li>
        </ul>
        <button @click="add">加</button>
   </div>
</template>

<script>
import {mapState,mapMutations} from "vuex"
export default {
    data () {
        return {
            msg:'123'
        }
    },
    components: {
        
    },
    computed:{
        ...mapState(['count'])
    },
    created(){

    },
    methods: {
        ...mapMutations(['add']),
        getdata(){
            this.$post('/erp-admin-api/login/userLogin')
            .then((res) => {
                this.$message(res);
                console.log(res)
            })
        }
    },
 }
</script>

<style scoped lang='less'>
.ull{
    li{
        color:red;
    }
}
 
</style>
