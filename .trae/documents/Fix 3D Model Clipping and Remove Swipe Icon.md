I will implement a solution using the **Sketchfab Viewer API** to programmatically control the viewer and simulate an interaction to dismiss the swipe hint.

### **Plan**

1.  **Refactor `Background3D.tsx`**:
    *   Switch from a static `src` iframe to a dynamically initialized Sketchfab Viewer API client.
    *   Load the `sketchfab-viewer-1.12.1.js` script dynamically.
    *   Initialize the client with the `ui_hint: 0` parameter (and all other UI hiding parameters).
    *   **Simulate Interaction**: Inside the `viewerready` callback, use `api.setCameraLookAt` to perform a subtle, imperceptible camera movement. This programmatic "touch" effectively signals to the viewer that interaction has occurred, forcing the dismissal of any remaining "swipe to rotate" hints, while the `autospin` continues to rotate the object.
    *   Ensure the container remains `pointer-events-none` so the user cannot manually interfere, while the API controls the view.

### **Why this works**
The "swipe to rotate" hint is often an overlay that waits for the first "user" interaction. By sending a camera command via the API (`setCameraLookAt`) immediately upon load, we programmatically satisfy this "first interaction" requirement without needing the user to click.