<template>
    <el-input type="textarea" v-model="model" :disabled="disabled" :autosize="{ minRows: 2, maxRows: 5}" :placeholder="placeholder"></el-input>
</template>

<script>
export default {
    name: "oa-textarea",

    props: {
        value: String,
        schema: {},
        prop: String,
        options: {}
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
        disabled(){
             return this.schema["x-ui-disabled"];
        },
        placeholder(){
            return this.schema["x-ui-placeholder"];
        }
    }
};
</script>
