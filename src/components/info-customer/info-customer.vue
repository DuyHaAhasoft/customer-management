<template>
    <div class="info-customer">
        <div>
            <h1>Info Customer</h1>
            <h1>Info Customer</h1>
            <h1>Info Customer</h1>
            <h1>Info Customer</h1>
            <h1>Info Customer</h1>
            <h1>Info Customer</h1>
            <h1>Info Customer</h1>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            infoCustomer: {}
        }
    },
    async mounted() {
        const res = await axios.get(`https://ahasoft-sample-apis.azurewebsites.net/Customer/GetDetails?id=${1}`)
        console.log('mouted info',res);
    }
}
</script>

<style lang="scss" scoped>
    @import "./info-customer.scss"
</style>