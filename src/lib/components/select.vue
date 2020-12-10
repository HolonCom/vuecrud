<template>
  <el-select v-model="model" placeholder="Select">
    <el-option v-if="!hideNone" :label="noneLabel" :value="noneValue"></el-option>
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
  </el-select>
</template>

<script>
export default {
  name: "oa-select",
  props: {
    value: {},
    schema: {},
    messages: Object,
    resource: String,
    prop: String,
        connector: {}
  },
  data() {
    return {
      options: [],
      hideNone: false,
      noneLabel: "None",
      noneValue: undefined
    };
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    },
        sch() {
            return this.schema.oneOf && this.schema.oneOf[0]
                ? this.schema.oneOf[0]
                : this.schema;
        },        
        relationResource() {
            return this.sch["x-enum-app"];
        },
    },
    created() {
        if (this.sch.enum) {
            for (var i = 0; i < this.sch.enum.length; i++) {
                let label = this.sch["x-enumNames"]
                    ? this.sch["x-enumNames"][i]
                    : this.prop + "_" + this.sch.enum[i];
                if (this.messages && this.messages[label]) {
                    label = this.messages[label];
                }
                this.options.push({
                    value: this.sch.enum[i],
                    label: label
                });
            }
        } else if (this.sch["x-enum-action"]) {
        var enumAction = this.schema["x-enum-action"];
        var enumValueField = this.schema["x-enum-valuefield"] || "id";
        var enumTextField = this.schema["x-enum-textfield"] || "fullName";
        this.connector.service(
                this.relationResource ? this.relationResource : this.resource,
                enumAction,
                {},
          data => {
            this.options = data.map(p => ({
              value: p[enumValueField],
              label: p[enumTextField]
            }));
          },
          () => {}
        );
      }
        if (this.sch["x-enum-nonelabel"]) {
            this.noneLabel = this.sch["x-enum-nonelabel"];
      if (this.messages && this.messages[this.noneLabel]) {
        this.noneLabel = this.messages[this.noneLabel];
      }
    }
        if (this.sch["x-enum-hideNone"]) {
            this.hideNone = this.sch["x-enum-hideNone"];
        }
        if (this.sch["default"]) {
            this.model = this.sch["default"];
        }
    }
};
</script>
