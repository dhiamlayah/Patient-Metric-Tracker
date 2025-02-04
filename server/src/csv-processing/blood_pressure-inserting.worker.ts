import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { CreateMetricBloodPressureDto } from 'src/metric_blood_pressure/dto/create-metric_blood_pressure.dto';
import { MetricBloodPressureRepository } from 'src/metric_blood_pressure/metric_blood_pressure.repository';

@Processor('bpInsertingQueue',{concurrency:1})
export class BloodPressureInsertingWorker extends WorkerHost {
  constructor(private repoBp: MetricBloodPressureRepository) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    const { success, message } = await this.insertBpRowToDb(job.data.rows);
    if(!success && job.attemptsMade === 1){
        throw new Error(
            `❌ Failed To Add Blood Pressure rows   from ${job.data.startFrom}  to ${job.data.endAt}  last try`,
          );
    }
    if (!success) {
      throw new Error(
        `❌ Failed To Add Blood Pressure rows from ${job.data.startFrom}  to ${job.data.endAt}  first try`,
      );
    }  
   
  }  

  @OnWorkerEvent('failed')
 async onFailed(job, err) {
    console.log(err.message);
    if(job.attemptsMade===1){
      await job.remove();
    }
  }

  @OnWorkerEvent('completed')    
  async onCompleted(job) {
    console.log(
      `✅ BP ==> rows from ${job.data.startFrom}  to ${job.data.endAt} added successfuly`,
    );
    await job.remove();
  }
   
  async insertBpRowToDb(job : CreateMetricBloodPressureDto[]) {
    return await this.repoBp.createMany(job)
  }
}
 