const gamePackIndex = localStorage.getItem('gamePackIndex');
if (gamePackIndex === undefined) {
    if (confirm("An Error has occurred"))
        open('./index.html', '_self');
}
Game.init(document.getElementById('gameText'), document.getElementById('timerText'), Settings.options.timerSeconds ?? 60);
Game.loadGamePack(gamePacks[gamePackIndex]);
