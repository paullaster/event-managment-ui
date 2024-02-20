<template>
  <v-card class="mx-auto mb-3" flat>
    <v-card-title class="text-body-2">
      <!-- <v-btn
        class="primary text-capitalize"
        v-if="isEdit"
        rounded
        @click="attachFile"
        >Add Attachment
        <v-icon right>attach_file</v-icon>
      </v-btn> -->

      <v-btn
        color="primary"
        class="mr-2"
        outlined
        fab
        small
        @click="attachFile"
        v-if="isEdit"
      >
        <v-icon color="primary">mdi-plus</v-icon>
      </v-btn>
      <span :class="!isEdit ? 'headline' : ''">
        {{ isEdit ? "Add a new attachment" : "Attachments" }}
      </span>
    </v-card-title>
    <v-divider />
    <v-data-table
      :headers="headers"
      :items="attachments"
      class="elevation-0"
      dense
      disable-pagination
      hide-default-footer
      hide-default-header
    >
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template v-slot:item.no="{ item }">
        <span v-if="item.no">{{ item.no }}</span>
        <span v-else>{{ item.fileName }}</span>
      </template>
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template v-slot:item.actions="{ item }">
        <div class="d-flex justify-end">
          <div class="d-flex px-2">
            <v-btn
              rounded
              small
              class="primary text-capitalize mx-2"
              @click="downloadBase64File(item.attachment, item.fileName)"
            >
              Download
              <v-icon right>mdi-download</v-icon>
            </v-btn>
            <v-btn
              rounded
              small
              v-if="isEdit"
              class="error text-capitalize"
              @click="deleteAttachment(item)"
            >
              Delete
              <v-icon right>mdi-delete</v-icon>
            </v-btn>
          </div>
        </div>
      </template>
    </v-data-table>
    <input
      type="file"
      ref="file"
      @change="uploadFile"
      hidden
      accept="application/pdf, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, image/*"
    />
  </v-card>
</template>
<script>
import FileMixin from "../../../mixins/FileMixin";
import { tempUrl } from "@/environment/environment";
import { helper } from "@/utils";
export default {
  name: "AttachmentFile",
  mixins: [FileMixin],
  props: {
    attachments: {
      type: Array,
      default: () => [],
    },
    line: {
      type: Object,
      default: () => {},
    },
    isEdit: {
      type: Boolean,
      default: true,
    },
    documentType: {
      type: String,
      default: "Quote",
    },
  },
  data: function () {
    return {
      tempUrl: tempUrl,
    };
  },
  computed: {
    headers() {
      return [
        {
          text: "No.",
          align: "start",
          value: "no",
        },
        {
          text: "fileName",
          value: "fileName",
        },
        {
          text: "Actions",
          value: "actions",
        },
      ];
    },
  },
  methods: {
    deleteAttachment(attachment) {
      if (attachment.tableID) {
        this.$confirm.show({
          title: "Delete Attachment",
          text: "Are you sure you want to delete this attachment? This action cannot be undone.",
          onConfirm: () => {
            this.$store.dispatch("Events/deleteAttachment", attachment);
          },
        });
      } else {
        this.$emit("removeAttachment", attachment);
      }
    },
    attachFile() {
      this.$refs.file.click();
    },
    async uploadFile(e) {
      const file = e.target.files[0];
      if (file) {
        let base64File = await helper.toBase64(file);
        base64File = base64File.split(",")[1];
        this.$emit("addAttachment", {
          attachment: base64File,
          fileName: file.name,
        });
      }
    },
  },
};
</script>
