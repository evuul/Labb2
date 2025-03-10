// Vänta tills hela sidan har laddats
document.addEventListener("DOMContentLoaded", function () {
    handleNavHighlight();
    fetchCVData();
    fetchGitHubProjects();
    setupRickRollListener();
    setupSpookyModeListener();
});

// Markera aktuell länk i navigeringen
function handleNavHighlight() {
    const links = document.querySelectorAll(".nav a");
    const currentPage = window.location.pathname.split("/").pop();

    links.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });
}

// Hämta och visa CV-data från JSON
async function fetchCVData() {
    try {
        const response = await fetch("../DATA/cv-data.json");
        if (!response.ok) throw new Error(`HTTP-fel! Status: ${response.status}`);

        const data = await response.json();
        const container = document.getElementById("cv-container");

        container.innerHTML = `
            <section>
                <h2>Utbildning</h2>
                <p><strong>${data.utbildning.skola}</strong> (${data.utbildning.period})</p>
                <p>${data.utbildning.beskrivning}</p>
            </section>
            <section>
                <h2>Arbetslivserfarenhet</h2>
                ${data.arbetslivserfarenhet.map(job => `
                    <p><strong>${job.företag}</strong> - ${job.roll} (${job.period || "Period ej angiven"})</p>
                    <p>${job.beskrivning}</p>
                `).join("")}
            </section>
        `;
    } catch (error) {
        console.error("Fel vid inläsning av CV:", error);
    }
}

// Hämta och visa GitHub-projekt
async function fetchGitHubProjects() {
    const username = "evuul";
    const apiUrl = `https://api.github.com/users/${username}/repos`;
    const projectList = document.getElementById("project-list");
    const loadingText = document.getElementById("loading");

    loadingText.textContent = "Laddar projekt från GitHub...";

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP-fel! Status: ${response.status}`);

        const repos = await response.json();
        // Vänta i 3 sekunder innan innehållet visas
        setTimeout(() => {
            loadingText.style.display = "none"; // Dölj laddningstexten

            if (repos.length === 0) {
                projectList.innerHTML = "<p>Inga publika GitHub-projekt hittades.</p>";
                return;
            }

            repos.forEach(repo => {
                const projectItem = document.createElement("li");
                projectItem.classList.add("project-container");

                projectItem.innerHTML = `
                    <h3>${repo.name}</h3>
                    <p>${repo.description || "Ingen beskrivning tillgänglig."}</p>
                    <a href="${repo.html_url}" class="btn" target="_blank">Mer info</a>`;

                projectList.appendChild(projectItem);
            });
        }, 3000);
    } catch (error) {
        console.error("Fel vid hämtning av GitHub-repos:", error);
        loadingText.textContent = "Kunde inte ladda GitHub-projekt.";
    }
}

// Lyssna på tangenttryck för Rickroll
function setupRickRollListener() {
    let inputSequence = "";
    const secretCode = "1337";

    document.addEventListener("keydown", function (event) {
        inputSequence += event.key;
        inputSequence = inputSequence.slice(-secretCode.length);

        if (inputSequence === secretCode) {
            triggerRickRoll(); // kör rick-roll funktionen
        }
    });
}

// Funktion för att visa Rickroll
function triggerRickRoll() {
    document.querySelector(".Rick-Roll").style.display = "flex";

    let audio = document.getElementById("sound");
    if (audio) {
        audio.volume = 0.1;
        audio.currentTime = 0;
        audio.play();
        audio.loop = true;
    }
}

// Stäng Rickroll-modal vid klick på "X"
document.querySelector(".close").addEventListener("click", function () {
    closeRickRoll();
});

// Funktion för att stänga Rickroll
function closeRickRoll() {
    document.querySelector(".Rick-Roll").style.display = "none";

    let audio = document.getElementById("sound");
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }
}

// Spooky mode på profilbilden
function setupSpookyModeListener() {
    document.querySelector(".profile-pic").addEventListener("click", function () {
        activateSpookyMode();
    });
}

// Funktion för att aktivera spooky mode
function activateSpookyMode() {
    document.body.classList.add("spooky-mode");
    alert("Boo! 🎃 Sidan är nu i Spooky Mode!");
    addGhosts();
}

// Lägg till spöken på skärmen
function addGhosts() {
    for (let i = 0; i < 6; i++) {
        let ghost = document.createElement("div");
        ghost.classList.add("ghost");
        ghost.style.top = Math.random() * 100 + "vh";
        ghost.style.left = Math.random() * 100 + "vw";
        document.body.appendChild(ghost);
    }
}