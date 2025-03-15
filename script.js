// Toggle between login and signup forms
document.getElementById('signup-link').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.login-container').classList.add('hidden');
    document.querySelector('.signup-container').classList.remove('hidden');
  });
  
  document.getElementById('login-link').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.signup-container').classList.add('hidden');
    document.querySelector('.login-container').classList.remove('hidden');
  });
  
  // Simulate login (for demo purposes)
  document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Basic validation (for demo purposes)
    if (email && password) {
      // Hide login page and show dashboard
      document.getElementById('login-page').classList.add('hidden');
      document.getElementById('dashboard').classList.remove('hidden');
    } else {
      alert('Please enter both email and password.');
    }
  });
  
  // Simulate signup (for demo purposes)
  document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('new-email').value;
    const password = document.getElementById('new-password').value;
  
    // Basic validation (for demo purposes)
    if (name && email && password) {
      alert('Account created successfully! Please log in.');
      document.querySelector('.signup-container').classList.add('hidden');
      document.querySelector('.login-container').classList.remove('hidden');
    } else {
      alert('Please fill out all fields.');
    }
  });
  
  // Logout functionality
  document.getElementById('logout-button').addEventListener('click', () => {
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('login-page').classList.remove('hidden');
  });
  
  // Toggle disease card content
  function toggleCard(card) {
    const content = card.querySelector('.card-content');
    content.classList.toggle('show');
  }
  
  // Simulate activity tracker data (for demo purposes)
  setInterval(() => {
    document.getElementById('step-count').textContent = Math.floor(Math.random() * 10000);
    document.getElementById('heart-rate').textContent = Math.floor(Math.random() * 100);
    document.getElementById('sleep-cycle').textContent = (Math.random() * 8).toFixed(1);
    document.getElementById('menstrual-cycle').textContent = Math.floor(Math.random() * 30);
  }, 5000);
  
  // Drag-and-Drop File Upload
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('prescription-file');
const previewContent = document.getElementById('preview-content');
const filePreview = document.getElementById('file-preview');
const removeFileButton = document.getElementById('remove-file');
const progressBar = document.getElementById('progress-bar');
const progress = document.getElementById('progress');
const uploadHistory = document.getElementById('upload-history');
const historyList = document.getElementById('history-list');

// Prevent default drag behaviors
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(event => {
  dropZone.addEventListener(event, preventDefaults, false);
});

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

// Highlight drop zone when file is dragged over
['dragenter', 'dragover'].forEach(event => {
  dropZone.addEventListener(event, () => dropZone.classList.add('dragover'), false);
});

['dragleave', 'drop'].forEach(event => {
  dropZone.addEventListener(event, () => dropZone.classList.remove('dragover'), false);
});

// Handle dropped files
dropZone.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    fileInput.files = files;
    handleFiles(files);
  }
}

// Handle file input change
fileInput.addEventListener('change', (e) => {
  handleFiles(e.target.files);
});

function handleFiles(files) {
  const file = files[0];
  if (file) {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        previewContent.innerHTML = `<img src="${e.target.result}" alt="File Preview">`;
        filePreview.classList.remove('hidden');
      };
      reader.readAsDataURL(file);
    } else if (file.type === 'application/pdf') {
      previewContent.innerHTML = `<p>PDF File: ${file.name}</p>`;
      filePreview.classList.remove('hidden');
    }
  }
}

// Remove file
removeFileButton.addEventListener('click', () => {
  fileInput.value = '';
  previewContent.innerHTML = '';
  filePreview.classList.add('hidden');
});

// Simulate file upload with progress bar
document.getElementById('upload-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const file = fileInput.files[0];
  if (file) {
    progressBar.classList.remove('hidden');
    let width = 0;
    const interval = setInterval(() => {
      if (width >= 100) {
        clearInterval(interval);
        document.getElementById('upload-status').textContent = 'Prescription uploaded successfully!';
        addToUploadHistory(file.name);
        uploadHistory.classList.remove('hidden');
      } else {
        width++;
        progress.style.width = `${width}%`;
      }
    }, 20);
  } else {
    document.getElementById('upload-status').textContent = 'Please select a file to upload.';
  }
});

// Add uploaded file to history
function addToUploadHistory(fileName) {
  const listItem = document.createElement('li');
  listItem.innerHTML = `
    <span>${fileName}</span>
    <i class="fas fa-download" onclick="downloadFile('${fileName}')"></i>
  `;
  historyList.appendChild(listItem);
}

// Simulate file download (for demo purposes)
function downloadFile(fileName) {
  alert(`Downloading ${fileName}...`);
  // In a real application, you would link to the actual file here.
}