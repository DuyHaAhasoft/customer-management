import Vue from "vue";
import { extend, localize } from "vee-validate";
import { required, min } from "vee-validate/dist/rules";
import en from "vee-validate/dist/locale/en.json";

// Install required rule.
extend("required", {
  ...required,
  message: 'This field is required'
});

// Install min rule.
extend("min", min);

// Install English localizations.
localize({
  en: {
    messages: en.messages,
    names: {
      name: "Name",
      category: "category"
    },
    fields: {
      name: {
        min: "Name must have at least {length} characters"
      }
    }
  }
});

let LOCALE = "en";

// A simple get/set interface to manage our locale in components.
// This is not reactive, so don't create any computed properties/watchers off it.
Object.defineProperty(Vue.prototype, "locale", {
  get() {
    return LOCALE;
  },
  set(val) {
    LOCALE = val;
    localize(val);
  }
});