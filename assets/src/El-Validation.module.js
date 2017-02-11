var El = El || {};

El.Validation = (function(window) {

    /** @private */
    var libraryConfigs = defaultLibraryConfigs();


    /**
     * Defining a default behavior for the jquery validation plugin
     * @memberof Validation
     * @function defaultLibraryConfigs
     * @returns {object} - Default configs to be used, this configs can be override
     */
    function defaultLibraryConfigs() {
        return {
            debug: true,
            errorClass: "error-label",
            errorElement: "span"
        };
    }

    /**
     * Getting the configs to set the jquery validation plugin
     * @memberof Validation
     * @function getLibraryConfigs
     * @returns {object} - Return the jQuery Validation, necessary to setup the plugin
     */
    function getLibraryConfigs() {
        return libraryConfigs;
    }

    /**
     * Setting the configs to pass for jquery validation plugin
     * @memberof Validation
     * @function setLibraryConfigs
     * @param {object} data - Setting the jQuery Validation, necessary to setup the plugin
     */
    function setLibraryConfigs(data) {
        libraryConfigs = data;
    }

    /**
     * Adding configuration instead of fully replace them
     * @memberof Validation
     * @function addLibraryConfig
     * @param {object} data - Object in the jQuery Validation format, each property will be added to the plugin setup
     * @example
     * { rules: { name: { required: true }, email: { required: true } } }
     */
    function addLibraryConfig(data) {
        libraryConfigs[data.key] = data.value;
    }

    /**
     * Checking if the right attributes were set when the init was called
     * @memberof Validation
     * @function checkParams
     * @param {object} - jQuery object containing a form
     * @throws If the form is null or if jQuery wasn't called
     */
    function checkParams(form) {
        if (typeof form !== 'object')
            throw ('You must pass a valid form as the first attribute');
        else if (form instanceof jQuery === false)
            throw ('You must pass a jQuery object in order to validate the form');
    }

    /**
     * Checking if the right attributes were set when the init was called
     * @memberof Validation
     * @function loadCustomValidationMethods
     */
    function loadCustomValidationMethods() {
        //Additional methods for special validation
        $.validator.addMethod("maxValue", function(value, element, options) {
            var maximum = $(element).attr('data-max-value');
            return value <= maximum;
        });

        $.validator.addMethod('positive', function(value, element, options) {
            return value >= 0;
        });

        $.validator.addMethod('validEmail', function(value, element, options) {
            return this.optional(element) || /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$/.test(value);
        });

        $.validator.addMethod('integer', function(value, element, options) {
            return this.optional(element) || /^\d+$/.test(value);
        });

        $.validator.addMethod('string', function(value, element, options) {
            return this.optional(element) || /^[a-zA-Z]*$/g.test(value);
        });

        $.validator.addMethod('indianMobNumber', function(value, element, options) {
            return this.optional(element) || /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/.test(value);
        });
    }

    /**
     * Function to create a new instance of the jQuery validation
     * @memberof Validation
     * @function init
     * @param {object} form - jQuery object containing the form to validate
     * @param {object} list - list of configs
     * @example
     * MinkFoodiee.validation.init($('#myForm'), { rules: { name: "required" }, email: "required" })
     */
    function init(form, configs) {
        var config;
        try {
            loadCustomValidationMethods();
            for (config in configs) {
                addLibraryConfig({
                    key: config,
                    value: configs[config]
                });
            }
            form.validate(getLibraryConfigs());
        } catch (Exception) {
            console.error(Exception);
        }
    }

    return {
        init: init
    };

})(this);