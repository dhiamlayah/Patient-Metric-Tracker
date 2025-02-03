import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job, Queue } from 'bullmq';
import { CreateMetricA1cDto } from 'src/metric-a1c/dto/create-metric-a1c.dto';
import { MetricA1cRepository } from 'src/metric-a1c/metric-a1c-repository';

@Processor('a1cInsertingQueue')
export class A1cInsertingWorker extends WorkerHost {
  constructor(private repoA1c: MetricA1cRepository) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    const { success, message } = await this.insertA1cRowsToDb(job.data);
    if(success && job.attemptsMade === 1){
        throw new Error(
            `Failed To Add A1c rows  ${job.id}  last try`,
          );
    }
    if (success) {
      throw new Error(
        `Failed To Add A1c rows  ${job.id}   first try`,
      );
    }
  }

  @OnWorkerEvent('failed')
  onFailed(job, err) {
    console.log(err.message);
  }

  @OnWorkerEvent('completed')
  async onCompleted(job) {
    console.log(
      `A1c rows ${job.id}  added successfuly`,
    );
    await job.remove();
  }

  @OnWorkerEvent("drained")
  onDrained(){
    console.log('A1C Worker Complete')
  }

  async insertA1cRowsToDb(jobData: CreateMetricA1cDto[]) {
    return await this.repoA1c.createMany(jobData);
  }
}
