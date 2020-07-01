import React, { useState } from "react";
import Swal from "sweetalert2";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ModalImage from "react-modal-image";
import imageCompression from "browser-image-compression";
import { Storage } from "aws-amplify";

import "./css/NewOrder.css";

export const NewOrder = () => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [previewImageUrl, setPreviewImageUrl] = useState([]);
  const [comments, setComments] = useState([]);

  async function handleImages(e) {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      const file = e.target.files;
      let resArr = [];
      let compressedFile = [];
      setLoading(true);
      for (var x = 0; x < file.length; x++) {
        await resArr.push(URL.createObjectURL(file[x]));
        compressedFile[x] = await imageCompression(file[x], options);
        console.log("Photos have been compressed");
      }
      setPreviewImageUrl(resArr);
      setPhotos(compressedFile);
      setLoading(false);
    } catch (err) {
      console.log("error uploading images.", err);
    }
  }
  function handleComments(e, index) {
    let newArr = [...comments];
    newArr[index] = e.target.value;
    setComments(newArr);
  }

  async function addPhoto() {
    try {
      setLoading(true);
      uploadPhotosAsync();
    } catch (err) {
      console.log("error uploading photo image", err);
    }
  }

  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  async function uploadPhotosAsync() {
    try {
      var startTime, endTime;
      startTime = new Date();
      var resArr = [];
      console.log(photos);
      await asyncForEach(photos, async (e, index) => {
        await Storage.put(`${Date.now().toLocaleString()}`, e, {
          contentType: "image/jpeg",
          metadata: {
            tagging: `${comments[index]}`,
          },
        })
          .then((res) => resArr.push(res))
          .then(console.log("Uploaded."));
      });
      Swal.fire({
        title: "Success!",
        text: `Successfully ${resArr.length} uploaded photos!`,
        icon: "success",
      });
      endTime = new Date();

      var timeDiff = endTime - startTime;
      timeDiff /= 1000;

      console.log(timeDiff + "seconds");

      setLoading(false);
      setPreviewImageUrl([]);
      setPhotos([]);
    } catch (err) {
      console.log("Error uploading files", err);
    }
  }

  return (
    <div className="order-page-wrapper">
      {!loading ? (
        <>
          <h1>
            {photos.length === 0
              ? "Please upload photos"
              : "Click photo to enlarge"}
          </h1>
          <Form>
            <Form.Group>
              <Form.File
                onChange={handleImages}
                label="Upload Images"
                multiple
              />
            </Form.Group>
          </Form>
          {photos.length !== 0 ? (
            <Button
              className="order-preview-submit-btn"
              variant="success"
              onClick={addPhoto}
            >
              Submit Order
            </Button>
          ) : null}

          <div className="product-image-wrapper">
            {previewImageUrl.length >= 1
              ? previewImageUrl.map((e, index) => {
                  return (
                    <>
                      <ModalImage small={e} large={e} key={e.key} />
                      <Form.Control
                        as="textarea"
                        placeholder="Enter comments"
                        onChange={(e) => handleComments(e, index)}
                      />
                    </>
                  );
                })
              : null}
          </div>
        </>
      ) : (
        <>
          <Spinner animation="border" role="status" />
          <div>
            <h1> Loading...</h1>{" "}
          </div>
        </>
      )}
    </div>
  );
};
