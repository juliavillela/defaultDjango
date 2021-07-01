// imports
import {list_as_table_renderer} from './modules/list_view.js'
import { render_detail_view } from './modules/detail_view.js';

window.onpopstate = e => {
    console.log(e.state);
    route(e.state.pk, true);
}

var MAIN_CONTAINER = document.querySelector("#api_data_container")
const base_path = window.location.origin
var API_URL = `${base_path}/api/dummy/`
var BASE_URL = `/api_frontend/`

document.addEventListener('DOMContentLoaded', function() {
    console.log("script api_master.js has been loaded")

    let current_url = new URL(window.location.href)
    let pk =current_url.searchParams.get("pk")
    let id = Number(pk) ? pk : null
    console.log(`id: ${id} pk: ${pk}`)
    route(id)

})

function route(pk=null, back=false){
    MAIN_CONTAINER.innerHTML=""
    let state = {pk:null}
    let url = BASE_URL; 
    if (pk){
        load_view(render_detail_view, pk)
        state={pk:pk}
        url += `?pk=${pk}`
    }
    else{
        console.log("rounting to list view")
        load_view(list_as_table_renderer)
    }
    if (back === false){
        window.history.pushState(state, "", url)
    }
}

function load_view(renderer_function, pk=null){
    let url = API_URL
    if (pk){
        url += `${pk}/`
    }
    console.log(`fetching from ${url}`)
    fetch(url)
    .then(request => request.json())
    .then(result => {
        console.log("fetch result", result)
        const content = renderer_function(result, route)
        MAIN_CONTAINER.appendChild(content)
    })
}





