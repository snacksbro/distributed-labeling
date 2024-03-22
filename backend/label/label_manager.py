class Label_Manager:
    def __init__(self):
        self.dicom_name = "foo"
        self.default_colors = ["FF0000", "00FF00", "0000FF"]
        self.labels = {}  # name : hex_color

    def create_label(self, label_name, color=None):
        pass

    def get_dicom_labels(self):
        pass

    def get_slice_labels(self, slice_location):
        pass

    def update_label(self, old_name, new_name, color=None):
        pass

    def delete_label(self, label_name):
        pass

    def set_labels(self, slice_location, label_data):
        pass
