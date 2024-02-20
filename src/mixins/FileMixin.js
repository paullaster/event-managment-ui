import fileType from "file-type";

export default {
  methods: {
    pageCount: function (value) {
      if (!value) return 0;
      const bin = atob(value);
      return bin.match(/\/Type\s*\/Page\b/g).length;
    },

    downloadFile: async function (attachment, filename = "") {
      const myBuffer = Buffer.from(attachment, "base64");
      let res = await fileType.fromBuffer(myBuffer);

      const path = `data:${res.mime})};base64,${attachment}`;
      let ext = res.mime.split("/");
      ext = ext.pop();

      switch (ext) {
        case "pdf":
          ext = "pdf";
          break;
        case "vnd.openxmlformats-officedocument.wordprocessingml.document":
          ext = "docx";
          break;
        case "vnd.openxmlformats-officedocument.spreadsheetml.sheet":
          ext = "xlsx";
          break;
        case "jpeg":
        case "jpg":
          ext = "jpeg";
          break;
        case "png":
          ext = "png";
          break;
        default:
          ext = "pdf";
      }

      let filePath = filename || `attachment.${ext}`;

      const element = document.createElement("a");
      element.setAttribute("href", path);
      element.setAttribute("download", `${filePath}`);
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    },

    downloadLink(filePath) {
      console.log(filePath);
      const element = document.createElement("a");
      element.setAttribute("href", filePath);
      element.setAttribute("target", `_blank`);
      element.setAttribute("download", `${filePath}`);
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    },

    detectMimeType(base64String, fileName) {
      var ext = fileName.substring(fileName.lastIndexOf(".") + 1);
      if (ext === undefined || ext === null || ext === "") ext = "bin";
      ext = ext.toLowerCase();
      const signatures = {
        JVBERi0: "application/pdf",
        R0lGODdh: "image/gif",
        R0lGODlh: "image/gif",
        iVBORw0KGgo: "image/png",
        TU0AK: "image/tiff",
        "/9j/": "image/jpg",
        UEs: "application/vnd.openxmlformats-officedocument.",
        PK: "application/zip",
      };
      for (var s in signatures) {
        if (base64String.indexOf(s) === 0) {
          var x = signatures[s];

          if (ext.length > 3 && ext.substring(0, 3) === "ppt") {
            x += "presentationml.presentation";
          } else if (ext.length > 3 && ext.substring(0, 3) === "xls") {
            x += "spreadsheetml.sheet";
          } else if (ext.length > 3 && ext.substring(0, 3) === "doc") {
            x += "wordprocessingml.document";
          }

          return x;
        }
      }

      const extensions = {
        xls: "application/vnd.ms-excel",
        ppt: "application/vnd.ms-powerpoint",
        doc: "application/msword",
        xml: "text/xml",
        mpeg: "audio/mpeg",
        mpg: "audio/mpeg",
        txt: "text/plain",
      };
      for (var e in extensions) {
        if (ext.indexOf(e) === 0) {
          var xx = extensions[e];
          return xx;
        }
      }

      return "unknown";
    },

    downloadBase64File(base64Data, fileName) {
      const contentType = this.detectMimeType(base64Data, fileName);
      console.log(this.detectMimeType(base64Data, fileName));
      const linkSource = `data:${contentType};base64,${base64Data}`;
      const downloadLink = document.createElement("a");
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    },
  },
};
