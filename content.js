// Retrieve the whitelist from localStorage
function getWhitelist() {
    const whitelist = localStorage.getItem('whitelist');
    return whitelist ? JSON.parse(whitelist) : [];
}

// Function to apply blur to an element
function applyBlur(element) {
    element.style.filter = "blur(10px)";
}

// Function to remove blur from an element
function removeBlur(element) {
    element.style.filter = "none";
}

// Function to handle elements on the page
function handleElements() {
    const elements = document.querySelectorAll("img, video");
    const whitelist = getWhitelist();
    const currentUrl = window.location.href;

    elements.forEach(element => {
        if (!whitelist.includes(currentUrl)) {
            applyBlur(element);
        } else {
            removeBlur(element);
        }
    });
}

// Initial execution when the page loads
handleElements();

// Observe changes to images and videos
const observer = new MutationObserver(() => {
    handleElements();
});
observer.observe(document.body, { childList: true, subtree: true });
