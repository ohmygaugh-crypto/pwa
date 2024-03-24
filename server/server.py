from flask import Flask, request, jsonify
import pytesseract
from PIL import Image
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv
from io import BytesIO


app = Flask(__name__)
CORS(app)  # Handle CORS

load_dotenv()

# OpenAI API Key (should be stored securely in a production environment)
openai.api_key = os.getenv("OPENAI_API_KEY")


@app.route('/process', methods=['POST'])
def process():
    file = request.files.get('file')
    url = request.form.get('url')

    if file:
        image = Image.open(file.stream)
        recipe_text = pytesseract.image_to_string(image)
    elif url:
        response = requests.get(url)
        recipe_text = response.text
    else:
        return jsonify({'error': 'No file or URL provided'})



    # Format with OpenAI
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": "Your are a helpful assistant. You're aim is to enhance the mobile phone experience for the people who glance at recipes on their smartphone while cooking. They want to enjoy a more managable visual experience by making it visually less cumbersome than the input they will share with you. Your output is also to display the recipe in a manner that is helpfully more digestable to read in a hurry. Utilizing emoji where it can illustrate the actions in a recipe is an ideal aid, but only where it is purposefully/thoughtfully done."
            },
            {
                "role":"user",
                "content": f"""
                Using the provided text, extract and format the recipe in the following manner:
                 1. Clearly distinguish between preparation steps and cooking steps in the instrutions. Use Emoji's within the sentence whenever applicable.
                 2. Utilize recipe related emojis to make reading each step more visually evident which item you are supposed to touch/use.
                 3. Bold all crucial cooking technique phrases regarding food orientation that effects desired outcome like: 'skin side down'. Do this also for: temperature control instructions like: 'medium-high'. Do this for: that requires subtle finesse in the recipe's cooking technique that shouldn't go unnoticed.
                 4. Italicize any unconventional wisdom or clever cooking techniques denoted by the author. 
                 Text for extraction:
                 {recipe_text}
                 """
            }
        ],
        max_tokens=1000
    )
    # Print the response to understand its structure
    print(response)

    # Get the 'assistant' message from the response
    assistant_message = response['choices'][0]['message']
    # If an 'assistant' message is found, get its content
    if assistant_message['role'] == 'assistant':
        formatted_recipe = assistant_message['content'].strip()
    else:
        formatted_recipe = "No recipe found."   

    return jsonify({'recipe': formatted_recipe})


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))


