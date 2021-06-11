const dashRender = () => {
    fetch('/dashboard', {
        method: "GET",
        headers: {
            "Content-Type": "application/javascript"
        }
    }).then(res => {
        console.log(res);
        if (res.ok) {
            location.replace('/dashboard')
        } else {
            location.replace('/login')
        }
    })
}

document.querySelector("#dash-link").addEventListener("click", dashRender)