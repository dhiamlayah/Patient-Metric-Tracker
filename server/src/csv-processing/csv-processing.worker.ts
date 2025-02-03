import {
  InjectQueue,
  OnWorkerEvent,
  Processor,
  WorkerHost,
} from '@nestjs/bullmq';
import { Job, Queue } from 'bullmq';
import { CsvProcessingService } from './csv-processing.service';

@Processor('csvProcessingQueue')
export class CsvProcessingWorker extends WorkerHost {
  private batchingCount = 0; // this help us to batching the data
  private batchA1cArray = Array();
  private batchBpArray = Array();
  private batchingSize = 50;

  constructor(
    @InjectQueue('a1cInsertingQueue') private readonly a1cvQueue: Queue,
    @InjectQueue('bpInsertingQueue') private readonly bpQueue: Queue,
  ) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    // console.log(`Processing job ${job.id} of type ${job.name} with data ${this.batchingCount}`);
    this.extractRowFromJob(job.data);
    this.batchingCount++;
    if (this.batchA1cArray.length === this.batchingSize) {
      console.log(`batched a1c Stored In a1cQueue successuly`);
      await this.a1cvQueue.add('a1cBatchedRows', this.batchA1cArray, {
        attempts: 2,
        backoff: 500,
      });
      this.batchA1cArray = [];
    }
    if (this.batchBpArray.length === this.batchingSize) {
      console.log(`batched Bp Stored In bpQueue successuly`);
      await this.bpQueue.add('bpBatchedRows', this.batchBpArray, {
        attempts: 2,
        backoff: 500,
      });
      this.batchBpArray = [];
    }
  }

  @OnWorkerEvent('completed')
  async onCompleted(job) {
    await job.remove();
  }

  @OnWorkerEvent('drained')
  async drained() {
    let nbrRows = CsvProcessingService.countRows; // checl if still jobs not inserted to the databse
    if (this.batchA1cArray.length !== 0 && this.batchingCount === nbrRows) {
      console.log(`last batched a1c Stored In a1cQueue successuly`);
      await this.a1cvQueue.add('a1cBatchedRows', this.batchA1cArray, {
        attempts: 2,
        backoff: 500,
      });
      this.batchA1cArray = [];
    }
    if (this.batchBpArray.length !== 0 && this.batchingCount === nbrRows) {
      console.log(`last batched Bp Stored In bpQueue successuly`);
      await this.bpQueue.add('bpBatchedRows', this.batchBpArray, {
        attempts: 2,
        backoff: 500,
      });
      this.batchBpArray = [];
    }
    console.log('worker complete ');
  }

  extractRowFromJob(jobData: string) {
    const [
      patientId,
      a1cLevel,
      systolicBp,
      diastolicBp,
      diagnosisDateBp,
      diagnosisDateA1c,
    ] = jobData.split(';');
    if (
      [patientId, systolicBp, diastolicBp, diagnosisDateBp].every(
        (value) => value !== null && value !== undefined,
      )
    ) {
      this.batchBpArray.push({
        patient_id: parseInt(patientId),
        systolic: parseInt(systolicBp),
        diastolic: parseInt(diastolicBp),
        recorded_at: diagnosisDateBp,
      });
    }

    if (
      [patientId, a1cLevel, diagnosisDateA1c].every(
        (value) => value !== null && value !== undefined,
      )
    ) {
      this.batchA1cArray.push({
        patient_id: parseInt(patientId),
        value: parseInt(a1cLevel),
        recorded_at: diagnosisDateA1c,
      });
    }
  }



  // async insertBpRowToDb() {
  //   return await this.repoBp.createMany(this.batchBpArray)
  // }
}
