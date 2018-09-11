const jsonSchema = {
    getNotNull: function (schema) {
        if (schema.oneOf) {
            var list = schema.oneOf.filter(s => s.type != "null");
            if(list.length > 0) return list[0];
        }
        return schema;
    }
}

const capitalize = (value) => value.charAt(0).toUpperCase() + value.slice(1);

const groupBy = (arr) => (keyFunction) => {
  let groups = {};
  arr.forEach(el => {
      const key = keyFunction(el);
      if (key in groups === false) {
          groups[key] = [];
      }
      groups[key].push(el);
  });
  return Object
    .keys(groups)
    .map(key => ({
      key: key,
      values: groups[key]
    }));
};

/* TODO : Might want to move these to a 'domUtils' file. They are mostly effectfull or tightly coupled to the DOM. */

const isMobile = (window) => window.matchMedia("only screen and (max-width: 760px)").matches; 
const loadComponent = (opts) => {
    var script = document.createElement('script');

    opts.onLoad = opts.onLoad || function () { };
    opts.onError = opts.onError || function () { };

    script.src = opts.path;
    script.async = true;

    script.onload = function () {
        var component = Vue.component(opts.name);
        if (component)
            opts.onLoad(component);
        else
            opts.onError();
    };
    script.onerror = opts.onError;

    document.body.appendChild(script);
}


 export default {
    jsonSchema,
    isMobile,
    capitalize,
    groupBy,
    loadComponent
 };