Settings.init()

const settingsButton = document.getElementById("settings")
const settingsContainer = document.getElementById("settingsContainer") as HTMLDialogElement
const settingsCloseButton = document.getElementById("settingsCloseButton")

settingsButton.addEventListener("click", () => {
    settingsContainer.showModal();
});

settingsCloseButton.addEventListener("click", () => {
    settingsContainer.close();
})

const touchControlScheme = document.getElementById("touchControlScheme") as HTMLInputElement
const motionControlScheme = document.getElementById("motionControlScheme") as HTMLInputElement

touchControlScheme.addEventListener("change", () => {
    if(touchControlScheme.checked) {Settings.modify("controlScheme", "touch")}
});

motionControlScheme.addEventListener("change", () => {
    if(motionControlScheme.checked) {Settings.modify("controlScheme", "motion")}
});

const timerSeconds = document.getElementById("timerSeconds") as HTMLInputElement

timerSeconds.addEventListener("input", () => {
    if(parseInt(timerSeconds.value) > 0) Settings.modify("timerSeconds", timerSeconds.value)
})

function setVisual(){
    timerSeconds.value = Settings.options.timerSeconds.toString()
    switch(Settings.options.controlScheme) {
        case "touch":
            touchControlScheme.checked = true
            motionControlScheme.checked = false
            break
        case "motion":
            touchControlScheme.checked = false
            motionControlScheme.checked = true
            break
    }
}

setVisual()
