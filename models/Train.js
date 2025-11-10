const trainSchema = new mongoose.Schema({
  trainNo: { type: String, required: true, unique: true },
  from: { type: mongoose.Schema.Types.ObjectId, ref: "Station", required: true },
  to: { type: mongoose.Schema.Types.ObjectId, ref: "Station", required: true },
  departureTime: String,
  arrivalTime: String,
  line: String,
  type: { type: String, enum: ["Fast", "Slow"] }
});
