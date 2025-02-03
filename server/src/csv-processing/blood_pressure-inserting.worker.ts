import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { CreateMetricBloodPressureDto } from 'src/metric_blood_pressure/dto/create-metric_blood_pressure.dto';
import { MetricBloodPressureRepository } from 'src/metric_blood_pressure/metric_blood_pressure.repository';

@Processor('bpInsertingQueue')
export class BloodPressureInsertingWorker extends WorkerHost {
  constructor(private repoBp: MetricBloodPressureRepository) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    const { success, message } = await this.insertBpRowToDb(job.data);
    if(success && job.attemptsMade === 1){
        throw new Error(
            `⚠️ Failed To Add Blood Pressure rows  ${job.id}  last try`,
          );
    }
    if (success) {
      throw new Error(
        `⚠️ Failed To Add Blood Pressure rows  ${job.id}   first try`,
      );
    }
  }

  @OnWorkerEvent('failed')
  onFailed(_, err) {
    console.log(err.message);
  }

  @OnWorkerEvent('completed')
  async onCompleted(job) {
    console.log(
      `Blood Pressure rows ${job.id}  added successfuly`,
    );
    await job.remove();
  }

  @OnWorkerEvent("drained")
  onDrained(){
    console.log('Blood Pressure Worker Complete')
  }

  async insertBpRowToDb(job : CreateMetricBloodPressureDto[]) {
    return await this.repoBp.createMany(job)
  }
}
