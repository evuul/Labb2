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
    fetch("../JS/cv.json")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("cv-container");

            container.innerHTML = `
                <header class="header">
                    <div class="header-content">
                        <img src="${data.profilbild}" alt="Profilbild av ${data.namn}" class="profile-pic">
                        <h1 class="name">${data.namn}</h1>
                        <p class="subtitle">${data.titel}</p>
                    </div>
                </header>

                <section>
                    <h2>Om mig</h2>
                    <p>${data.om_mig}</p>
                </section>

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