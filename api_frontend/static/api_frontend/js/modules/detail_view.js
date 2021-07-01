import { simple_element } from './helpers.js'

function render_detail_view(obj_data, router_callback){
    //cleans up data container
    const button = go_back_button(router_callback)
    const document_header = simple_element('div', "", "document-header")
    const title = simple_element("h1", obj_data.title, "title")
    const subtitle = simple_element('h4', obj_data.subtitle, "text-muted")
    document_header.appendChild(button)
    document_header.appendChild(title)
    document_header.appendChild(subtitle)

    const wrapper = simple_element("div", "", "document-wrapper")
    const cont = simple_element('div', "", "text-document")
    cont.innerHTML = obj_data.html
    summary_element(cont)

    wrapper.appendChild(document_header)
    wrapper.appendChild(cont)

    return wrapper
}

const go_back_button = (router_callback) => {
    const button = simple_element("button", '<', "btn btn-sm btn-light")
    button.addEventListener("click", () => router_callback())
    return button

}

const summary_element = (html_content) =>{
    const children = html_content.children
    const summary = []
    for (let child of children){
        let heading = child.tagName.match("H(.)")
        if (heading){
            summary.push({lvl:Number(heading[1]), title:child.innerHTML})
        }
    }
    console.log(summary)
    return summary
}

export {render_detail_view}