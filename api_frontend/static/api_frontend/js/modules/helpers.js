const simple_element = (tagName, innerHTML, className=null, id=null) => {
    const new_element = document.createElement(tagName)
    new_element.innerHTML = innerHTML
    if (className){
        new_element.className = className
    }
    if (id){
        new_element.id=id
    }
    return new_element
}

export {
    simple_element
}