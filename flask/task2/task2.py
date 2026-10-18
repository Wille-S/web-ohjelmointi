from flask import Flask
import json

with open('dictionary.json', 'r', encoding="utf-8") as f:
    dictionary = json.load(f)

app = Flask(__name__)

@app.route('/translate/<word>', methods=['GET'])
def translate_string(word):
    word = word.lower()
    translation = dictionary.get(word)
    if translation is None:
        response = {
            "error": "Word not found"
        }
    else:
        response = {
            "English": word,
            "Finnish": translation
        }
    return response

@app.route('/words')
def words():
    word_list = list(dictionary.keys())
    return word_list

if __name__ == '__main__':
    app.run (host='127.0.0.1', port=3000, use_reloader=True)