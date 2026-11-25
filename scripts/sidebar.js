
const sidebar = document.getElementById("utility-sidebar");
const toggle = document.getElementById("sidebar-toggle");
const close = document.getElementById("sidebar-close");
const notification = document.getElementById("sidebar-notification");

toggle.addEventListener("click", () => {
    sidebar.classList.toggle("active");
});

close.addEventListener("click", () => {
    sidebar.classList.remove("active");
});

// Temporary button actions
document.querySelectorAll(".sidebar-button[data-tool]").forEach(button => {

    button.addEventListener("click", () => {

        const tool = button.dataset.tool;

        notification.textContent = `${tool} is coming soon!`;
        notification.classList.add("active");
        setTimeout(() => {
            notification.classList.remove("active");
        }, 2000);

        console.log(`Sidebar button clicked: ${tool}`);

    });

});