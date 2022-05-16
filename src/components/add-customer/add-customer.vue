<template>
    <div class="form-add-customer">
        <h1>{{nameForm}} customer {{ $route.params.id }}</h1>
        <div class="form-add-customer form">
            <b-form @submit.prevent="onSubmit" @reset="onReset">
                <b-form-group id="input-name">
                    <label class="fw-bold" for="name">Name <span>*</span></label>
                    <validation-provider name="name" rules="required|min:3" v-slot="{ errors }">
                        <b-form-input
                            id="name"
                            name="name"
                            v-model="infoCustomer.name"
                            placeholder="Ex: ThankZ"
                            required
                        ></b-form-input>
                        <small>{{ errors[0] }}</small>
                    </validation-provider>
                </b-form-group>
                <b-form-group id="input-address">
                    <label class="fw-bold" for="address">Address</label>
                    <validation-provider name="address" rules="min:2" v-slot="{ errors }">
                        <b-form-input
                            id="address"
                            name="address"
                            v-model="infoCustomer.address"
                            placeholder="Ex: LA, Long An"
                        ></b-form-input>
                        <small>{{ errors[0] }}</small>
                    </validation-provider>
                </b-form-group>
                <b-form-group id="input-avatar">
                    <label class="fw-bold" for="avatar">Avatar (URL)</label>
                    <validation-provider name="avatar" :rules="{ regex: url }" v-slot="{ errors }">
                        <b-form-input
                            id="avatar"
                            v-model="infoCustomer.avatarURL"
                            placeholder="Ex: https://addressURLAvatar.com"
                        ></b-form-input>
                        <small>{{ errors[0] }}</small>
                    </validation-provider>
                </b-form-group>
                <b-form-group id="input-balance">
                    <label class="fw-bold" for="balance">Balance</label>
                    <validation-provider name="balance" rules="min_value:0" v-slot="{ errors }">
                        <b-form-input
                            id="balance"
                            v-model="infoCustomer.balance"
                            placeholder="Ex: 0, 1703"
                            type="number"
                        ></b-form-input>
                        <small>{{ errors[0] }}</small>
                    </validation-provider>
                </b-form-group>
                <b-form-group id="input-yearOfBirth">
                    <label class="fw-bold" for="yearOfBirth">Year Of Birth</label>
                    <validation-provider name="yearOfBirth" rules="between:1900,2022" v-slot="{ errors }">
                        <b-form-input
                            id="yearOfBirth"
                            v-model="infoCustomer.yearOfBirth"
                            placeholder="Ex: 1900, 2000"
                            type="number"
                            maxlength=4
                            min=1900
                            max=2022
                            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                        ></b-form-input>
                        <small>{{ errors[0] }}</small>
                    </validation-provider>
                </b-form-group>
                <b-form-group id="input-phoneNumber">
                    <label class="fw-bold" for="phoneNumber">Phone Number</label>
                    <validation-provider name="phoneNumber" rules="min:10" v-slot="{ errors }">
                        <b-form-input
                            id="phoneNumber"
                            v-model="infoCustomer.phoneNumber"
                            placeholder="Ex: 0385076161, +84385076161"
                            minlength=10
                            maxlength=12
                            class="input-number--no-arrow"
                            type="number"
                            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                        ></b-form-input>
                        <small>{{ errors[0] }}</small>
                    </validation-provider>
                </b-form-group>
                <b-form-group id="input-email">
                    <label class="fw-bold" for="email">Email</label>
                    <validation-provider name="email" rules="email" v-slot="{ errors }">
                        <b-form-input
                            id="email"
                            v-model="infoCustomer.email"
                            placeholder="Ex: thankz@ahasoft.vn"
                            type="email"
                        ></b-form-input>
                        <small>{{ errors[0] }}</small>
                    </validation-provider>
                </b-form-group>
                <b-form-group id="input-fax">
                    <label class="fw-bold" for="fax">Fax</label>
                    <validation-provider name="fax" rules="min:7" v-slot="{ errors }">
                        <b-form-input
                            id="fax"
                            v-model="infoCustomer.fax"
                            placeholder="Ex: 222 8888, 1-212-222 8888, +1 (212) 222 8888"
                            minlength=7
                            maxlength=11
                            class="input-number--no-arrow"
                            type="number"
                            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                        ></b-form-input>
                        <small>{{ errors[0] }}</small>
                    </validation-provider>
                </b-form-group>
                <div class="form form__groupBtn">
                    <b-button 
                        type="submit" 
                        variant="primary"
                        class="form__groupBtn groupBtn__btn" 
                        :class="{'groupBtn__btn--disabled': disableAdd, 'disabled': disableAdd}"
                    >
                        {{nameForm}}
                    </b-button>
                    <b-button type="reset" variant="warning">Reset</b-button>
                    <b-button variant="danger" @click="handleBack">Back</b-button>
                </div>
            </b-form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { ValidationProvider } from "vee-validate";

