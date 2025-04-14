import markJobFalse from "../services/removeJob.services.js";

export async function removeJob(req, res) {
  try {
    const { mongoJobId, collectionName } = req.query;

    markJobFalse(mongoJobId, collectionName);

    res.status(200).json({ message: "Job marked as false" });
  } catch (err) {
    console.error("Error removing job:", err.message);
    res.status(500).json({ error: "Failed to remove job" });
  }
}
