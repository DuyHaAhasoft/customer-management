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
        <!-- <info-customer class="list-customers list-customers__info-customer" /> -->
        
      <div class="list-customers-page__body">
        <table-view 
          v-if="dataTable.data"
          :data="dataTable.data" 
          :fields="dataTable.fields" 
          :action="dataTable.action" 
          @delete="handleDeleteCustomerClick"  
        >
          <template #address="row">
            <span>Address: {{ row.address }}</span>
          </template>

          <template #balance="row">
            {{ formatBalance(row.balance) }}
          </template>
        </table-view>
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
// vue slot 

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
        action: {
          view: {
            text: "Info",
            isShow: true
          },
          edit: {
            field: "id",
            text: "Edit",
            isShow: true,
            routeName: "edit-customer"
          },
          delete: {
            field: "id",
            isShow: true,
            text: "Delete",
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
    },
    formatBalance(balance) {
      return `${balance * 2} VND`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import "./list-customers.scss";
</style>
