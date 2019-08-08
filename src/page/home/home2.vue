<template>
    <div class='home2'>
        <p>{{$store.state.count}}</p>
        <el-button type="primary" @click="anniua">就是一个按钮而已</el-button>
        <el-button type="primary" @click="other">另一个按钮而已</el-button>
    </div>
</template>

<script>
    import {
        mapMutations
    } from 'vuex'
    export default {
        components: {},
        data() {
            return {

            };
        },
        computed: {},
        created() {

        },
        mounted() {

        },
        methods: {
            ...mapMutations(['queryAuthorityByUserRank']),
            anniua() {
                return new Promise((resolve, reject) => {
                    this.$fetch('/djy-szbureau/szbureau/partyBranchTree/queryAuthorityByUserRank', {}, {
                        headers: {
                            'X-Auth0-Token': '104f0b4205c20b14e04b3b80161a7659',
                        }
                    }).then(res => {
                        resolve(res)
                    }).catch(err => {
                        reject(err)
                    })
                })
            },
            other(){
                this.anniua()
                console.log(222222)
            },
        },
    }

</script>

<style lang='less' scoped>

</style>
