import { FingerprintReader, SampleFormat } from "@digitalpersona/devices";
import { AuthService } from "@digitalpersona/authentication";
class FingerprintSigninControl {
  //event handlers
  onDeviceConnected = (event) => {
    console.log(event, "Device Connected");
    Event.$emit("deviceConnected");
  };

  onDeviceDisconnected = (event) => {
    console.log(event, "Device Disconnected");
    Event.$emit("deviceError");
  };

  onQualityReported = (event) => {
    console.log(event, "onQualityReported");
  };

  onSamplesAcquired = async (event) => {
    const samples = event.samples;
    Event.$emit("scanFingerprint", { samples: samples, type: this.type });
    this.destroy();
  };

  onReaderError = (event) => {
    console.log(event);
    console.log("this is an error");
    Event.$emit("deviceError");
    this.destroy();
  };

  async init(type) {
    try {
      // call static method to initiate class
      this.reader = new FingerprintReader();
      this.reader.on("DeviceConnected", this.onDeviceConnected);
      this.reader.on("DeviceDisconnected", this.onDeviceDisconnected);
      this.reader.on("QualityReported", this.QualityReported);
      this.reader.on("SamplesAcquired", this.onSamplesAcquired);
      this.reader.on("ErrorOccurred", this.onReaderError);
      this.type = type;
      await this.reader.startAcquisition(SampleFormat.PngImage);
    } catch (err) {
      console.log(err);
    }
  }

  static initiateClass() {
    return new FingerprintSigninControl();
  }

  destroy = async () => {
    await this.reader.stopAcquisition();
    this.reader.off();
    delete this.reader;
  };

  CreateAuthentication = async (delegate) => {
    const authService = new AuthService();
    const users = await authService.CreateAuthentication(delegate);
    console.log("users", users);
    // return users;
  };
}

export default FingerprintSigninControl;
