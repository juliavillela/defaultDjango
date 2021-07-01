
const base_path = window.location.origin
var API_URL = `${base_path}/api/`

function load_list_view(render_function, url){
    fetch(url)
    .then(request => request.json())
    .then(result => render_function(result))
    .catch(error => console.log(error))
}

function load_detail_view(pk, render_function, url){
    const datail_url = `${url}${pk}`
    fetch(datail_url)
    .then(request => request.json())
    .then(result => render_function(result))
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