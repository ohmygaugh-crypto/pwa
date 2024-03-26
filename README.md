use this to convert png to favicon: https://favicon.io/favicon-converter/

Get pwa showcased here: https://store.app/

# Getting started

Welcome to Cursor. Here are the basics:

* Highlight code. Hit Cmd+K to prompt an edit.
* Open chat by clicking the right-bar button (on the top-right).
  - Highlight code and hit Cmd+Shift+L to focus the AI on particular pieces of code 
  - Try the "with codebase" button to ask about the entire repo
  - Use @ to import documentation
* Hover over a lint error. Click "Fix in chat."
* Hover over a terminal error. Click "Auto-Debug".

Try using Cursor to generate edits, spot bugs, find code, learn about docs, and explain code.

If you run into any trouble or have any feedback, feel free to reach out at hi@cursor.so.

---
adding server.py
I needed to brew install the respective python files within my venv

The error message is indicating that the Tesseract OCR engine is not installed or not found in your system's PATH. Tesseract is a dependency for the pytesseract Python library, which is used in your code to convert image data to text.

To resolve this issue, you need to install Tesseract and ensure it's in your system's PATH. Here's how you can do it:

1. Install Tesseract: The installation process varies depending on your operating system.

- For macOS, you can use Homebrew:
tesseract
``` brew install tesseract ```

- For Ubuntu, you can use apt:
ocr

- For Windows, you can download the installer from the GitHub releases page and then add the Tesseract path to your system's PATH.

2. Add Tesseract to PATH: If the installation was successful but the error persists, it's likely that Tesseract is not in your system's PATH. You can add it by:

- For macOS and Ubuntu, the Homebrew and apt packages usually add Tesseract to your PATH automatically. If not, you can find where it's installed with which tesseract and add that directory to your PATH in your shell profile file (like .bashrc or .zshrc).

- For Windows, you need to add the Tesseract directory to your system's PATH manually. You can do this from the System Properties -> Advanced -> Environment Variables.

After installing Tesseract and adding it to your PATH, restart your terminal and try running your Python script again. It should now be able to find and use Tesseract.

---
Irrelevant files/files that didn't make the cut/learning checkpoints( i need to ask if i'm missing anything to enable pwa download):
gptmanifest.json
workbox-config
  sw.js
  sw.js.map
  workbox-8d0
  workbox-8d0.map
index2.tsx

add a newsticker like this? --> https://www.shrinkflation.io/

better:
https://grocerytracker.ca/

want to help foodhobo be more accurate?



Also I think I need to adjust the prompting set up to be RAG or whatever the iterative approach is. Zero shot throws too much complexity at the api at once. It would be could to compartmentalize different elements of the recipe sections into varying component stores that can be referenced amongst the rest

such as -->return the recipe as is--> prompt 2: add markdown table and sort ingredients accrodingly(ensure measurements are accurately stated)  ---> prompt 3: add emojis to instructions --> insert emojis inside markdown table where they cross reference the same emoji in ---> prompt 4: whatever gets this thing right ---> prompt 5: suggest cleanup and equipment preparation/purchasing based on what the recipe calls for

remember that when they create their accounts each person will and attirbutes regarding brand name ingredients(sauces only for now) they prefer. They will also state which equipment they have in their inventory. This will autofilter recipes

https://sbtron.github.io/makeglb/

verify if corrupt here:

https://gltf-viewer.donmccurdy.com/


.. and ok then what should I expect to happen when I share a url from the browser directly to the installed PWA? Should I expect to log the url being shared to it somewhere? Should I expect to be able to open the PWA and see the url in a list of shared urls?

I could make a list of shared urls that are awaiting to be converted like how the images are converted... that what when you share a recipe to a friend they can convert it themselves? or would it be better to share 


OLD:
https://developer.chrome.com/docs/capabilities/pwa-url-handler

NEW:
https://github.com/WICG/pwa-url-handler/blob/main/handle_links/explainer.md
h

Imagine I'm on some recipe website and I want to share the url(@https://natashaskitchen.com/wprm_print/64201 ) of the website to the pwa my phone. I click the search bar, which automatically selects all text in the url, and I click the share button conviently located to the right within the search bar. A list of share targets come up on my phone which include an option to tap my pwa. I tap my pwa.  My pwa launches, but opens a 404 page. What is going on here? What is my pwa expecting to recieve. Tell me from the point of view as an expert in progressive web apps

GET is for fetching data, appending parameters in the URL, ideal for searches. POST, used for updates, sends data securely in the request body, perfect for forms. Each has specific use cases based on security and data size needs.

So I modified the manifest to include the following:

```json
"action": "/share-target",
"method": "GET",
"params": {
  "text": "description",
  "url": "link"
}
```


// Your PWA's main JavaScript code
// Handle shared data using the URLSearchParams interface
const url = new URL(document.location);
const sharedDescription = url.searchParams.get("description");
const sharedLink = url.searchParams.get("link");