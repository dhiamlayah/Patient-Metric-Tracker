import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { MetricA1cRepository } from 'src/metric-a1c/metric-a1c-repository';
import { MetricBloodPressureRepository } from 'src/metric_blood_pressure/metric_blood_pressure.repository';
import { CsvProcessingService } from './csv-processing.service';

@Processor('csvProcessingQueue')
export class CsvProcessingWorker extends WorkerHost {
  private nbrRows: number;      // this help us to know how mush rows added to the queue from the csv file
  private batchingCount = 0;    // this help us to batching the data
  private batchArray = Array();

  async process(job: Job<any, any, string>): Promise<any> {
    console.log(`Processing job ${job.id} of type ${job.name} with data ${job.processedOn}`);
    this.nbrRows = CsvProcessingService.countRows;
    this.batchingCount++;
    this.batchArray.push(job.data);
    if (this.batchArray.length === 50) {
      // console.log('batch from array :',this.batchArray)
      console.log('batch from array length :', this.batchArray.length);
      this.batchArray = []; 
    }
  }

  @OnWorkerEvent('completed')
  async onCompleted(job) {
    await job.remove();
  }

  @OnWorkerEvent('drained')
  drained() {
    if (this.batchArray.length!==0 && this.batchingCount === this.nbrRows) {
      console.log('rest of batch length :', this.batchArray.length);
      this.batchArray = [];
    }
  }
}