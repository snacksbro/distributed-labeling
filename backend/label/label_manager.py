"""This module is responsible for tracking a given label-set for a DICOM """


class LabelManager:
    def __init__(self, slice_num):
        self.default_colors = ["FF0000", "00FF00", "0000FF"]
        self.labels = {}  # name : hex_color
        self.dicom_labels = [None for i in range(slice_num)]

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
        # TODO: Make this based on len of labels for dynamic colors
        if color is None:
            color = self.default_colors[0]
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
