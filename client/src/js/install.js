const butInstall = document.getElementById('buttonInstall');

let deferredPrompt; // Used to store the event for later use

// Logic for installing the PWA
// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault(); // Prevent the default prompt behavior
  deferredPrompt = event; // Store the event for later use
  // Update UI to show the install button or show a custom UI element
  butInstall.style.display = 'block';
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  if (deferredPrompt) {
    // Show the install prompt
    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;

    if (result.outcome === 'accepted') {
      console.log('PWA installation accepted');
    } else {
      console.log('PWA installation canceled');
    }

    deferredPrompt = null; // Reset the deferredPrompt variable
    butInstall.style.display = 'none'; // Hide the install button
  }
});

// Add a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('PWA app installed', event);
  butInstall.style.display = 'none'; // Hide the install button
});
