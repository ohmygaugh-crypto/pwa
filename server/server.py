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
    response = openai.Completion.create(
        model="gpt-3.5-turbo",
        prompt=f"Extract and format the recipe from the following text:\n\n{recipe_text}",
        max_tokens=500
    )
    formatted_recipe = response.choices[0].text.strip()

    return jsonify({'recipe': formatted_recipe})


if __name__ == "__main__":
    app.run()
