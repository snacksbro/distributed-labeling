"""
This module handles both routes and file handling for the application
"""

import io
import json

from flask import Flask, request, send_file
from flask_cors import CORS
from server.upload import check_filetype, handle_upload
from dicom.DicomInfo import DicomInfo
from label.label_manager import LabelManager


app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = 16 * 1024 * 1024 * 1024  # 16GB lol
CORS(app)
app.config["CORS_HEADERS"] = "Access-Control-Allow-Origin"


class Viewer:
    def __init__(self, dicom_path):
        self.dicom = DicomInfo(dicom_path)
        self.labels = LabelManager(self.dicom.slide_count)


dicom_object = None
label_object = None


@app.route("/upload_file", methods=["POST"])
def upload_file():
    global dicom_object
    global label_object

    status_message = {"success": False, "message": "", "slice_count": 0}
    dicom_object, label_object = handle_upload(request)
    if dicom_object is not None:
        status_message["success"] = True
        status_message["message"] = "File upload complete!"
        status_message["slice_count"] = dicom_object.slide_count
    else:
        status_message["message"] = "File isn't supported!"
    return status_message


@app.route("/get_slice_info", methods=["GET"])
def get_slice_info():
    """
    Returns:
        str (JSON): With width, height, and total slices
    """
    width, height = dicom_object.get_dimensions()
    slice_info = {
        "width": width,
        "height": height,
        "count": dicom_object.slide_count,
    }

    # Since segment data is injected at arbitrary indexes, we have to
    # catch errors rather than checking length
    try:
        slice_info["segments"] = dicom_object.get_segment(
            int(request.args.get("index"))
        )
    except IndexError:
        slice_info["segments"] = None

    return json.dumps(slice_info)


@app.route("/send_segmentation", methods=["POST"])
def send_segmentation():
    """
    Recieves segmenation data from the client in the form of a JSON matrix

    Returns:
        str (JSON): With a 'success' boolean
    """
    data = request.get_json()
    segments = data.get("segments")
    index = data.get("index")
    dicom_object.set_segment(index, segments)

    return json.dumps({"success": True})


@app.route("/get_slice", methods=["GET"])
def get_slice():
    """
    Parses a specific slice of the uploaded DICOM for viewing

    Parameters:
        - None, relies on dicom_stack

    Returns:
        - Image: The dicom image

    """

    # Will take in an index, and return a PNG of the global dicom stack
    if dicom_object is None:
        return "Need to upload first!"

    slide_index = int(request.args.get("index"))
    slide_image = dicom_object.get_slide(slide_index)

    # Preparing the image for transfer
    img_io = io.BytesIO()
    slide_image.save(img_io, "PNG")
    img_io.seek(0)

    return send_file(
        img_io,
        download_name="test_slide.png",
        mimetype="image/png",
        as_attachment=True,
    )


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=3001, debug=True)
