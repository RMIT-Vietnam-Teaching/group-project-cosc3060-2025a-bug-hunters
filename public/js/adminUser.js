// Sorting functionality for the admin user table
document.addEventListener("DOMContentLoaded", () => {
    const table = document.querySelector(".admin-table tbody");
    const headers = document.querySelectorAll(".sortable");
    let sortDirection = 1; // 1 = ascending, -1 = descending
    let currentSortKey = "";

    headers.forEach((header) => {
        header.style.cursor = "pointer";
        header.addEventListener("click", () => {
            const sortKey = header.dataset.sort;
            const rows = Array.from(table.querySelectorAll("tr"));

            if (currentSortKey === sortKey) {
                sortDirection *= -1; // toggle direction
            } else {
                sortDirection = 1;
                currentSortKey = sortKey;
            }

            rows.sort((a, b) => {
                const aVal = a
                    .querySelector(`td:nth-child(${getIndex(sortKey)})`)
                    ?.innerText.trim()
                    .toLowerCase();
                const bVal = b
                    .querySelector(`td:nth-child(${getIndex(sortKey)})`)
                    ?.innerText.trim()
                    .toLowerCase();

                if (aVal < bVal) return -1 * sortDirection;
                if (aVal > bVal) return 1 * sortDirection;
                return 0;
            });

            rows.forEach((row) => table.appendChild(row));
        });
    });

    // Correct mapping based on your table
    function getIndex(key) {
        switch (key) {
            case "firstName":
                return 1;
            case "lastName":
                return 2;
            case "email":
                return 3;
            case "role":
                return 4;
            default:
                return 1;
        }
    }

    // Row click navigation
    const rows = document.querySelectorAll(".user-row");
    rows.forEach((row) => {
        row.addEventListener("click", () => {
            const userId = row.dataset.id;
            window.location.href = `/admin/user/${userId}`;
        });
    });
});

// Redirect to user profile on row click
document.addEventListener("DOMContentLoaded", () => {
    const rows = document.querySelectorAll(".user-row");
    rows.forEach((row) => {
        row.addEventListener("click", () => {
            const userId = row.getAttribute("data-id");
            window.location.href = `/admin/user/${userId}`;
        });
    });
});
