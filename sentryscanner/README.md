# SentryScanner Extension

#### MAKE SURE WHEN TESTING THE URL CHECKER, PLEASE INITIALISE THE FASTAPI DEPLOYMENT OF OUR ML MODEL FIRST - find out more at `/ML_Model`.

---

When you are in the `/sentryscanner` directory, run the following commands.

To install all dependencies:

```
npm install
```

To build the extension to the directory: `/sentryscanner/dist`:

```
npm run build
```

To load the (unpacked) extension on Chrome:

1. Go to the extensions tab on google chrome (chrome://extensions/)
2. Enable "Developer mode" on the top right of the tab
3. Press on "Load unpacked" button on top left corner
4. Browse for the /dist folder and open that folder

---

\*\*Take note that De.Fi API calls are limited by credits. Hence do replace `"X-Api-Key"` in `/src/Popup.jsx` with own key if scanner fails to give anymore results.

Head over to [De.fi's API Dashboard page to get a new key.](https://de.fi/api/dashboard)

Below is an example of the code chunk to edit:

```bash
fetch("https://public-api.de.fi/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": "REPLACE-WITH-NEW-DEFI-API-KEY",
        },
        ...
```
