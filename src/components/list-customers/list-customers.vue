<template>
  <div class="list-customers">
        <div v-if="confirmDelete.status" class="list-customers list-customers__confirmDelete">
			<div class="text-center p-3 confirmDelete__box">
				<p>
					<strong
						>Do you want to delete customer
						{{ confirmDelete.idCustomer }} ?</strong
					>
				</p>
				<div class="confirmDelete__box box__groupBtn">
					<b-button variant="success" @click="onConfirmDelete"
						>Delete</b-button
					>
					<b-button variant="danger" class="mr-3" @click="cancelDelete">
						Cancel
					</b-button>
				</div>
			</div>
		</div>
        <h1>List customers</h1>
		<router-link to="/add">
			<b-button
				class="list-customers list-customers__btnAdd"
				variant="warning"
			>
				Add
			</b-button>
		</router-link>
        <table class="table border border-2 border-info list-customers list-customers__table">
            <thead>
				<tr>
					<th scope="col">ID</th>
					<th scope="col">Name</th>
					<th scope="col">Address</th>
                    <th scope="col">Balance</th>
					<th scope="col">Action</th>
				</tr>
			</thead>
            <tbody>
				<tr
					v-for="(customer, index) in customers"
					:key="index"
				>
                    <th scope="row">{{ customer.id }}</th>
                    <td>{{ customer.name }}</td>
                    <td class="input__address">{{ customer.address }}</td>
                    <td>{{ customer.balance }}</td>
                    <td class="list-customers__table table__groupBtn">
						<b-button
							variant="info"
						>
							Info
						</b-button>
						<router-link :to="{name: 'edit-customer', params: {id: customer.id}}">
							<b-button
								variant="outline-primary"
							>
								Edit
							</b-button>
						</router-link>
                        <b-button variant="danger" @click="() => onDelete(customer.id)">
                            Delete
                        </b-button>
                    </td>
				</tr>
			</tbody>
        </table>
    </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      customers: null,
      confirmDelete: {
			idCustomer: null,
			status: false,
		},
    }
  },
  async mounted() {
	console.log('mounted')
    const res = await axios.get('https://ahasoft-sample-apis.azurewebsites.net/Customer');
	console.log('mounted', res.data)
    this.customers = res.data;
  },
  methods: {
    onDelete(idCustomer) {
		this.confirmDelete.idCustomer = idCustomer;
		this.confirmDelete.status = true;
	},
    cancelDelete() {
		this.confirmDelete.idCustomer = "";
		this.confirmDelete.status = false;
	},
	async onConfirmDelete() {
		// this.deleteProduct(this.confirmDelete.idCustomer);
		const res = await axios.delete(`https://ahasoft-sample-apis.azurewebsites.net/Customer?id=${this.confirmDelete.idCustomer}`)
		console.log(res, typeof(this.confirmDelete.idCustomer))
		this.confirmDelete.idCustomer = "";
		this.confirmDelete.status = false;
		if(res.status === 200) {
			location.reload();
		}
	},
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import "./list-customers.scss";
</style>
