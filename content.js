// Function to apply blur to an element
function applyBlur(element) {
    const tag = element.tagName.toLowerCase();

    // Blur <img>, <video>, <svg>, <canvas>, and elements with background images
    if (tag === 'img' || tag === 'video' || tag === 'svg' || tag === 'canvas') {
        element.style.filter = 'blur(8px)';
        element.addEventListener('mouseenter', () => removeBlur(element));
        element.addEventListener('mouseleave', () => applyBlur(element));
    } 
    // Blur elements with background images (e.g., <a>, <div>, <span>)
    else if (window.getComputedStyle(element).backgroundImage !== 'none') {
        const overlay = createOverlayForBackgroundImage(element);
        element.appendChild(overlay);
        overlay.addEventListener('mouseenter', () => removeBlur(overlay));
        overlay.addEventListener('mouseleave', () => applyBlur(element));
    } 
    // Blur <iframe>, <object>, <embed>
    else if (tag === 'iframe' || tag === 'object' || tag === 'embed') {
        element.style.filter = 'blur(8px)';
        element.addEventListener('mouseenter', () => removeBlur(element));
        element.addEventListener('mouseleave', () => applyBlur(element));
    }
}

// Helper function to remove blur from an element
function removeBlur(element) {
    if (element.tagName.toLowerCase() === 'div' && element.style.position === 'relative') {
        // Remove overlay if used for background images
        const overlay = element.querySelector('.blur-overlay');
        if (overlay) element.removeChild(overlay);
    } else {
        element.style.filter = 'none';
    }
}

// Function to create an overlay for background images
function createOverlayForBackgroundImage(element) {
    const style = window.getComputedStyle(element);
    const overlay = document.createElement('div');
    overlay.className = 'blur-overlay';
    overlay.style.position = 'absolute';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundImage = style.backgroundImage;
    overlay.style.backgroundColor = style.backgroundColor || '#fff';
    overlay.style.filter = 'blur(8px)';
    overlay.style.pointerEvents = 'none';
    return overlay;
}

// Function to handle all applicable elements on the page
function handleElements() {
    const elements = document.querySelectorAll("img, video, svg, canvas, a, div, span, iframe, object, embed, picture source");

    elements.forEach(element => {
        applyBlur(element);
    });
}

// Initial execution when the page loads
handleElements();

// Observe changes to images, videos, and background images within the document
const observer = new MutationObserver(() => {
    handleElements();
});
observer.observe(document.body, { childList: true, subtree: true });
