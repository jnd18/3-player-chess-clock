let activeClock;
let remainingClocks = 3;
const clocks = [{}, {}, {}];
for (const [i, clock] of clocks.entries()) {
    clock.maintimeInput = document.getElementById(`maintime${i+1}`);
    clock.maintimeInput.addEventListener("change", e => {
        readTextInput();
        draw(clock);
    });
    clock.incrementInput = document.getElementById(`increment${i+1}`);
    clock.incrementInput.addEventListener("change", e => {readTextInput();});
    clock.button = document.getElementById(`p${i+1}`);
    clock.nextClock = clocks[(i + 1) % 3];
    clock.button.addEventListener("click", () => {
        if (activeClock === undefined || activeClock === clock) {
            clock.nextClock.seconds += clock.nextClock.increment;
            activeClock = clock.nextClock;
        }
    });
}

function readTextInput() {
    for (let clock of clocks) {
        clock.seconds = Math.floor(Number(clock.maintimeInput.value) * 60);
        clock.increment = Math.floor(Number(clock.incrementInput.value));
    }
}

function draw(clock) {
    let minutes = Math.floor(clock.seconds / 60);
    let seconds = clock.seconds - 60 * minutes;
    if (seconds < 10) seconds = "0" + seconds;
    clock.button.innerText = `${minutes}:${seconds}`;
    if (clock.seconds === 0) clock.button.style.backgroundColor = "darkred";
}

// set defaults
for (let clock of clocks) {
    clock.maintimeInput.value = "5";
    clock.incrementInput.value = "3";
}
readTextInput()
for (let clock of clocks) {
    draw(clock);
}

function updateClocks() {
    setTimeout(() => {
        if (activeClock !== undefined) {
            activeClock.seconds--;
            draw(activeClock);
            if (activeClock.seconds === 0) {
                remainingClocks--;
                if (remainingClocks === 2) {
                    activeClock.nextClock.nextClock.nextClock = activeClock.nextClock;
                } else if (remainingClocks === 1) {
                    return;
                }
                activeClock.nextClock.seconds += activeClock.nextClock.increment;
                activeClock = activeClock.nextClock;
            }
        }
        updateClocks();
    }, 1000);
}

updateClocks();
