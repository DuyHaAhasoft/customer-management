<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul v-for="customer in customers" :key="customer.id">
      <li >
        {{customer.id}}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'HelloWorld',
  data() {
    return {
      customers: null,
    }
  },
  props: {
    msg: String
  },
  async mounted() {
    const res = await axios.get('https://ahasoft-sample-apis.azurewebsites.net/Customer');
    this.customers = res.data;
    console.log('customers: ',this.customers);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
