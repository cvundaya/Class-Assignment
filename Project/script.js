// Set base path to reflect the GitHub Pages URL structure
const basePath = '/Class-Assignment/Project/'; // Update the basePath for your GitHub repository structure

// Fetch the data.json file from the correct location
fetch(`${basePath}data.json`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to load: ${response.status} ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = ''; // Clear the task list before adding new content

        console.log('Data loaded:', data);

        data.forEach(task => {
            const thumbnail = document.createElement('div');
            thumbnail.classList.add('thumbnail');

            // Add title to the thumbnail (without image)
            thumbnail.innerHTML = `<h3>${task.title}</h3>`;

            // Add an event listener for task click
            thumbnail.addEventListener('click', () => loadTaskContent(task.title, task.files));

            // Append the thumbnail to the task list
            taskList.appendChild(thumbnail);
        });
    })
    .catch(error => console.error('Error loading task data:', error));

// Load task content dynamically using an iframe
function loadTaskContent(title, files) {
    console.log('Loading task content:', title);

    const modal = document.getElementById('task-modal');
    const modalContent = document.getElementById('modal-task-details');

    // Initial loading message
    modalContent.innerHTML = '<p>Loading...</p>';
    modal.style.display = "block";

    if (files && files.length > 0) {
        // Use iframe to load HTML file directly as a webpage
        modalContent.innerHTML = `
            <h3>${title}</h3>
            <iframe src="${basePath}Tasks/${files[0]}" 
                    width="100%" 
                    height="500px" 
                    frameborder="0" 
                    style="border: none; border-radius: 8px; box-shadow: 0px 4px 10px rgba(0,0,0,0.1);">
            </iframe>
        `;
    } else {
        modalContent.innerHTML = '<p>No files available for this task.</p>';
    }
}

// Close Modal Logic
const modal = document.getElementById('task-modal');
const closeButton = document.querySelector('.close-button');

closeButton.onclick = function() {
    modal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
