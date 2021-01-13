(function (global, libraryName) {
    const exports = {};

    exports.createElement = function createElement(tagName, props = {}) {
        const el = document.createElement(tagName);

        for (const propertyName in props) {
            const propertyValue = props[propertyName];

            el[propertyName] = propertyValue;
        }

        return el;
    };

    exports.classNames = function (...classNamesList) {
        return classNamesList.filter(Boolean).join(' ');
    };

    global[libraryName] = exports;
})(window, 'lib-dom');
