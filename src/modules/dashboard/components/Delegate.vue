<template>
  <v-card class="mx-auto" elevation="1">
    <v-card-title>
      <span class="text-body-1 font-weight-bold"
        >Checkin Delegate {{ delegate.identificationDocumentNo }}</span
      >
      <v-spacer />
      <div v-if="isAttendedToday">
        <v-chip color="green">
          <v-icon>mdi-check</v-icon>
          Attended Today
        </v-chip>
      </div>
      <div v-else>
        <v-btn class="text-capitalize teal white--text" @click="manualCheckin">
          Manual Checkin
          <v-icon class="mx-2">mdi-login</v-icon>
        </v-btn>
      </div>
    </v-card-title>
    <v-divider />
    <v-card-text>
      <v-row>
        <v-col cols="12" md="4" sm="12">
          <v-img
            :src="delegate.profileImage"
            height="200"
            class="rounded"
            contain
          />
        </v-col>
        <v-col cols="12" md="8" sm="12">
          <v-row>
            <v-col cols="12" md="4" sm="12">
              <v-list dense>
                <v-list-item dense>
                  <v-list-item-content>
                    <v-list-item-title>Name</v-list-item-title>
                    <v-list-item-subtitle>{{
                      delegate.name
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item dense>
                  <v-list-item-content>
                    <v-list-item-title>Id Number</v-list-item-title>
                    <v-list-item-subtitle>{{
                      delegate.identificationDocumentNo
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item dense>
                  <v-list-item-content>
                    <v-list-item-title>gender</v-list-item-title>
                    <v-list-item-subtitle>{{
                      delegate.gender
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
            <v-divider vertical inset />
            <v-col cols="12" md="4" sm="12">
              <v-list dense>
                <v-list-item dense>
                  <v-list-item-content>
                    <v-list-item-title>Phone Number</v-list-item-title>
                    <v-list-item-subtitle>{{
                      delegate.phoneNo
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item dense>
                  <v-list-item-content>
                    <v-list-item-title>address</v-list-item-title>
                    <v-list-item-subtitle
                      >{{ delegate.address }},
                      {{ delegate.postCode }}</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
                <v-list-item dense>
                  <v-list-item-content>
                    <v-list-item-title>Location</v-list-item-title>
                    <v-list-item-subtitle
                      >{{ delegate.county }}, {{ delegate.city }},
                      {{ delegate.country }}</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
            <v-divider vertical inset />
            <v-col cols="12" md="4" sm="12">
              <v-list dense>
                <v-list-item dense>
                  <v-list-item-content>
                    <v-list-item-title>City</v-list-item-title>
                    <v-list-item-subtitle>{{
                      delegate.city
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item dense>
                  <v-list-item-content>
                    <v-list-item-title>Country</v-list-item-title>
                    <v-list-item-subtitle>{{
                      delegate.country
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item dense>
                  <v-list-item-content>
                    <v-list-item-title>Delegate Category</v-list-item-title>
                    <v-list-item-subtitle>{{
                      delegate.delegateCategory
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: "Delegate",
  props: {
    isAttendedToday: {
      type: Boolean,
      default: false,
    },
  },
  data: function () {
    return {};
  },
  computed: {
    delegate() {
      const delegate =
        this.$store.getters["Dashboard/dashboardGetters"]("checkinDelegate");
      return delegate
        ? {
            profileImage:
              delegate.image.length > 0
                ? `${process.env.VUE_APP_TEMP_URL}${delegate.image}`
                : require("@/assets/default-profile.svg"),
            ...delegate,
          }
        : {};
    },
  },
  methods: {
    manualCheckin() {
      this.$emit("manualCheckin", this.delegate);
    },
  },
};
</script>
