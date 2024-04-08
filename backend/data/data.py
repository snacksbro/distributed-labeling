"""This module provides common functions responsible for exporting/importing to various file formats"""

import json
import io


def export_json(label_object):
    """
    Creates a file to serve in JSON format

    Parameters
    ----------
    The label object as used in the rest of the application
    Returns
    -------
    The JSON buffer to return to the user
    """
    json_buf = io.BytesIO()
    dicom_obj = json.dumps(
        {"labels": label_object.dicom_labels, "label_types": label_object.labels}
    )
    # json.dump(dicom_obj, json_buf)
    json_buf = io.BytesIO(dicom_obj.encode("utf-8"))
    json_buf.seek(0)

    return json_buf


def return_yolo(label_object):
    pass


def import_json():
    pass
