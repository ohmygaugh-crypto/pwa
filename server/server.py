from flask import Flask, request, jsonify
import pytesseract
from PIL import Image
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv


app = Flask(__name__)
CORS(app)  # Handle CORS

load_dotenv()

# OpenAI API Key (should be stored securely in a production environment)
openai.api_key = os.getenv("OPENAI_API_KEY")


@app.route('/process-image', methods=['POST'])
def process_image():
    file = request.files.get('file')
    image = Image.open(file.stream)
    recipe_text = pytesseract.image_to_string(image)

    # Format with OpenAI
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": "Your are a helpful assistant"
            },
            {
                "role":"user",
                "content": f"""
                Using the provided text, extract and format the recipe in the following manner:
                 1. Clearly distinguish between preparation steps and cooking steps.
                 2. Use emojis to make each step visually clear.
                 3. Bold crucial cooking technique phrases like 'skin side down', 'medium-high', and any temperature control instructions.
                 4. Italicize any unconventional wisdom or clever cooking techniques. 
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
    app.run()
