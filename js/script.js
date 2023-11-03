

/*  API    */

/*  LOGIN    */
async function login() {
    const username = document.getElementById("inputLogin").value
    const password = document.getElementById("inputPassword").value
    const data = {
        "login": username,
        "password": password
    }
    let token = "00000000-0000-0000-0000-000000000000"
    let response = await APISendRequest("login", data, token)
    console.log(response)
    if (response['token']){
        setCookie("token", response['token'])
        toastAlert(response['token'], "success")
        window.location.replace("https://tagban.ru/plus/stats")
    } else {
        console.log(response['message'])
        toastAlert(response['message'], "danger")
    }
}

function logOut() {
    setCookie("token", '')
    window.location.replace("https://tagban.ru/plus/stats/login.html")
}





/*  FUNC TAB    */
function toastAlert(message, color) {
    const toastLiveExample = document.getElementById('liveToast')
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    const toastMessage = document.getElementById("toastMessage")
    toastMessage.innerHTML = message
    toastLiveExample.setAttribute("class", "")
    toastLiveExample.classList.add("toast")
    toastLiveExample.classList.add("text-bg-" + color)
    toastBootstrap.show()
}

