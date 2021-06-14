document.querySelector("#login-form").addEventListener("submit", event => {
    event.preventDefault();
    const fetchObj = {
        username: document.querySelector("#usernameInput").value,
        password: document.querySelector("#passwordInput").value
    }
    fetch('/portal/login', {
        method: "POST",
        body: JSON.stringify(fetchObj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        console.log(res);
        if (res.ok) {
            location.replace('/dashboard')
            document.querySelector("#login-link").setAttribute("style", "visibility: hidden;")
            document.querySelector("#logout-btn").removeAttribute("style", "visibility: hidden;")
            document.querySelector("#logout-btn").setAttribute("style", "visibility: visible;")
        } else {
            alert("Account information not found!")
            location.reload();
        }
    })
})

document.querySelector("#signup-form").addEventListener("submit", event => {
    event.preventDefault();
    const fetchObj = {
        username: document.querySelector("#inputNewUsername").value,
        email: document.querySelector("#inputNewEmail").value,
        password: document.querySelector("#inputNewPass").value
    }

    const confirmedPass = document.querySelector("#confirmPass").value;

    if (fetchObj.password !== confirmedPass) {
        alert("Your passwords do not match!")
        return
    } else {
        fetch('/portal/new', {
            method: "POST",
            body: JSON.stringify(fetchObj),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            console.log(res);
            if (res.ok) {
                location.replace('/dashboard')
            } else {
                alert("Account information not found!")
                location.reload();
            }
        })
        document.querySelector("#login-link").setAttribute("visibility", "hidden");
        document.querySelector("#logout-btn").setAttribute("visibility", "visible");
    }
});

document.querySelector("#logout-btn").addEventListener("submit", event => {
    event.preventDefault();
    fetch('/portal/logout').then(res => {
        console.log(res);
        if (res.ok) {
        fetch('/')
    } else {
        alert('logout failed')
        location.reload
    }
    })

    document.querySelector("#login-link").setAttribute("visibility", "visible")
    document.querySelector("#logout-link").setAttribute("visibility", "hidden")
})

document.querySelector("#delete-post-btn").addEventListener('submit', event => {
    event.preventDefault();
    const fetchObj = {
        title: document.querySelector("#newPostTitle").value,
        post_body: document.querySelector("#newPostBody").value
    }
    console.log(fetchObj)
    fetch('/api/posts/:id', {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        console.log(res);
        if(res.ok) {
            location.replace('/dashboard')
        } else {
            alert("Could not delete post!")
            // location.reload();
        }
    })
})

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
