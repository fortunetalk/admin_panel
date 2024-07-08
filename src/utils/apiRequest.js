import axios from "axios";
import Swal from "sweetalert2";

function extractErrorMessage(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const pre = doc.querySelector("pre");
  let errorMessage = pre ? pre.textContent : "Failed to add Astrologer";

  const errorMatch = errorMessage.match(/Error: (.+?)(\s+at\s+|$)/);
  if (errorMatch) {
    errorMessage = errorMatch[1];
  }

  return errorMessage.trim();
}


class _ApiRequest {
  post_header = "multipart/form-data";
  get_header = "application/json";

  postRequest = async ({ url = null, data = null, header = "form", token = null, }) => {

    try {
      const response = await axios({
        method: "post",
        url: url,
        headers: {
          "Content-Type": header === "form" ? this.post_header : this.get_header,
          'Authorization': `Bearer ${token}`
        },
        data: data,
      });
      return response.data;
    } catch (e) {
      if (e.response && e.response.data) {
        const errorMessage = extractErrorMessage(e.response.data);
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: errorMessage,
          showConfirmButton: false,
          timer: 5000,
        });
        throw new Error(errorMessage);
      } else {
        throw new Error(e.message);
      }
    }
  };

  getRequest = async ({ url = null }) => {
    try {
      const response = await axios({
        method: "get",
        url: url,
        headers: {
          "Content-Type": this.get_header,
        },
      });
      return response.data;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  putRequest = async ({ url = null, data = null, header = "form" }) => {
    try {
      const response = await axios({
        method: "put",
        url: url,
        headers: {
          "Content-Type":
            header === "form" ? this.post_header : this.get_header,
        },
        data: data,
      });
      return response.data;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  deleteRequest = async ({ url = null, header = "form" }) => {
    try {
      const response = await axios({
        method: "delete",
        url: url,
        headers: {
          "Content-Type":
            header === "form" ? this.post_header : this.get_header,
        },
      });
      return response.data;
    } catch (e) {
      console.log(e);
      return null;
    }
  };
}

export const ApiRequest = new _ApiRequest();
