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
  private batchingCount = 1; // this help us to batching the data 
  private batchA1c = { rows: Array(), startFrom: 0, endAt: 0 };
  private batchBp = { rows: Array(), startFrom: 0, endAt: 0 };
  private batchingSize = 10;
  
  constructor( 
    @InjectQueue('a1cInsertingQueue') private readonly a1cvQueue: Queue,
    @InjectQueue('bpInsertingQueue') private readonly bpQueue:  Queue,
  ) {    
    super(); 
  }     

  async process(job: Job<any, any, string>): Promise<any> {
    this.extractRowFromJob(job.data); 
    this.batchingCount++;
    // console.log('worker ',job.data.rowIndex) 
    if (this.batchA1c.rows.length === this.batchingSize) { 
      await this.a1cvQueue.add('a1cBatchedRows', this.batchA1c );
      this.batchA1c = { rows: [], endAt: 0, startFrom: 0 };   // initialize batcher
    } 
    if (this.batchBp.rows.length === this.batchingSize) {
      await this.bpQueue.add('bpBatchedRows', this.batchBp, { attempts: 2 , backoff: 500,removeOnComplete: true  });
      this.batchBp = { rows: [], endAt: 0, startFrom: 0 };    // initialize batcher
    }
  } 
    
  @OnWorkerEvent('completed')
  async onCompleted(job) {
    await job.remove();  
  }  
 
  @OnWorkerEvent('drained')   
  async drained() {
    let nbrRows = CsvProcessingService.countRows; // checl if still jobs not inserted to the databse
    if (this.batchA1c.rows.length !== 0 && this.batchingCount === nbrRows) {
       await this.a1cvQueue.add('a1cBatchedRows', this.batchA1c, {attempts: 2 ,backoff: 500   });
        this.batchA1c = { rows: [], endAt: 0, startFrom: 0 }
    }
    if (this.batchBp.rows.length !== 0 && this.batchingCount === nbrRows) {
      await this.bpQueue.add('bpBatchedRows', this.batchBp, {attempts: 2, backoff: 500 ,removeOnComplete: true  });
    this.batchBp = { rows: [], endAt: 0, startFrom: 0 };
    }  
    this.batchingCount=1

  }

  extractRowFromJob(jobData) {
    const [
      patientId,
      a1cLevel,
      systolicBp,
      diastolicBp,
      diagnosisDateBp,
      diagnosisDateA1c,
    ] = jobData.row.split(';');
    this.insertIntoBatchBp([patientId, systolicBp, diastolicBp, diagnosisDateBp], jobData.rowIndex);
    this.insertIntoBatchA1c([patientId,a1cLevel, diagnosisDateA1c],jobData.rowIndex);
  }
 
  insertIntoBatchBp(row, rowIndex) {
    if (row.every((value) => value !== null && value !== undefined)) {
      if (this.batchBp.rows.length === 0) {
        this.batchBp.startFrom = rowIndex;
      }
      this.batchBp.rows.push({
        patient_id: parseInt(row[0]),
        systolic: parseInt(row[1]),
        diastolic: parseInt(row[2]),
        recorded_at: row[3],
      });
      this.batchBp.endAt = rowIndex;
    } else {
      console.log(`⚠️ row nbr ${rowIndex} have invalid input for bp`);
    }
  }

  insertIntoBatchA1c(row, rowIndex) {
    if (row.every((value) => value !== null && value !== undefined)) {
      if (this.batchA1c.rows.length === 0) {
        this.batchA1c.startFrom = rowIndex;
      }
      this.batchA1c.rows.push({
        patient_id: parseInt(row[0]),
        value: parseInt(row[1]),
        recorded_at: row[2],
      }); 
      this.batchA1c.endAt = rowIndex; 
    } else {
      console.log(`⚠️ row nbr ${rowIndex} invalid for a1c`);
    }
  }
}
