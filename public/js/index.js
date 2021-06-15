document.querySelector("#new-post-btn").addEventListener('click', event => {
    event.preventDefault();
    fetch('/newpost', {
        method: "GET"
    }).then(res => {
        if(res.ok) {
            location.replace('/newpost')
        } else {
            return
        }
    })
})