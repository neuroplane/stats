//let resolution = 3;

let screen_height = window.innerHeight
let screen_width = screen_height/2.2;
//console.log(screen_width + ", " + screen_height)

const c = document.getElementById("heatmap");
const ctx = c.getContext("2d");
ctx.width = image.width
ctx.height = image.height

const g = document.getElementById("goals");
const gctx = g.getContext("2d");
gctx.width = image.width
gctx.height = image.height

function draw_text(x,y,text, color, sizept) {
    let canvas = document.querySelector('#goals');
    let ctx = canvas.getContext('2d');
    ctx.save()
    ctx.fillStyle = color;
    ctx.strokeStyle = "#eeeeee";
    ctx.lineWidth = 1
    ctx.font = "bold "+ sizept + "pt Arial";
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(text, x, y);
    ctx.restore()
}

let heatData = []
const heat = simpleheat('heatmap');
/*  DRAW POINT    */
function drawPoint(x,y) {
    heat.data(heatData);
    const point = [parseInt(x), parseInt(y) ]
    heat.add(point);
    heat.resize()
    heat.draw();
}

/*
async function restore(urlParams) {
    let game_id = urlParams['game_id']
    const options = {
        "game_id": game_id
    }
    const game = await APISendRequest("getcurrentgame", JSON.stringify(options))
    transfer_team_data("game_id", game[0]["game_id"])
    document.getElementById("hosts").innerHTML = game[0]["host"]
    document.getElementById("hosts").setAttribute("team_id", game[0]["host_id"])
    document.getElementById("team1").setAttribute("team_id", game[0]["host_id"])
    document.getElementById("guests").innerHTML = game[0]["guest"]
    document.getElementById("guests").setAttribute("team_id", game[0]["guest_id"])
    document.getElementById("team2").setAttribute("team_id", game[0]["guest_id"])
    document.getElementById("team1_label").innerHTML = game[0]["host"]
    document.getElementById("team2_label").innerHTML = game[0]["guest"]
    let hostShots = []
    let guestShots = []
    await redraw(game[0]["host_id"])
}
*/
async function redraw(team) {
    heatData = []
    let canvas = document.querySelector('#goals');
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    heat.clear()

    //heat.data(newData)
    /*  FUNC TAB    */
    const teamShots = await APISendRequest("getteamheatmap", JSON.stringify({"game_id": getURLValues()['game_id'], "team_id": team}))
    for (const point of teamShots) {
        drawPoint(point['shot_x'], point['shot_y'])
        if (point['is_target'] === true){draw_text(point['shot_x'], point['shot_y'], "🔘", "#bd0022", 20)}
        if (point['is_goal'] === true){draw_text(point['shot_x'], point['shot_y'], "🔴", "#0040ff", 30)}
    }
}

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = Math.round((event.clientX - rect.left) / (rect.right - rect.left) * canvas.width)
    const y = Math.round((event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height)

    openModal(x,y)
    //drawPoint(x, y)
}
/*---------- s3----------*/
const canvas_heatmap = document.querySelector('#goals')

/* ОБРАБОТЧИК КЛИКА */
canvas_heatmap.addEventListener('mouseup', function(e) {
    getCursorPosition(canvas_heatmap, e)
})
const digitArray = [];
const elements = document.querySelectorAll('.digit');
elements.forEach(element => {
    element.addEventListener('click', () => {
        // Code to be executed when the element is clicked
        digitArray.push(element.dataset.digit)
        document.getElementById("playerID").innerHTML = element.dataset.digit
    });
});