import { SAVIYNT_RELATIVE_TITLES } from "../constants.js";
import Saviynt from "../models/saviynt.model.js";

const filterSaviyntJobs = async (saviyntJobs) => {
  const filteredJobs = [];

  for (const job of saviyntJobs) {
    if (SAVIYNT_RELATIVE_TITLES.includes(job.title)) {
      for (const posting of job.postings) {
        if (posting.country === "US") {
          const jobData = {
            id: posting.id,
            position: posting.text,
            hostedURL: posting.hostedUrl,
          };

          const existingJob = await saveSaviyntJobToMongo(jobData);

          if (!existingJob || existingJob.flag) {
            filteredJobs.push({
              position: posting.text,
              hostedURL: posting.hostedUrl,
            });
          }
        }
      }
    }
  }

  return filteredJobs;
};

const saveSaviyntJobToMongo = async (jobData) => {
  try {
    const existingJob = await Saviynt.findOne({ id: jobData.id });

    if (!existingJob) await Saviynt.create(jobData);

    return existingJob;
  } catch (err) {
    console.log(err);
  }
};

export { filterSaviyntJobs, saveSaviyntJobToMongo };
