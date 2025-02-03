import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { MetricA1cRepository } from 'src/metric-a1c/metric-a1c-repository';
import { MetricBloodPressureRepository } from 'src/metric_blood_pressure/metric_blood_pressure.repository';
import { CsvProcessingService } from './csv-processing.service';

@Processor('csvProcessingQueue')
export class CsvProcessingWorker extends WorkerHost {
  private batchingCount = 0; // this help us to batching the data
  private batchA1cArray = Array();
  private batchBpArray = Array();
  private batchingSize = 50 ;

  constructor(
    private repoA1c: MetricA1cRepository,
    private repoBp: MetricBloodPressureRepository,
  ) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    // console.log(`Processing job ${job.id} of type ${job.name} with data ${this.batchingCount}`);
    this.extractRowFromJob(job.data);
    this.batchingCount++;
    if (this.batchA1cArray.length === this.batchingSize) {
      const {success , message}  = await this.insertA1cRowToDb()
      console.log(`batch A1C ${Math.ceil(this.batchingCount / this.batchingSize)} : success=${success} ; message=${message}`)
      this.batchA1cArray = []
    }
    if (this.batchBpArray.length === this.batchingSize) {
      const {success , message}  = await this.insertBpRowToDb()
      console.log(`batch Bp ${Math.ceil(this.batchingCount / this.batchingSize)} : success=${success} ; message=${message}`)
      this.batchBpArray = []
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
      const {success , message}  = await this.insertA1cRowToDb()
      console.log(`batch A1C ${Math.ceil(this.batchingCount / this.batchingSize)} : success=${success} ; message=${message}`)
      this.batchA1cArray=[]
    }
    if (this.batchBpArray.length !== 0 && this.batchingCount === nbrRows) {
      const {success , message}  = await this.insertBpRowToDb()
      console.log(`batch Bp ${Math.ceil(this.batchingCount / this.batchingSize)} : success=${success} ; message=${message}`)
      this.batchBpArray = []
    }
    console.log('worker complete ')
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

  async insertA1cRowToDb(){
    return await this.repoA1c.createMany(this.batchA1cArray)
  }

  async insertBpRowToDb() {
    return await this.repoBp.createMany(this.batchBpArray)
  }
}
