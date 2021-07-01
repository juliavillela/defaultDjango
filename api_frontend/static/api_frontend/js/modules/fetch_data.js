const base_path = window.location.origin
const model_base_name = "dummy"
var API_URL = `${base_path}/api/${model_base_name}/`
var CONTAINER  = document.querySelector("#api_data_container")

function load_list_view(render_function){
    CONTAINER.innerHTML = ""
    fetch(API_URL)
    .then(request => request.json())
    .then(result => {
        const content = render_function(result)
        CONTAINER.appendChild(content)    
    })
    .catch(error => console.log(error))
}

function load_detail_view(pk, render_function){

    const datail_url = `${API_URL}${pk}/`
    fetch(datail_url)
    .then(request => request.json())
    .then(result => {
        const content = render_function(result)
        CONTAINER.innerHtml = "POPP"
        CONTAINER.appendChild(content)
    })
    .catch(error => console.log(error))
}

/*
the component marked as content_group should be the container which will be filled with fetched data
this component should have: dataset.path = str of fetch path
*/

function handleApiConnection(content_group, render_function){
    const container = content_group
    const base_url = `${API_URL}${container.dataset.prefix}/`
    load_list_view(console.log, base_url)
}

export {load_list_view, load_detail_view}