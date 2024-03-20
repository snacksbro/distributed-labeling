import magic
from dicom.DicomInfo import DicomInfo

SUPPORTED_FILETYPES = {"application/dicom"}


def check_filetype(file):
    """
    Checks if a file's MIMETYPE is supported

    Parameters:
        - file: The file object provided by request.files

    Returns:
        - bool: Whether or not the file is supported

    """
    mimetype = magic.Magic(mime=True)
    filetype = mimetype.from_buffer(file.read(1024))
    print(f"Error, got {filetype}")

    return filetype in SUPPORTED_FILETYPES


def handle_upload(request):
    """
    Recieve a file upload and emit a response

    Parameters:
        - None

    Returns:
        - str: A message on the upload status

    """

    status_message = {"success": False, "message": "", "slice_count": 0}

    file = request.files["file"]
    if "file" not in request.files:
        status_message["message"] = "No file part, is the file valid?"
        return status_message

    if check_filetype(file):
        file.stream.seek(0)  # Ensure the reader is in the proper location
        save_path = "uploads/" + file.filename
        file.save(save_path)
        # dicom_path = save_path
        # dicom_stack = parse_dicom(dicom_path)
        dicom_object = DicomInfo(save_path)

        status_message["success"] = True
        status_message["message"] = f"File '{file.filename}' upload complete!"
        # status_message["slice_count"] = len(dicom_stack)
        print("UPLOAD WORKED")
        # dicom_segments = [None for i in range(len(dicom_stack))]
        print(f"SEGMENT LENGTH IS {(dicom_object.slide_count)}")
    else:
        # TODO: Change this to the actual extension
        status_message["message"] = f"File '{file.filename}' isn't supported!"
        return None
    # return json.dumps(status_message)`
    return dicom_object