const DEFAULT_CUSTOMER = {
  id: 0,
  name: "",
  address: "",
  avatarURL: "",
  balance: 0,
  yearOfBirth: null,
  phoneNumber: "",
  email: "",
  fax: "",
  createdDateTimeString: ""
}

export default {
    data() {
        return {
          nameForm: "Add",
          cunstomer: null,
          infoCustomer: Object.assign({}, DEFAULT_CUSTOMER),
          disableAdd: true,
        }
    },
    async mounted() {
        const id = this.$route.params.id;
        const res = await axios.get("https://ahasoft-sample-apis.azurewebsites.net/Customer");
        const customers = res.data;
        console.log('customers', customers);
        if(id && customers) {
          console.log("run")
            this.nameForm = "Edit";
            const idCustomer = customers.findIndex(customer => customer.id === id);
            this.infoCustomer = {
                id: customers[idCustomer].id,
                name: customers[idCustomer].name,
                address: customers[idCustomer].address,
                avatarURL: customers[idCustomer].avatarURL,
                balance: customers[idCustomer].balance,
                yearOfBirth: customers[idCustomer].yearOfBirth,
                phoneNumber: customers[idCustomer].phoneNumber,
                email: customers[idCustomer].email,
                fax: customers[idCustomer].fax,
                createdDateTimeString: customers[idCustomer].createdDateTimeString,
            };
        }
    },
    computed: {
      url() {
        return '^(https?:\\/\\/)?' + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + '((\\d{1,3}\\.){3}\\d{1,3}))' + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + '(\\?[;&a-z\\d%_.~+=-]*)?' + '(\\#[-a-z\\d_]*)?$','i';
      }
    },
    watch: {
        "infoCustomer": {
            handler: function (value) {
                if(value.name.length >= 3) this.disableAdd = false;
                else this.disableAdd = true;
            },
            deep: true
        }
    },
    components: {
        ValidationProvider
    },
    methods: {
        async onSubmit() {
            // event.preventDefault();
            if(this.nameForm === "Add") {
              const date = new Date();
              this.infoCustomer.createdDateTimeString = date.toISOString();
              console.log(this.nameForm,this.infoCustomer)
              const res = await axios.post('https://ahasoft-sample-apis.azurewebsites.net/Customer', this.infoCustomer);

              this.$router.push('/')

              console.log('askdjhaskjdhajkshdjkashd', res)
              if(res.status === 200) {
                // const listRes = await axios.get('https://ahasoft-sample-apis.azurewebsites.net/Customer');
                // console.log('onSubmit', listRes.data)
              } 
            } else {
              console.log("edit");
              console.log(this.nameForm,this.infoCustomer);
              const res = await axios.put('https://ahasoft-sample-apis.azurewebsites.net/Customer', this.infoCustomer);
              console.log("edit", res);
              this.$router.push('/');
            }
		},
		onReset(event) {
			event.preventDefault();
      this.infoCustomer = Object.assign({}, DEFAULT_CUSTOMER);
		},
    handleBack(e) {
      e.preventDefault();
      this.$router.push('/');
    }
  }
}
</script>

<style lang="scss" scoped>
    @import "./add-customer.scss";
</style>