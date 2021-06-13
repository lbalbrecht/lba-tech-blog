document.querySelector("#new-post-form").addEventListener("submit", event => {
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

document.querySelector("#new-comment-form").addEventListener("submit", event => {
    event.preventDefault();
    const fetchObj = {
        comment_body: document.querySelector("#newCommentBody").value,
        blogpost_id: req.params.id
    }
    console.log(fetchObj)
    fetch('/api/comments', {
        method: "POST",
        body: JSON.stringify(fetchObj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        console.log(res);
        if(res.ok) {
            location.reload();
        } else {
            alert("Post failed!")
            return
        }
    })
})