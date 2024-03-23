"""This module is responsible for tracking a given label-set for a DICOM """


class LabelManager:
    """
    Manages labels for a given DICOM file

    Parameters
    ----------
    slice_num (int):
        The number of slices in the stack

    Attributes
    ----------
    default_colors (list):
        The default colors to be used in the event a given color isn't provided
    labels (dict):
        A mapping of the label name to the color used for it
    dicom_labels (list):
        A big object tracking the labels per each DICOM slice. See notes.
    slice_num (int):
        The number of slices in the DICOM stack

    Notes
    -----
    dicom_labels looks like this:
    [ # Each slice index...
        [ # Each label (so if there's 5 boxes, there will be 5 here
            { # Individual label
                name: label_name, # The name, so you can look it up later
                points: [ # Each point, boxes have two
                    (0, 0), # Point 1
                    (50, 50), # Point 2
                ]
            }
        ]
    ]
    """

    def __init__(self, slice_num):
        """
        Initializer for LabelManager

        Parameters
        ----------
        slice_num (int):
            The number of slices in the DICOM stack
        """
        self.default_colors = ["FF0000", "00FF00", "0000FF"]
        self.labels = {}  # name : hex_color
        self.dicom_labels = [None for i in range(slice_num)]
        self.slice_num = slice_num

    def create_label(self, label_name, color=None):
        """
        Creates a new label to reference

        Parameters
        ----------
        label_name (str):
            The label's name
        color (str):
            (Optional) The color of the label
        """
        if color is None:
            color = self.default_colors[self.slice_num % len(self.default_colors)]
        self.labels[hash(label_name)] = {"name": label_name, "color": color}

    def get_slice_labels(self, slice_location):
        """
        Returns label data for a DICOM slice

        Parameters
        ----------
        slice_location (int):
            The index of the slice in the DICOM stack

        Returns
        -------
        dict:
            The object representing the label data for a DICOM slice
        """
        return self.dicom_labels[slice_location]

    def get_label_color(self, label_name):
        """
        Returns the hexcode of a given label

        Parameters
        ----------
        label_name (str):
            The name of the label

        Returns
        -------
        str:
            The color of the label in hex
        """
        return self.labels[hash(label_name)]

    def update_label(self, old_name, new_name, color=None):
        """
        Updates a label to a new value

        Parameters
        ----------
        old_name (str):
            The old name of the label
        new_name (str):
            The new name of the label
        color (str):
            (Optional) The updated color
        """
        tmp = self.labels[hash(old_name)]
        self.create_label(new_name, color if color is not None else tmp.color)

    def delete_label(self, label_name):
        """
        Deletes an existing label

        Parameters
        ----------
        label_name (str):
            The name of the label to delete
        """
        del self.labels[hash(label_name)]

    def set_labels(self, slice_location, label_data):
        """
        Updates an label data for a DICOM slice

        Parameters
        ----------
        slice_location (int):
            The index of the slice in the DICOM stack
        label_data (dict):
            The label data for the slice
        """
        self.dicom_labels[slice_location] = label_data
