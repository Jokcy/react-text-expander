const properties = [
    "position:absolute;",
    "overflow:auto;",
    "word-wrap:break-word;",
    "top:0px;",
    "left:-9999px;",
    "white-space:pre-wrap;",
];

const propertyNamesToCopy = [
    "box-sizing",
    "font-family",
    "font-size",
    "font-style",
    "font-variant",
    "font-weight",
    "height",
    "letter-spacing",
    "line-height",
    "max-height",
    "min-height",
    "padding-bottom",
    "padding-left",
    "padding-right",
    "padding-top",
    "border-bottom",
    "border-left",
    "border-right",
    "border-top",
    "text-decoration",
    "text-indent",
    "text-transform",
    "width",
    "word-spacing",
];

export function updateMirrorStyle(
    mirror: HTMLDivElement,
    style: CSSStyleDeclaration
) {
    const props = properties.slice(0);
    for (let i = 0, len = propertyNamesToCopy.length; i < len; i++) {
        const name = propertyNamesToCopy[i];
        props.push(`${name}:${style.getPropertyValue(name)};`);
    }
    mirror.style.cssText = props.join(" ");
}
