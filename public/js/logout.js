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