import FLORECRUIT from "../models/floRecruit.model.js";

const filterFloRecruitJobs = async (floRecruitJobs) => {
  const filteredJobs = [];

  for (const job of floRecruitJobs) {
    const jobData = { id: job.id, title: job.title, openDate: job.openDate };

    const existingJob = await saveFloRecruitJobsToMongo(jobData);

    if (!existingJob || existingJob.flag) {
      filteredJobs.push({ ...jobData, hiringLead: job.hiringLeads });
    }
  }

  return filteredJobs
};

const saveFloRecruitJobsToMongo = async (jobData) => {
  try {
    const existingJob = await FLORECRUIT.findOne({ id: jobData.id });

    if (!existingJob) await FLORECRUIT.create(jobData);

    return existingJob;
  } catch (error) {
    console.log(error);
  }
};

export { filterFloRecruitJobs };
