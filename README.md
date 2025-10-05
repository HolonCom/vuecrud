# vuecrud

## What it is
Library of crud UI components to automatically create crud UIs based on JsonSchema made for OpenApp.

## Demo app - how to use
In the demo app, only refer to the library code by importing 'index.js'. This closely mimics use of the library in actual consumer projects. As index.js is the public API of the library.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## Attributes in the JSON schemas
This library builds forms, lists, and relational selections based on JSON schemas. To steer the UI behavior in detail, we extend those schemas with custom attributes that typically start with `x-`. Below is an overview of the attributes that are actively used in the source code today, with their context and added value. Each attribute lets you declaratively describe what should happen, without hard-coding extra Vue components.

### Component selection and integration
- `x-ui-components` activates dynamic extra components (e.g., toolbars or batch actions) by lazy-loading them through the connector, as seen in `src/lib/components/form.vue` and `crudGridWithoutRouter.vue`.
- `x-type` forces a specific Vue component for a field; `field.vue` and `view` components switch between input, relation, or list variants based on this.
- `x-ui-form` determines whether a field is actually visible in forms; this is filtered in `fields.vue` and `form.vue` so technical properties remain hidden.
- `x-ui-multiline` switches in `field.vue` to the textarea presentation (also read-only) when single-line text is not sufficient.
- `x-multi-language` signals that a form must support multiple languages; `form.vue` and `crudFormWithoutRouter.vue` then show the language selector and fetch translated labels.

### Layout and grouping
- `x-ui-group` groups fields into tabs; `fields.vue` bundles them into a tab structure per group.
- `x-ui-column` and `x-ui-column-span` drive the column grid with which `fields.vue` builds the responsive layout using `el-row` and `el-col`.
- `x-ui-card` allows fields within a column to be further divided into visual cards so related inputs remain visible together.
- `x-ui-hideLabel` hides labels at field level; `field.vue` and `viewtext.vue` use this to create minimalist UIs.
- `x-ui-labelWidth` overrides the default label width per field, useful for longer descriptions or compact columns.
- `x-ui-width` determines the column width in grids (`grid.vue`), so tables align consistently without inline styles.
- `x-ui-placeholder` sets placeholder text for input fields; `input.vue` and `textarea.vue` display this text until the user starts typing.

### Enumerations and selections
- `x-enum-action` and `x-enum-app` define where enum data comes from; `select.vue` and `checkboxGroup.vue` call the appropriate backend action via the connector.
- `x-enum-valuefield` and `x-enum-textfield` indicate which fields from the response form the value and the label respectively.
- `x-enumNames` contains a label mapping for static enums and is used in `select.vue`, `viewenum.vue`, and list formatters for translated labels.
- `x-enum-nonelabel` and `x-enum-hideNone` determine whether and how an optional “no selection” value is shown.
- `x-enum-cascade` makes a `select` dependent on a parent model; `select.vue` reloads options when the parent changes.
- `x-enum-filterable` enables Element UI filtering so long pick lists remain searchable.

### Relation fields
- `x-rel-app` and `x-rel-action` refer to the source service and action for single relations; `relation.vue` uses these to perform remote searches.
- `x-rel-valuefield` and `x-rel-textfield` determine which key acts as the ID and which as the label, both in selections and when rendering in lists.
- `x-rel-cascade` allows relational selects to take into account a parent record; `relation.vue` adds parent values to the query.
- `x-rel-small` switches to a local dropdown instead of remote search, an optimization for small datasets.
- `x-rel-nonelabel` and `x-rel-hideNone` control how an empty relation option is shown in forms.
- `x-rel-to-many-app`, `x-rel-to-many-action`, `x-rel-to-many-valuefield`, `x-rel-to-many-textfield`, `x-rel-to-many-cascade`, and `x-rel-to-many-small` provide the same functionality but for many-to-many or one-to-many relations (`relationtomany.vue`), including cascading and compact renderings.

### Lists and tables
- `x-ui-grid` toggles per field whether it is visible in `grid.vue` or `list.vue`, so detailed information remains limited to where needed.
- `x-ui-grid-sortable` activates custom sorting; grids then pass the selected field and order to the backend.
- `x-ui-components` can add extra buttons to grid toolbars in filter schemas (e.g., exporter or custom actions).
- `x-export-url` determines the endpoint for exports; `crudGridWithoutRouter.vue` uses this to build query strings and download links.
- `x-export-permission` allows export buttons to be shown conditionally after a permission check via the connector.
- `x-ui-readonly` puts grids or filter forms in a read-only mode so filters can be shared without edit rights.

### Interaction and validation
- `x-ui-disabled` is used broadly (input, select, relation, etc.) to temporarily disable fields based on schemas or permissions.
- `x-ui-readonly` prevents filter inputs from being editable live; forms in `crudFormWithoutRouter.vue` and filter components respect this.
- `x-ui-dependency-field` and `x-ui-dependency-value` make fields conditionally visible; `fields.vue` checks model values and dynamically shows or hides inputs.
- `x-ui-filter-eager` triggers filters immediately without explicit submit, which `filterForm.vue` translates into a `filterEager` event towards the grid.
- `x-ui-start` and `x-ui-end` set the time window for time selections (`time.vue`), so for example office hours can be enforced.
- `x-ui-step` determines the granularity of time and numeric inputs; both `time.vue` and `inputNumber.vue` use this step size.

### Numeric and date fields
- `x-ui-precision` sets the number of decimals for numbers in `inputNumber.vue`, which prevents rounding errors for currency or percentage fields.
- `x-ui-min` and `x-ui-max` impose bounds on numeric values; Element UI then validates the allowed range client-side.
- `x-ui-step` is reused with numeric inputs to enforce consistent increments.
- `x-ui-end` sets the end boundary for time selections; together with `x-ui-start` this ensures end times do not fall outside the allowed interval.
- `x-ui-dependency-field` and `x-ui-dependency-value` are not only for visibility but also support multi-select dependencies (values or arrays) so validation aligns with business rules.
- `x-ui-labelWidth` works in combination with numeric masks to keep longer units readable without breaking the grid.