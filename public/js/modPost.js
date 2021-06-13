document.querySelector("#delete-post-btn").addEventListener('submit', event => {
    event.preventDefault();
    const fetchObj = {
        title: document.querySelector("#newPostTitle").value,
        post_body: document.querySelector("#newPostBody").value
    }
    console.log(fetchObj)
    fetch('/api/posts/new', {
        method: "POST",
        body: JSON.stringify(fetchObj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        console.log(res);
        if(res.ok) {
            location.replace('/dashboard')
        } else {
            alert("Post failed!")
            // location.reload();
        }
    })
})