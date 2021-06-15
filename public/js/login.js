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