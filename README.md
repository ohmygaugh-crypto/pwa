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


11/07/23 Setting up Auth0(Full stack), then Stripe, then tokeneconomics, then product output finetuning improvement, then cooking touchscreen, haptics, and audio UIUX performance, then credit gamificaiton, leveling system for socialization of the app and stickyness.
Pay Credits to 3d generate your own foodhobo NFT. (cosmetic clout)

https://cdn2.auth0.com/docs/media/articles/architecture-scenarios/planning/B2C-Project-Planning.pdf
**VIEW THIS** 
https://developer.auth0.com/resources/guides/spa/react/basic-authentication react v18 NOT v17
https://developer.auth0.com/resources/guides/spa/react/basic-authentication/v17-javascript-react-router-5#quick-react-setup


I want to add a route gaurd around the results webpages upon hitting the convert button after having 4 recipes in the recipelist:

```
Add Route Guards to React
You'll create a <ProtectedRoute> component that serves as an authentication route guard to restrict access to React routes. React will ask users who visit any route guarded by <ProtectedRoute> to log in if they haven't already. Once they log in, React takes them to the route they tried to access by leveraging the functionality of the Auth0 React SDK.

<ProtectedRoute> will use the <Route> component from React Router v5 to render the withAuthenticationRequired Higher-Order Component from the Auth0 React SDK. The advantage of this approach is that your <ProtectedRoute> will have the same API as an out-of-the-box <Route> component. As such, you can compose <ProtectedRoute> with other React Router components organically.
```


How to prompt better code abstractions with a more accurate level of granularity as a template before really intetwining custom code.

find 100 ways to skin a cat regarding converting a recipe in different nuanced user ways to compete with pinterest, "cook.wiki/", screen shot randomness, bookmarks, etc.

change prompt to just aid tesseract with scraping the webcontents accurately... then upon purchase, I can emojify the recipe for speed reading performance capabilities sake/premiun feature

for now I need to make sure I can import recipes from every corner of the internet


https://cooked.wiki/

extension makes it so that when you click "jump to recipe" it automatically sends that to your foodhobo account
copy paste url into foodhobo.io rather than just screen shots
choose file-->choose from bookmarks
or open in reading mode new chrome feature does all this for free!!! fuck but for android it does have a stupid popup
do the url thing that cooked.wiki does? that seems like you can do from anywhere on the web and it instantenously adds it to the website... smart but I may have to rework my url backslash system
credit the original author/website... and scrape some of the images used?

handling shared data form other apps. register my pwa as a target

the pwa installs on androind as expected but we still get an error when injesting shared data


Olauncher needs to support saved urls/pwas... that would be clutch

have destination urls be intercepted with a server that takes a long screenshot of the whole screen? is that more efficent/accurate than parsing int? i would think some gets lost in translation here

https://developer.chrome.com/docs/devtools/remote-debugging (usb debugging)
https://www.youtube.com/watch?v=K7fPqQnmBpU (usb debugging pwa)

basically I needed to enable usb debugging on my pixel, then Go to this url: chrome://inspect#devices 

then my device "Pixel 8" will be listed. then upon opening my pwa it will state that the foodhobov1.netlify.com is running in the chrome browser alongside a service worker


March 24th 2024
-I pushed a new commit to the reciev_url branch
- that contained new logic to "hopefully" prevent the dev tools from crashing when I share the url to the pwa... as the pwa now has a recieve component... the issue i'm realizing now is that the user doesn't get updates automatically whenever I push the lateset release... instead their local app rocks with the old version until I find a clever way to notify the user that the latest one is available and that they ought to sync their cache(potentionally losing work/memory??)
see this: https://medium.com/progressive-web-apps/pwa-create-a-new-update-available-notification-using-service-workers-18be9168d717

- man somewhere along the way I broke the route redirect after converting the file.... although everything works as expected locally My online deploys are facing unexpected 404 errors... It think it went unoticed because the past couple of pushes my netlify was still showing a "beta" split A/B test between two of the older branches rather than the one I was working on... I may need to revert back to previous branch, or start a new one and manually purge lines of code across files(too confusing to attempt this latter one ☝️ frankly)

