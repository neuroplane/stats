
/****** PRIORITY: XX ******/

function isLogged() {
    if (!getCookie("token")){
        console.log("NO TOKEN")
        window.location.replace("https://tagban.ru/plus/stats/login.html")
    } else if (getCookie("token") == "00000000-0000-0000-0000-000000000000") {
        console.log("DEFAULT TOKEN \"00000000-0000-0000-0000-000000000000\"")
        window.location.replace("https://tagban.ru/plus/stats/login.html")
    } else {
        console.log("TOKEN: " + getCookie("token"))
    }
}




function setCookie(name, value) {
    document.cookie = `${name}=${value}`
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
        return parts.pop()?.split(';').shift();
    }
}

function deleteCookie(name) {
    setCookie(name, "")
}
/*  FUNC TAB    */
async function getUser(cookie) {
    const token = getCookie("token")
    const data = {
        "token": token
    }
    const userid = await APISendRequest("getuser", data)
}

async function APISendRequest(funcName, body, token) {

    if (getCookie("token")){
        token = getCookie("token")
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + token
        },
        body: JSON.stringify(body)
    };


    let res

    try {
        res = await fetch('https://x125.ru/api/stats/'+ funcName, options)
    } catch (e) {
        throw new Error("Bad response from server");
    }

    return res.json()
}