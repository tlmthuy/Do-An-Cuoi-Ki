const HOURS = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00"];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];

let selectedSlots = new Set();

document.addEventListener("DOMContentLoaded", () => {
    renderInputGrid();
    renderHeatmapGrid(); // Vẽ thêm bảng Heatmap giả lập
});

// 1. Vẽ bảng để User chọn (Interactive Grid)
function renderInputGrid() {
    const container = document.getElementById("input-grid");
    let html = '<table><thead><tr><th></th>'; // Ô góc trái trên trống
    DAYS.forEach(day => html += `<th>${day}</th>`);
    html += '</tr></thead><tbody>';

    HOURS.forEach(hour => {
        html += `<tr><td>${hour}</td>`;
        DAYS.forEach(day => {
            const slotId = `${day}|${hour}`;
            html += `<td class="slot" data-id="${slotId}" onclick="toggleSlot(this)"></td>`;
        });
        html += '</tr>';
    });
    html += '</tbody></table>';
    container.innerHTML = html;
}

// 2. Vẽ bảng Heatmap (Static Grid - Giả lập dữ liệu nhóm)
function renderHeatmapGrid() {
    const container = document.getElementById("heatmap-grid");
    let html = '<table><thead><tr><th></th>';
    DAYS.forEach(day => html += `<th>${day}</th>`);
    html += '</tr></thead><tbody>';

    HOURS.forEach(hour => {
        html += `<tr><td>${hour}</td>`;
        DAYS.forEach(day => {
            // Giả lập độ đậm nhạt ngẫu nhiên (0 đến 3)
            // Trong thực tế, số này lấy từ Backend (số người rảnh tại giờ đó)
            const randomLevel = Math.floor(Math.random() * 4); 
            html += `<td class="heatmap-slot level-${randomLevel}"></td>`;
        });
        html += '</tr>';
    });
    html += '</tbody></table>';
    container.innerHTML = html;
}

function toggleSlot(cell) {
    const id = cell.getAttribute("data-id");
    if (selectedSlots.has(id)) {
        selectedSlots.delete(id);
        cell.classList.remove("selected");
    } else {
        selectedSlots.add(id);
        cell.classList.add("selected");
    }
}

function clearAll() {
    selectedSlots.clear();
    document.querySelectorAll(".slot").forEach(cell => cell.classList.remove("selected"));
}

function saveData() {
    const result = Array.from(selectedSlots).map(slot => {
        const [day, time] = slot.split("|");
        return { date: day, time: time };
    });
    console.log("Saved Availability:", result);
    alert("Saved successfully! Data logged to console.");
}