<template>
    <div v-if="isShow" class="modal-add">
        <div class="form modal-add__form">
            <validation-observer v-slot="{invalid}">
                <form @submit.prevent= "handleSubmitForm" @reset="handleResetForm">
                    <div class="box-input form__box-input">
                        <label for="name">Name<span>*</span></label>
                        <validation-provider name="name" rules="required|min:3" v-slot="{ errors }">
                            <input
                                required
                                id="name"
                                name="name"
                                placeholder="Ex: ThankZ"
                                v-model="infoCustomer.name"
                            />
                            <div class="validate-text box-input__validate-text">{{ errors[0] }}</div>
                        </validation-provider>
                    </div>
                    <div class="box-input form__box-input">
                        <label for="address">Address</label>
                        <validation-provider name="address" rules="min:2" v-slot="{ errors }">
                            <input
                                id="address"
                                name="address"
                                placeholder="Ex: LA, Long An"
                                v-model="infoCustomer.address"
                            />
                            <div class="validate-text box-input__validate-text">{{ errors[0] }}</div>
                        </validation-provider>
                    </div>
                    <div class="box-input form__box-input">
                        <label for="avatar">Avatar (URL)</label>
                        <validation-provider name="avatar" :rules="{ regex: url }" v-slot="{ errors }">
                            <input
                                id="avatar"
                                v-model="infoCustomer.avatarURL"
                                placeholder="Ex: https://addressURLAvatar.com"
                            />
                            <div class="validate-text box-input__validate-text">{{ errors[0] }}</div>
                        </validation-provider>
                    </div>
                    <div class="box-input form__box-input">
                        <label for="balance">Balance</label>
                        <validation-provider name="balance" rules="min_value:0|max_value:1e+28|max:29" v-slot="{ errors }">
                            <input
                                id="balance"
                                type="number"
                                placeholder="Ex: 0, 1703"
                                v-model="infoCustomer.balance"
                            />
                            <div class="validate-text box-input__validate-text">{{ errors[0] }}</div>
                        </validation-provider>
                    </div>
                    <div class="box-input form__box-input">
                        <label for="yearOfBirth">Year Of Birth</label>
                        <validation-provider name="yearOfBirth" rules="between:1900,2022" v-slot="{ errors }">
                            <input
                                min=1900
                                max=2022
                                maxlength=4
                                type="number"
                                id="yearOfBirth"
                                placeholder="Ex: 1900, 2000"
                                v-model="infoCustomer.yearOfBirth"
                                oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                            />
                            <div class="validate-text box-input__validate-text">{{ errors[0] }}</div>
                        </validation-provider>
                    </div>
                    <div class="box-input form__box-input">
                        <label for="phoneNumber">Phone</label>
                        <validation-provider name="phoneNumber" rules="min:10" v-slot="{ errors }">
                            <input
                                id="phoneNumber"
                                type="number"
                                minlength=10
                                maxlength=12
                                class="input-number--no-arrow"
                                v-model="infoCustomer.phoneNumber"
                                placeholder="Ex: 0385076161, +84385076161"
                                oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                            />
                            <div class="validate-text box-input__validate-text">{{ errors[0] }}</div>
                        </validation-provider>
                    </div>
                    <div class="box-input form__box-input">
                        <label for="email">Email</label>
                        <validation-provider name="email" rules="email" v-slot="{ errors }">
                            <input
                                id="email"
                                type="email"
                                v-model="infoCustomer.email"
                                placeholder="Ex: thankz@ahasoft.vn"
                            />
                            <div class="validate-text box-input__validate-text">{{ errors[0] }}</div>
                        </validation-provider>
                    </div>
                    <div class="box-input form__box-input">
                        <label for="fax">Fax</label>
                        <validation-provider name="fax" rules="min:7" v-slot="{ errors }">
                            <input
                                id="fax"
                                minlength=7
                                maxlength=11
                                type="number"
                                v-model="infoCustomer.fax"
                                class="input-number--no-arrow"
                                placeholder="Ex: 222 8888, 1-212-222 8888, +1 (212) 222 8888"
                                oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                            />
                            <div class="validate-text box-input__validate-text">{{ errors[0] }}</div>
                        </validation-provider>
                    </div>
                    <div class="group-buttons form__group-buttons">
                        <button 
                            type="submit"
                            class="btn group-buttons__btn" 
                            :class="{'group-buttons__btn--disabled': disableButtonAdd || invalid, 'btn--add group-buttons__btn--add': !disableButtonAdd && !invalid}"
                            :disabled="disableButtonAdd || invalid"
                        >
                            {{nameForm}}
                        </button>
                        <button class="btn btn--reset group-buttons__btn group-buttons__btn--reset" type="reset">Reset</button>
                        <button class="btn btn--back group-buttons__btn group-buttons__btn--back" @click="handleBack">Back</button>
                    </div>
                </form>
            </validation-observer>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import { ValidationProvider, ValidationObserver } from "vee-validate";

    const DEFAULT_CUSTOMER = {
        id: 0,
        fax: "",
        name: "",
        email: "",
        address: "",
        balance: 0,
        avatarURL: "",
        phoneNumber: "",
        yearOfBirth: null,
        createdDateTimeString: ""
    }

    export default {
        data() {
            return {
                disableButtonAdd: true,
                infoCustomer: Object.assign({}, DEFAULT_CUSTOMER),
            }
        },
        props: {
            isShow: {
                type: Boolean,
                default: false,
            },
            nameForm: {
                type: String,
                default: "Add"
            }
        },
        components: {
            ValidationProvider,
            ValidationObserver
        },
        computed: {
            url() {
                return '^(https?:\\/\\/)?' + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + '((\\d{1,3}\\.){3}\\d{1,3}))' + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + '(\\?[;&a-z\\d%_.~+=-]*)?' + '(\\#[-a-z\\d_]*)?$','i';
            }
        },
        watch: {
            "infoCustomer": {
                handler: function (value) {
                    if(value.name.length >= 3) this.disableButtonAdd = false;
                    else this.disableButtonAdd = true;
                },
                deep: true
            }
        },
        methods: {
            async handleSubmitForm() {
                // event.preventDefault();
                if(this.nameForm === "Add" && !this.disableButtonAdd) {
                    try {
                        const date = new Date();
                        this.infoCustomer.createdDateTimeString = date.toISOString();
                        const res = await axios.post('https://ahasoft-sample-apis.azurewebsites.net/Customer', this.infoCustomer);
                        if (res.status !== 200) {
                            throw res.message
                        }
                        this.$emit('handleShowForm')
                    } 
                    catch(error) {
                        console.log(error);
                    } 
                } 
                if(this.nameForm === "Edit" && !this.disableButtonAdd) {
                    try {
                        const res = await axios.put('https://ahasoft-sample-apis.azurewebsites.net/Customer', this.infoCustomer);
                        if (res.status !== 200) {
                            throw res.message
                        }
                        this.$emit('handleShowForm')
                    } 
                    catch(error) {
                        console.log(error)
                    }
                }
            },
            handleResetForm(event) {
                event.preventDefault();
                this.infoCustomer = Object.assign({}, DEFAULT_CUSTOMER);
            },
            handleBack(event) {
                event.preventDefault();
                this.$emit('handleShowForm')
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "./modal-add.scss";
</style>