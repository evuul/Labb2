document.addEventListener("DOMContentLoaded", function () {
    // Hämta alla navigeringslänkar
    const links = document.querySelectorAll(".nav a");

    // Hämta nuvarande filnamn utan domän
    const currentPage = window.location.pathname.split("/").pop();

    // Loopa igenom länkar och markera den aktiva sidan
    links.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active"); // Lägg till aktiv klass
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    fetch("../DATA/cv-data.json")
        .then(response => response.json())
        .then(data => {
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
                        <p><strong>${job.företag}</strong> - ${job.roll}</p>
                        <p>${job.beskrivning}</p>
                    `).join("")}
                </section>
            `;
        })
        .catch(error => console.error("Fel vid inläsning av CV:", error));
});

document.addEventListener("DOMContentLoaded", function () {
    const username = "evuul";
    const apiUrl = `https://api.github.com/users/${username}/repos`;

    const projectList = document.getElementById("project-list");
    const loadingText = document.getElementById("loading");

    // Visa laddningsmeddelande
    loadingText.textContent = "Laddar projekt från GitHub...";

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP-fel! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(repos => {
            loadingText.style.display = "none"; // Dölj laddningstexten

            if (repos.length === 0) {
                projectList.innerHTML = "<p>Inga publika GitHub-projekt hittades.</p>";
                return;
            }

            repos.forEach(repo => {
                const projectItem = document.createElement("li");
                projectItem.classList.add("project-container");

                // Standardbild om ingen finns
                const imageUrl = "../img/default-project.jpg"; 

                projectItem.innerHTML = `
                    <h3>${repo.name}</h3>
                    <p>${repo.description || "Ingen beskrivning tillgänglig."}</p>
                    <a href="${repo.html_url}" class ="btn" target="_blank">Mer info</a>`;

                projectList.appendChild(projectItem);
            });
        })
        .catch(error => {
            console.error("Fel vid hämtning av GitHub-repos:", error);
            loadingText.textContent = "Kunde inte ladda GitHub-projekt.";
        });
});