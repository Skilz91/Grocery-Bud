document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector(".grocery-form");
    const alert = document.querySelector(".alert");
    const grocery = document.getElementById("grocery");
    const container = document.querySelector(".grocery-container");
    const list = document.querySelector(".grocery-list");
    const clearBtn = document.querySelector(".clear-btn");

    // Pull local storage arrays on launch
    let items = JSON.parse(localStorage.getItem("grocery_bud_list")) || [];

    const displayAlert = (text, action) => {
        alert.textContent = text;
        alert.className = `alert alert-${action}`;
        setTimeout(() => {
            alert.textContent = "";
            alert.className = "alert";
        }, 1500);
    };

    const renderList = () => {
        list.innerHTML = "";
        if (items.length > 0) {
            container.classList.add("show-container");
            items.forEach((item) => {
                const element = document.createElement("article");
                element.classList.add("grocery-item");
                element.innerHTML = `
                    <p class="title">${item.value}</p>
                    <div class="btn-container">
                        <button type="button" class="delete-btn" onclick="window.removeItem('${item.id}')">Delete</button>
                    </div>`;
                list.appendChild(element);
            });
        } else {
            container.classList.remove("show-container");
        }
    };

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const value = grocery.value.trim();
        const id = new Date().getTime().toString(); // Creates a completely unique ID string

        if (value) {
            items.push({ id, value });
            localStorage.setItem("grocery_bud_list", JSON.stringify(items));
            displayAlert("Item added successfully", "success");
            grocery.value = "";
            renderList();
        }
    });

    window.removeItem = (id) => {
        items = items.filter((item) => item.id !== id);
        localStorage.setItem("grocery_bud_list", JSON.stringify(items));
        displayAlert("Item removed from list", "danger");
        renderList();
    };

    clearBtn.addEventListener("click", () => {
        items = [];
        localStorage.removeItem("grocery_bud_list");
        displayAlert("All items cleared", "danger");
        renderList();
    });

    // Execute state engine pass
    renderList();
});
