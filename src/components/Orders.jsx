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
  function dayOfWeekAsString(dayIndex) {
    return (
      [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ][dayIndex] || ""
    );
  }

  function formatTime(time) {
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    var AmOrPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    if (minutes < 10) {
      if (seconds < 10) {
        seconds = seconds.toString().padStart(2, "0");
      }
      minutes = minutes.toString().padStart(2, "0");
    }
    var formattedTime = `${hours}:${minutes}:${seconds} ${AmOrPm}`;
    return formattedTime;
  }

  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }
  function sortPhotosByTime(photos) {
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
        await Storage.get(`${e.key}`, { download: true }).then((res) => {
          var utcSeconds = parseInt(e.key.replace(/,/g, ""), 10) / 1000;
          var d = new Date(0);
          d.setUTCSeconds(utcSeconds);
          e.uploadedTime = `${dayOfWeekAsString(
            d.getDay()
          )} ${d.getDate()}/${d.getMonth()}/${d.getFullYear()} ${formatTime(
            d
          )}`;
          e.imageFetch = URL.createObjectURL(res.Body);
          e.Metadata = res.Metadata.tagging;
          setPhotos(photos.concat(e));
        });
      });
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
          Storage.remove(`${fileName}`).catch((err) => console.log(err));
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
        {photos.length >= 1 ? (
          photos.map((e, index) => {
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
                  {e.Metadata ? <h3>{`${e.Metadata}`}</h3> : null}
                  <span> {e.uploadedTime}</span>
                </div>
              </>
            );
          })
        ) : (
          <h1> HELLO WORLD</h1>
        )}
      </div>
    </div>
  );
};
