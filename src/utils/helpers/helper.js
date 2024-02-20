import moment from "moment/moment";
import mime from "mime-types";
import { fromBuffer } from "file-type";

class Helper {
  isEmpty(obj) {
    for (var prop in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(prop)) return false;
    }
    return true;
  }
  prepareFormData(formData) {
    let data = new FormData();
    for (let key in formData) {
      if (formData[key] === null) formData[key] = "";
      // check if formData[key] is an array
      if (Array.isArray(formData[key])) {
        data.append(key, JSON.stringify(formData[key]));
      } else {
        data.append(key, formData[key]);
      }
    }
    return data;
  }

  stringify(object) {
    for (let key in object) {
      if (typeof object[key] === "object")
        object[key] = JSON.stringify(object[key]);
    }
    return object;
  }

  dateFix(date) {
    if (date) {
      if (
        moment(date, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss") ===
        date
      )
        return date;
      return moment(date).format("Do MMMM YYYY");
    }
    return "";
  }

  changeToHumanReadable(date) {
    if (date) {
      if (
        moment(date, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss") ===
        date
      )
        return moment(date).format("Do MMMM YYYY");
    }
    return "";
  }

  prepareDate(date) {
    return date ? moment(date).format().substr(0, 10) : "";
  }

  sanitizeDate(date) {
    return moment(date).format().substr(0, 10);
  }

  getFileIconColor(fileName) {
    if (!fileName) return "#727071";
    let fileExtension = fileName.split(".").pop();
    switch (fileExtension) {
      case "docx":
        return "#0276c0";
      case "pdf":
        return "#e62f34";
      case "pptx":
        return "#f39301";
      case "xls":
        return "#82bd8d";
      case "xlsx":
        return "#82bd8d";
      case "png":
        return "#a7ce59";
      case "jpg":
        return "#a7ce59";
      default:
        return "#727071";
    }
  }

  getFileIcon(fileName) {
    if (!fileName) return "fa fa-file-o";
    let fileExtension = fileName.split(".").pop();
    switch (fileExtension) {
      case "docx":
        return "fa fa-file-word";
      case "pdf":
        return "fa fa-file-pdf";
      case "pptx":
        return "fa fa-file-powerpoint";
      case "xls":
        return "fa fa-file-excel";
      case "xlsx":
        return "fa fa-file-excel";
      case "png":
        return "fa fa-file-image";
      case "jpg":
        return "fa fa-file-image";
      default:
        return "fa fa-file";
    }
  }

  detectMimeType(b64) {
    const signatures = {
      JVBERi0: "application/pdf",
      iVBORw0KGgo: "image/png",
      "/9j/": "image/jpg",
    };
    for (var s in signatures) {
      if (b64.indexOf(s) === 0) {
        return signatures[s];
      }
    }
  }

  fileExtension(b64) {
    const signatures = {
      JVBERi0: ".pdf",
      iVBORw0KGgo: ".png",
      "/9j/": ".jpg",
      UEsDBBQ: ".xlsx",
    };
    for (var s in signatures) {
      if (b64.indexOf(s) === 0) {
        return signatures[s];
      }
    }
  }

  /**
   *
   * use this method to shorten numbers such as 20K,
   * 1M, 1B,100K, etc  * @param file
   * @returns {Promise<unknown>}
   */
  toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  /** Get File Blob */
  async getFileBlob(url, fileName) {
    const response = await fetch(url);
    const data = await response.blob();
    const metadata = {
      type: mime.lookup(url),
    };
    return new File([data], fileName, metadata);
  }

  /** using file-type **/
  async getFileType(base64) {
    return await fromBuffer(Buffer.from(base64, "base64"));
  }

  getColor(status) {
    let color = "";
    switch (status) {
      case "Open":
      case "Draft":
        color = "amber";
        break;
      case "Review":
        color = "orange";
        break;
      case "Pending":
      case "Pending Approval":
        color = "yellow";
        break;
      case "Released":
      case "Approved":
      case "Issued":
      case "Posted":
        color = "green";
        break;
      case "Rejected":
      case "Declined":
      case "Canceled":
        color = "deep-orange";
        break;
      default:
        color = "blue";
        break;
    }
    return color;
  }

  status(status) {
    let color = "";
    switch (status) {
      case "Open":
      case "Draft":
        color = "amber";
        break;
      case "Review":
      case "Submitted":
        color = "orange";
        break;
      case "Pending":
      case "Pending Approval":
        color = "yellow";
        break;
      case "Released":
      case "Received":
      case "Issued":
      case "Approved":
        color = "green";
        break;
      case "Posted":
        color = "teal";
        break;
      case "Rejected":
      case "Declined":
      case "Canceled":
        color = "deep-orange";
        break;
      default:
        color = "blue";
        break;
    }
    return color;
  }

  getColorGlobal(status) {
    let colorObject = {};
    switch (status) {
      case "Open":
      case "Draft":
        colorObject = {
          icon_color: "amber lighten-1",
          icon: "error_outline",
          color: "warning",
        };
        break;
      case "Review":
        colorObject = {
          icon_color: "orange lighten-1",
          icon: "rate_review",
          color: "orange",
        };
        break;
      case "Pending":
      case "Pending Approval":
        colorObject = {
          icon_color: "yellow darken-1",
          icon: "rate_review",
          color: "yellow darken-1",
        };
        break;
      case "Released":
      case "Issued":
        colorObject = {
          icon_color: "green lighten-1",
          icon: "done",
          color: "success",
        };
        break;
      case "Posted":
        colorObject = {
          icon_color: "teal lighten-1",
          icon: "done",
          color: "teal accent-3",
        };
        break;
      case "Approved":
        colorObject = {
          icon_color: "green lighten-1",
          icon: "done",
          color: "success",
        };
        break;
      case "Rejected":
      case "Declined":
      case "Canceled":
        colorObject = {
          icon_color: "deep-orange lighten-1",
          icon: "close",
          color: "red",
        };
        break;
      default:
        colorObject = {
          icon_color: "blue lighten-1",
          icon: "new_releases",
          color: "info",
        };
        break;
    }
    return colorObject;
  }

  isOffline() {
    return !navigator.onLine;
  }
}
export default new Helper();
