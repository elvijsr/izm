#!/usr/bin/env python3
from dotenv import load_dotenv
from langchain.chains import RetrievalQA
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from langchain.vectorstores import Chroma
from langchain.llms import GPT4All, LlamaCpp
from flask import Flask, request, jsonify
from google.cloud import translate_v2 as translate
from google.api_core.exceptions import GoogleAPIError
import os
import six
from constants import CHROMA_SETTINGS

load_dotenv()
# Set the GOOGLE_APPLICATION_CREDENTIALS environment variable to the path of your credentials file
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'credentials.json'
embeddings_model_name = os.environ.get("EMBEDDINGS_MODEL_NAME")
persist_directory = os.environ.get('PERSIST_DIRECTORY')

model_type = os.environ.get('MODEL_TYPE')
model_path = os.environ.get('MODEL_PATH')
model_n_ctx = os.environ.get('MODEL_N_CTX')


# Function to validate ISO 639-1 language code format
def validate_language_code(lang_code):
    return len(lang_code) == 2 and lang_code.islower()


# Function to translate text using Google Cloud Translation API
def translate_text(source, target, text):
    # Check if the source and target language codes are valid
    if not validate_language_code(source) or not validate_language_code(target):
        print("Error: Invalid source or target language code.")
        return

    # Create a translation client
    translate_client = translate.Client()

    if isinstance(text, six.binary_type):
        text = text.decode("utf-8")

    result = translate_client.translate(text, source_language=source, target_language=target)

    return result['translatedText']


app = Flask(__name__)

# Prepare the components
embeddings = HuggingFaceEmbeddings(model_name=embeddings_model_name)
db = Chroma(persist_directory=persist_directory, embedding_function=embeddings, client_settings=CHROMA_SETTINGS)
retriever = db.as_retriever()
llm = None
if model_type == "LlamaCpp":
    llm = LlamaCpp(model_path=model_path, n_ctx=model_n_ctx, verbose=False)
elif model_type == "GPT4All":
    llm = GPT4All(model=model_path, n_ctx=model_n_ctx, backend='gptj', verbose=False)
else:
    print(f"Model {model_type} not supported!")
    exit
qa = RetrievalQA.from_chain_type(llm=llm, chain_type="stuff", retriever=retriever, return_source_documents=True)


@app.route('/ask', methods=['POST'])
def ask():
    data = request.get_json()
    query = data.get('question', '')

    # Translate the query to English
    translated_query = translate_text('lv', 'en', query)

    res = qa(translated_query)
    answer, docs = res['result'], res['source_documents']

    # Translate the answer back to Latvian
    translated_answer = translate_text('en', 'lv', answer)

    result = {
        'question': query,
        'answer': translated_answer,
        'documents': [{'source': document.metadata["source"], 'content': document.page_content} for document in docs]
    }
    return jsonify(result)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
