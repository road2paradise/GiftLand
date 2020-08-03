import React, { useState, useEffect } from "react";
import {
  formatTime,
  sortPhotosByTime,
  asyncForEach,
} from "../utils/OrderUtils";
import Swal from "sweetalert2";
import { Storage } from "aws-amplify";
import Product from "./Product";

import "./css/Orders.css";

export const Orders = () => {
  const [photos, setPhotos] = useState([]);
  const [total, setTotal] = useState(0);
  var count = 0;
  var photoArray = [];
  useEffect(() => {
    Storage.list("").then((res) => {
      fetchPhotos(sortPhotosByTime(res), count);
      // eslint-disable-next-line
      photoArray = sortPhotosByTime(res);
      setTotal(photoArray.length);
    });
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line
  }, []);

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  async function fetchPhotos(photoArray, count) {
    if (count >= photoArray.length) {
      return;
    } else {
      await asyncForEach(photoArray.slice(count, count + 32), async (e) => {
        await Storage.get(`${e.key}`, { download: true }).then((res) => {
          e.uploadedTime = formatTime(e.key);
          e.imageFetch = URL.createObjectURL(res.Body);
          e.Metadata = res.Metadata.tagging;
          setPhotos((photos) => [...photos, e]);
        });
      });
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
          Storage.remove(`${fileName}`).catch((err) => console.log(err));
          setPhotos(
            photos.filter(function (element) {
              return element.key !== fileName;
            })
          );
          setTotal(total - 1);
        } else return null;
      });
  }

  function handleScroll() {
    // infinite scroll using window features.
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
      count = count + 32;

      fetchPhotos(photoArray, count);
      return;
    } else {
      return;
    }
  }
  return (
    <div>
      {photos.length >= 1 ? (
        <>
          <h2> Total number of orders: {total}</h2>
          <div className="product-image-wrapper">
            {photos.map((e) => {
              return (
                <>
                  <div className="product" key={`${e.key}`}>
                    <Product
                      smallImage={e.imageFetch}
                      largeImage={e.imageFetch}
                    />
                    <button
                      className="delete-btn"
                      value={`${e.key}`}
                      key={`${e.key + 5}`}
                      onClick={handleDelete}
                    >
                      x
                    </button>
                    {e.Metadata && e.Metadata !== "undefined" ? (
                      <h3 key={`${e.key + 11}`}>{`${e.Metadata}`}</h3>
                    ) : null}
                    <span> {e.uploadedTime}</span>
                  </div>
                </>
              );
            })}
          </div>
        </>
      ) : null}
    </div>
  );
};
