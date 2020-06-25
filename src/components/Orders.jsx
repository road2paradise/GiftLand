import React, { useState, useEffect } from "react";
import ModalImage from "react-modal-image";
import Swal from "sweetalert2";
import { Storage } from "aws-amplify";

import "./css/Orders.css";

export const Orders = () => {
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    Storage.list("").then((res) => fetchPhotos(res));
    // eslint-disable-next-line
  }, []);

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }
  function sortPhotosByTime(photos) {
    console.log("Sorting photos..");
    return photos.sort(function (a, b) {
      return (
        new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
      );
    });
  }
  async function fetchPhotos(photos) {
    photos = sortPhotosByTime(photos);
    try {
      await asyncForEach(photos, async (e) => {
        await Storage.get(`${e.key}`).then((res) => (e.imageFetch = `${res}`));
      });
      console.log(photos);
      setPhotos(photos);
    } catch (err) {
      console.log("Error in downloading files", err);
    }
  }
  function handleDelete(e) {
    const fileName = e.target.value;
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You wont be able to get the photo back again!",
        icon: "warning",
        confirmButtonText: "Yes, delete it!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success"
          );
          Storage.remove(`${fileName}`).then((res) => console.log(res));
          setPhotos(
            photos.filter(function (element) {
              return element.key !== fileName;
            })
          );
        } else return null;
      });
  }
  return (
    <div>
      <div className="product-image-wrapper">
        {photos.length >= 1
          ? photos.map((e, index) => {
              return (
                <>
                  <div className="products">
                    <ModalImage
                      className="products-img"
                      small={e.imageFetch}
                      large={e.imageFetch}
                      key={`${e.key}`}
                    />
                    <button
                      className="delete-btn"
                      value={`${e.key}`}
                      onClick={handleDelete}
                    >
                      x
                    </button>
                  </div>
                </>
              );
            })
          : null}
      </div>
    </div>
  );
};
