// Live Tracking - Water Usage Tracking
const data = {
    labels: [],
    datasets: [{
        label: 'Water Usage (gallons)',
        data: [],
        backgroundColor: '#00796b',
        borderColor: '#004d40',
        borderWidth: 1
    }]
};

const config = {
    type: 'bar',
    data: data,
    options: {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Water Usage (gallons)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Activity'
                }
            }
        }
    }
};

const usageChart = new Chart(document.getElementById('usageChart'), config);

let totalUsage = 0;

// Handle Water Usage Form Submission (for live tracking)
document.getElementById('waterUsageForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const activity = document.getElementById('activity').value;
    const amount = parseFloat(document.getElementById('amount').value);

    totalUsage += amount;
    document.getElementById('totalUsage').textContent = totalUsage.toFixed(2);

    const existingIndex = data.labels.indexOf(activity);

    if (existingIndex >= 0) {
        data.datasets[0].data[existingIndex] += amount;
    } else {
        data.labels.push(activity);
        data.datasets[0].data.push(amount);
    }

    usageChart.update();
});

// Display total water usage dynamically
function updateWaterUsage() {
    const waterUsage = localStorage.getItem('totalUsage') || 0;
    document.getElementById('totalUsage')?.textContent = waterUsage;
}

// Call this function to initialize or update the data when the page loads
document.addEventListener('DOMContentLoaded', updateWaterUsage);

// Update the local storage if needed for saving usage history across sessions
function saveWaterUsage() {
    const currentUsage = totalUsage;
    localStorage.setItem('totalUsage', currentUsage);
}
