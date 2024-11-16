const gamePackList = document.getElementById("gamePackList");
for (let gamePack of gamePacks) {
    addListItem(gamePack);
}
function addListItem(gamePack) {
    const listItem = document.createElement('div');
    const thumbnail = new Image(150, 150);
    const name = document.createElement('p');
    thumbnail.alt = "Game Pack Placeholder Image";
    thumbnail.src = gamePack.thumbnail ?? "./src/img/placeholder.png";
    name.textContent = gamePack.name;
    listItem.classList.add("gamePack");
    listItem.appendChild(thumbnail);
    listItem.appendChild(name);
    listItem.addEventListener("click", () => {
        open('./game.html', '_self');
        localStorage.setItem('gamePackIndex', gamePacks.indexOf(gamePack).toString());
    });
    gamePackList.appendChild(listItem);
}
