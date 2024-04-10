"""This module provides common functions responsible for exporting/importing to various file formats"""

import json
import io
import zipfile


def export_json(label_object):
    """
    Creates a file to serve in JSON format

    Parameters
    ----------
    label_object (dict):
        The label object as used in the rest of the application
    Returns
    -------
    buffer:
        The JSON buffer to return to the user
    """
    json_buf = io.BytesIO()
    dicom_obj = json.dumps(
        {"labels": label_object.dicom_labels, "label_types": label_object.labels}
    )
    json_buf = io.BytesIO(dicom_obj.encode("utf-8"))
    json_buf.seek(0)

    return json_buf


def export_yolo(label_object):
    """
    Creates a file to serve in YOLO label format

    Parameters
    ----------
    label_object (dict):
        The label object as used in the rest of the application
    Returns
    -------
    buffer:
        The zipfile buffer containing the labels to return to the user

    Format
    ------
    Per label:
        label_name min_x min_y max_x max_y
    This is performed in a different file for image

    """
    zip_buf = io.BytesIO()

    with zipfile.ZipFile(zip_buf, "w") as zf:
        for i, dicom_slide in enumerate(label_object.dicom_labels):
            if dicom_slide is not None:
                content = ""
                for label in dicom_slide:
                    content += f"{label['name']} {label['points'][0][0]} {label['points'][0][1]} {label['points'][1][0]} {label['points'][1][1]}\n"
                zf.writestr(f"label {i}.txt", content.encode())

    zip_buf.seek(0)
    return zip_buf


def import_json(label_object, json_obj):
    """
    Loads a JSON string into the label_object

    Parameters
    ----------
    label_object (dict):
        The label object as used in the rest of the application
    json_obj (FileStorage):
        The contents of an uploaded JSON file containing the data
    Returns
    -------
    success:
        Whether or not the operation was successful
    """
    try:
        json_str = json_obj.read()
        import_dict = json.loads(json_str)
        label_object.dicom_labels = import_dict["labels"]
        label_object.labels = import_dict["label_types"]
    except IndexError:
        return False
    return True
