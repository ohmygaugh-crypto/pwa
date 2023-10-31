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