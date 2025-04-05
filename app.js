document.querySelectorAll('.rgbic-btn').forEach(btn => {
    // Cursor tracking
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        btn.style.setProperty('--x', `${e.clientX - rect.left}px`);
        btn.style.setProperty('--y', `${e.clientY - rect.top}px`);
    });

    // Touch support for mobile
    btn.addEventListener('touchmove', (e) => {
        const rect = btn.getBoundingClientRect();
        const touch = e.touches[0];
        btn.style.setProperty('--x', `${touch.clientX - rect.left}px`);
        btn.style.setProperty('--y', `${touch.clientY - rect.top}px`);
    });
});


async function getsongs() {
    const songs = []
    let a = await fetch("http://127.0.0.1:3000/songs/")
    let response = await a.text()
    //   console.log(response)
    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("a")
    for (let song of as) {
        if (song.href.endsWith(".mp3")) {
            songs.push(song.href)
        }
    }
    return songs
}

async function main() {
    let songs = await getsongs()
    console.log(songs)
    let audio = new Audio(songs[1])
    audio.play()
}
main()