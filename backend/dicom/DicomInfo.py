import pydicom
from PIL import Image


class DicomInfo:
    def __init__(self, path):
        self.dicom_path = path
        self.dicom_stack = self.load_dicom()
        self.slide_image = Image.fromarray(self.dicom_stack[0])
        self.slide_count = len(self.dicom_stack)
        self.segments = [None for i in range(self.slide_count)]

    def load_dicom(self):
        """Parses a dicom into a list of pixel_arrays"""
        dataset = pydicom.dcmread(self.dicom_path, force=True)
        # dataset.file_meta.TransferSyntaxUID = pydicom.uid.ImplicitVRLittleEndian

        # Checking for random compression
        if (
            dataset.get("TransferSyntaxUID")
            and "Encapsulated" in dataset.TransferSyntaxUID.name
        ):
            print("Dataset is compressed! Attempting decompression...")
            dataset.PixelData = pydicom.decode_data(dataset.PixelData)
        return dataset.pixel_array
        # print(f"Dataset metadata: {dataset.file_meta}")
        # print(f"Dataset pixel_array: {'PixelData' in dataset}")

    def get_slide(self, index):
        """
        Converts the DICOM bitmap to an actual image to render

        Parameters:
            - dicom_array: The total dicom array as generated by get_slice
            - index: The location of the slice to render

        Returns:
            - Image: The dicom image

        """
        self.slide_image = Image.fromarray(self.dicom_stack[index])
        return self.slide_image

    def get_dimensions(self):
        """
        Get the dimensions of the current DICOM slide

        Returns
        -------
        tuple(int):
            The width and height of the image
        """
        return (self.slide_image.width, self.slide_image.height)

    def set_segment(self, index, segment_data):
        """
        Sets segment data on the DICOm for a specific index

        Parameters
        ----------
        index (int):
            The index of the DICOM slice
        segment_data (list(list(int))):
            A matrix of start/end coordinatees where labels occur

        Returns
        -------
        bool:
            Status on the success of the operation
        """
        if len(segment_data[0]) <= 0:
            return False
        print(f"SETTING {segment_data} @ {index}")
        self.segments[index] = segment_data

    def get_segment(self, index):
        """
        Sets segment data on the DICOm for a specific index

        Parameters
        ----------
        index (int):
            The index of the DICOM slide

        Returns
        -------
        segment_data (list(list(int))):
            A matrix of start/end coordinatees where labels occur
        """
        try:
            print(f"GETTING {self.segments[index]} @ {index}")
            return self.segments[index]
        except IndexError:
            return None