import Vue from "vue";
import VueI18n from "vue-i18n";
import en from "vee-validate/dist/locale/en.json";

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "en",
  messages: {
    en: {
      fields: {
        name: "Name",
        address: "Address",
        avatar: "Avatar",
        balance: "Balance",
        yearOfBirth: "Year Of Birth",
        phoneNumber: "Phone Number",
        email: "Email",
        fax: "Fax"
      },
      validation: en.messages
    }
  }
});

export { i18n };
