<template>
  <div class="list-customers-page">
    <div class="list-customers-page__content">
      <div class="list-customers-page__header">
        <h1 class="list-customers-page__title">List customers</h1>

        <router-link to="/add">
          <b-button
            class="list-customers-page__btn list-customers-page--add"
            variant="warning"
          >
            Add
          </b-button>
        </router-link>

        <b-button
          class="list-customers-page__btn list-customers-page--import"
          variant="warning"
        >
          Import excel
        </b-button>
      </div>

      <div class="list-customers-page__body">
        <!-- <info-customer class="list-customers list-customers__info-customer" /> -->
        <table class="table list-customers__table">
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
              <td class="table__table-data" scope="row">{{ customer.id }}</td>
              <td class="table__table-data">{{ customer.name }}</td>
              <td class="table__table-data">{{ customer.address }}</td>
              <td class="table__table-data">{{ customer.balance }}</td>
              <td class="table__table-data">
                <b-button variant="info">Info</b-button>
                <router-link :to="{name: 'edit-customer', params: {id: customer.id}}">
                  <b-button variant="outline-primary">
                    Edit
                  </b-button>
                </router-link>
                <b-button variant="danger" @click="handleDeleteCustomerClick(customer.id)">
                  Delete
                </b-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="list-customers-page__body">
        <table-view :fields="dataTable.fields" :data="dataTable.data" :buttons="dataTable.buttons" v-if="dataTable.data"/>
      </div>

      <div class="list-customers-page__footer">
        Pagination
      </div>
    </div>

		<confirm-delete
			:id="confirmDelete.idCustomer" 
			:show="confirmDelete.status"
			class="list-customers__confirm-delete"
			
			@cancel="handleCancelDeleteClick"
			@confirm="handleConfirmDeleteClick"
		/>
    </div>
</template>

<script>
// Utilities
import axios from "axios";

// Components
// import InfoCustomer from "../info-customer/info-customer.vue"
import TableView from '../table-view/table-view.vue';
import ConfirmDelete from '../comfirm-delete/confirm-delete.vue';

export default {
  data() {
    return {
      customers: null,
      confirmDelete: {
        status: false,
        idCustomer: null,
      },
      dataTable: {
        data: [],
        buttons: {
          view: {
            text: "info",
            isShow: true
          },
          edit: {
            field: "id",
            text: "edit",
            isShow: true,
            routeName: "edit-customer"
          },
          delete: {
            fiel: "id",
            isShow: true,
            text: "delete",
          }
        },
        fields: {
          id: {text: "ID"},
          name: {text: "Name"},
          address: {text: "Address"},
          balance: {text: "Balance"}
        },
      }
    }
  },
  async mounted() {
    this.loadCustomers()
  },
  components: {
	// InfoCustomer,
  TableView,
	ConfirmDelete
  },
  methods: {
    handleDeleteCustomerClick(idCustomer) {
		this.confirmDelete.idCustomer = idCustomer;
		this.confirmDelete.status = true;
	},
    handleCancelDeleteClick() {
		this.confirmDelete.idCustomer = 0;
		this.confirmDelete.status = false;
	},
	async handleConfirmDeleteClick() {
		// this.deleteProduct(this.confirmDelete.idCustomer);
		try {
			const res = await axios.delete(`https://ahasoft-sample-apis.azurewebsites.net/Customer?id=${this.confirmDelete.idCustomer}`)

			if (res.status !== 200) {
				throw res.message
			}

			this.confirmDelete.idCustomer = 0;
			this.confirmDelete.status = false;

			this.loadCustomers()
		} catch(error) {
			alert(error);
		}
	},

	async loadCustomers() {
		const res = await axios.get('https://ahasoft-sample-apis.azurewebsites.net/Customer');
		this.customers = res.data;
    this.dataTable.data = res.data;
	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import "./list-customers.scss";
</style>
