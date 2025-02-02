import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job} from 'bullmq'; 
import { MetricA1cRepository } from 'src/metric-a1c/metric-a1c-repository';
import { MetricBloodPressureRepository } from 'src/metric_blood_pressure/metric_blood_pressure.repository';

@Processor('csvProcessingQueue')
export class CsvProcessingWorker extends WorkerHost {
  async process(job: Job<any, any, string>): Promise<any> {
      console.log('test')
  }

  @OnWorkerEvent('completed') 
  onCompleted() {
    console.log('test completed')
  }
}
















// export class CsvProcessingWorker {
//   private worker: Worker;

//   constructor(
//     private readonly redisService: RedisService , 
//     private mertricA1cRepo: MetricA1cRepository , 
//     private mertricBPRepo : MetricBloodPressureRepository
// ) {
//     this.worker = this.redisService.getWorker('csvProcessingQueue', 
//         async (job: Job) => {
//             // console.log(
//             //   `Processing job ${job.id} of type ${job.name} with data ${JSON.stringify(job.data)}...`
//             // );
//             await this.insertMetricA1c(job)
//             return { success: true, data: job.data };
//           }
//     );

//     this.worker.on('completed', async (job: Job, result: any) => {
//     //   console.log(`Job ${job.id} has been completed successfully with result:`, result);
//       await job.remove();
//     //   console.log(`Job ${job.id} removed after completion.`);
    
//     });

//     this.worker.on('failed', (job: Job, error: Error) => {
//       console.error(`Job ${job.id} failed with error:`, error.message);
//     });
//   }


//   private async insertMetricA1c (job : any ){
//     const jobData = job.data;
//     const rawData = jobData['Patient ID;A1C Level;Blood Pressure (systolic);Blood Pressure (diastolic);Diagnosis Date'];
//     // Split the string by semicolon to get the individual data
//     const [patientId, a1cLevel, systolicBp, diastolicBp, diagnosisDate] = rawData.split(';');
//     console.log('patientId',patientId)
//     console.log('a1cLevel',a1cLevel)
//     console.log('systolicBp',systolicBp)
//     console.log('diastolicBp',diastolicBp)
//     console.log('diagnosisDate',diagnosisDate)

// }
// }
