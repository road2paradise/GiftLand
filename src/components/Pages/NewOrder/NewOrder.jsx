import React, { useState } from "react";
import { asyncForEach } from "../../../utils/OrderUtils";
import Swal from "sweetalert2";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Product from "../../Image/Product";

import imageCompression from "browser-image-compression";
import { Storage } from "aws-amplify";

import "./NewOrder.css";

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

  async function uploadPhotosAsync() {
    try {
      var resArr = [];
      await asyncForEach(photos, async (e, index) => {
        await Storage.put(`${Date.now().toLocaleString()}`, e, {
          contentType: "image/jpeg",
          metadata: {
            tagging: `${comments[index]}`,
          },
        }).then((res) => resArr.push(res));
      });
      Swal.fire({
        title: "Success!",
        text: `Successfully ${resArr.length} uploaded photos!`,
        icon: "success",
      });
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
              <Form.File onChange={handleImages} multiple />
            </Form.Group>
          </Form>
          {photos.length !== 0 ? (
            <Button className="submit-btn" variant="success" onClick={addPhoto}>
              Submit Order
            </Button>
          ) : null}
          <div className="product-image-wrapper">
            {previewImageUrl.length >= 1
              ? previewImageUrl.map((e, index) => {
                  return (
                    <>
                      <Product smallImage={e} largeImage={e} key={e.key} />
                      <Form.Control
                        as="textarea"
                        placeholder="Enter comments"
                        onChange={(e) => handleComments(e, index)}
                        key={e.key}
                      />
                    </>
                  );
                })
              : null}
          </div>
        </>
      ) : (
        <>
          <div>
            <Spinner animation="border" role="status" />
            <h1> Loading...</h1>
          </div>
        </>
      )}
    </div>
  );
};
