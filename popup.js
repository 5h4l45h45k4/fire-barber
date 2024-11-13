// Function to update the whitelist
function updateWhitelist(url) {
    const whitelist = JSON.parse(localStorage.getItem('whitelist') || '[]');
    if (!whitelist.includes(url)) {
        whitelist.push(url);
        localStorage.setItem('whitelist', JSON.stringify(whitelist));
    }
}

// Event listener for adding the current URL to the whitelist
document.getElementById('add-to-whitelist').addEventListener('click', () => {
    const currentUrl = window.location.href;
    updateWhitelist(currentUrl);
});

// Event listener for opening the whitelist
document.getElementById('open-whitelist').addEventListener('click', () => {
    const whitelist = JSON.parse(localStorage.getItem('whitelist') || '[]');
    const whitelistText = whitelist.join('\n');
    
    // Trigger a download of the whitelist as a text file
    const blob = new Blob([whitelistText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'whitelist.txt';
    link.click();
});
