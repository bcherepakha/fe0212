export function createElement(tagName, props = {}, children) {
    const el = document.createElement(tagName);

    for (const propertyName in props) {
        const propertyValue = props[propertyName];

        el[propertyName] = propertyValue;
    }

    if (Array.isArray(children)) {
        el.append(...children);
    }

    return el;
}

export function classNames(...classNamesList) {
    return classNamesList.filter(Boolean).join(' ');
}
