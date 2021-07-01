import { simple_element } from './helpers.js'

const list_as_table_renderer = (items_data, router_callback) => {
    const table = simple_element("table", "", "document-table")
    const headers_text = ["title", "subtitle", ""]
    const table_head = document.createElement("thead")
    for (let headerName of headers_text){
        let el = simple_element("TH", headerName)
        table_head.appendChild(el)
    }
    table.appendChild(table_head)
    for(let item of items_data){
        let tr_element = list_element(item, router_callback)
        table.appendChild(tr_element)
    }

    return table
}

const list_element = (obj, router_callback) => {
    const tr = document.createElement("tr")
    const title = simple_element('TD', obj.title, "document-title")
    const subtitle = simple_element("TD", obj.subtitle, "document-subtitle")
    const action = document.createElement("TD")
    const button = open_detail_view_button(obj.id, router_callback)
    action.appendChild(button)

    tr.appendChild(title)
    tr.appendChild(subtitle)
    tr.appendChild(action)
    return tr
}

const open_detail_view_button = (pk, router_callback) => {
    const button = simple_element("BUTTON", "open", "btn btn-sm btn-light")
    button.addEventListener("click", () => router_callback(pk, false))
    return button
}

export {list_as_table_renderer}