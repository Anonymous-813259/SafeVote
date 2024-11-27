from flask import Flask, request, render_template, jsonify, send_from_directory
import json
import hashlib
from werkzeug.utils import secure_filename
import os
from PIL import Image

app = Flask(__name__)

UPLOAD_FOLDER = 'static/uploads/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg', 'gif'}

# Function to check allowed file types
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

# Resize the image to a fixed size (e.g., 250 x 250)
def resize_image(image_path, target_size=(250, 250)):
    with Image.open(image_path) as img:
        img.thumbnail(target_size)
        img.save(image_path)

@app.route('/upload', methods=['POST'])
def upload_photo():
    if 'image' not in request.files:
        return jsonify({"error": "No photo part"}), 400

    photo = request.files['image']
    partyName = request.form['partyName']

    if photo and allowed_file(photo.filename):
        # Secure the filename and save it with candidate ID
        file_extension = photo.filename.rsplit('.', 1)[1].lower()
        # filename = f"{partyName}.{file_extension}"
        # filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        if file_extension!='jpg':
            filename = photo.filename
            new_filename = os.path.splitext(filename)[0] + '.jpg'

            filepath = os.path.join(app.config['UPLOAD_FOLDER'], new_filename)

            image = Image.open(photo)

            image = image.convert("RGB")  # Convert to RGB if it's not in RGB mode
            image.save(filepath, 'JPEG')  # Save the image as JPG
        else:
            filename = f"{partyName}.{file_extension}"
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            photo.save(filepath)

        # Resize the uploaded image
        resize_image(filepath)
        
        # Return the URL of the uploaded and resized photo
        return jsonify({"message": "Photo uploaded and resized successfully"}), 200

    return jsonify({"error": "Invalid photo format"}), 400

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    # Serve the image file from the 'uploads' directory
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/category')
def category():
    return render_template('category.html')

@app.route('/state-district.json')
def state_district():
    with open('state_district.json', 'r') as file:
        data = json.load(file)
    return data

@app.route('/SafeVote.json')
def read_json():
    with open('build/contracts/SafeVote.json', 'r') as file:
        data = json.load(file)
    return data

@app.route('/chiefLogin')
def chief_login():
    return render_template('chiefLogin.html')

@app.route('/chiefAction')
def chief_action():
    return render_template('chiefAction.html')

@app.route('/generate_hash', methods = ['POST'])
def generate_hash():
    res = request.json
    data = res['value']
    hash_obj = hashlib.sha256(data.encode())
    hash_value = hash_obj.hexdigest()
    return jsonify({'result': hash_value})

@app.route('/voteRegister', methods = ['GET'])
def register_vote():
    return render_template('voteRegister.html')

@app.route('/vote', methods = ['GET'])
def voter_login():
    return render_template('voterLogin.html')

@app.route('/vote/<string:hash>')
def vote(hash):
    return render_template('vote.html',hash = hash)

@app.route('/results')
def results():
    return render_template('results.html')

if __name__ == "__main__":
    app.run(debug=True)