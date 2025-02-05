import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job, Queue } from 'bullmq';
import { CreateMetricA1cDto } from 'src/metric-a1c/dto/create-metric-a1c.dto';
import { MetricA1cRepository } from 'src/metric-a1c/metric-a1c-repository';

@Processor('a1cInsertingQueue',{concurrency:5, limiter:{max:50 ,duration :1000}})
export class A1cInsertingWorker extends WorkerHost {
  constructor(private repoA1c: MetricA1cRepository) {
    super();  
  }   

  async process(job: Job<any, any, string>):  Promise<any> {
    const { success, message } = await this.insertA1cRowsToDb(job.data.rows);
    if(!success && job.attemptsMade === 1){
        throw new Error(
            ` ❌ Failed To Add A1c rows  from ${job.data.startFrom}  to ${job.data.endAt}  last try ; reason : ${message}`,
          ); 
    } 
    if (!success) { 
      throw new Error(
        ` ❌ Failed To Add A1c rows  from ${job.data.startFrom}  to ${job.data.endAt}   first try`,
      ); 
    }
  }

  @OnWorkerEvent('stalled')
  onStalled(job , prevState) {
    console.log(`A1c Job  with ID : ${job.data}  stalled , prevState: ${prevState} `);
  }

        
  @OnWorkerEvent('failed') 
  async onFailed(job, err) {
    console.log(err.message);
    if(job.attemptsMade===2){
      await job.remove();
    }
  } 

  @OnWorkerEvent('completed') 
  async onCompleted(job) {
    console.log(
      `✅ A1c ==> rows from ${job.data.startFrom}  to ${job.data.endAt}  added successfuly`,
    );
    await job.remove();
  }


  async insertA1cRowsToDb(jobData: CreateMetricA1cDto[]) {
    return await this.repoA1c.createMany(jobData);
  }
}
