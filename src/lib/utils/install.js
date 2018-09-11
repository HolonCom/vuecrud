import Address from '../components/address.vue'
import CheckboxGroup from '../components/checkboxGroup.vue'
import CrudForm from '../components/crudForm.vue'
import CrudFormWithRouter from '../components/CrudFormWithRouter.vue'
import CrudGrid from '../components/crudGrid.vue'
import CrudGridWithRouter from '../components/crudGridWithRouter.vue'
import Date from '../components/date.vue'
import Daterange from '../components/daterange.vue'
import DialogForm from '../components/dialogForm.vue'
import Field from '../components/field.vue'
import Fields from '../components/fields.vue'
import FilterForm from '../components/filterForm.vue'
import Form from '../components/form.vue'
import FormItem from '../components/formItem.vue'
import Grid from '../components/grid.vue'
import List from '../components/list.vue'
import Input from '../components/input.vue'
import Inputnumber from '../components/inputNumber.vue'
import RelationToMany from '../components/relationtomany.vue'
import Relation from '../components/relation.vue'
import Select from '../components/select.vue'
import Switch from '../components/switch.vue'
import Textarea from '../components/textarea.vue'
import Time from '../components/time.vue'


export const components = {
  Address,
  CheckboxGroup,
  CrudForm,
  CrudGrid,
  Date,
  Daterange,
  DialogForm,
  Field,
  Fields,
  FilterForm,
  Form,
  FormItem,
  Grid,
  List,
  Input,
  Inputnumber,
  RelationToMany,
  Relation,
  Select,
  Switch,
  Textarea,
  Time,
  CrudGridWithRouter
};

export const install = (Vue) => Object.keys(components).forEach(key => Vue.component(components[key].name, components[key]));
