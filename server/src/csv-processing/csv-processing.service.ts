import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Queue } from 'bullmq';
import * as csvParser from 'csv-parser';
import * as fs from 'fs';

@Injectable()
export class CsvProcessingService {
  static countRows = 0;
  static csvColumnNames: string;
  constructor(
    @InjectQueue('csvProcessingQueue') private readonly csvQueue: Queue,
    @InjectQueue('a1cInsertingQueue') private readonly a1cvQueue: Queue,
    @InjectQueue('bpInsertingQueue') private readonly bpQueue: Queue,

  ) {}

  async processCsv(filePath: string) {
    const stream = fs.createReadStream(filePath);      
    stream
      .pipe(csvParser())
      .once('data', async (row) => {
        CsvProcessingService.csvColumnNames = Object.keys(row)[0];
        CsvProcessingService.countRows = 1;
      })
      .on('data', async (row) => {
        if (Object.values(row)[0] !== ';;;;;') {          //check row not empty
          CsvProcessingService.countRows++;               
          await this.csvQueue.add(
            'processRow',
            {
              row: Object.values(row)[0],   
              rowIndex: CsvProcessingService.countRows,
            },                 // we add rowIndex to help us to identify the row and logging it easly
            { attempts: 2, removeOnComplete: true },
          );
        }
      })
      .on('end', () => {
        fs.unlinkSync(filePath);
        console.log('processing the CSV file Completed ');
      })
      .on('error', (error) => {
        console.error('Error processing the CSV file:', error.message);
        throw new InternalServerErrorException('Error processing the CSV file');
      });
    
    return 'File uploaded and processing started.';
  }

  async pauseProcessCsv (){
    await this.csvQueue.pause()
    await this.a1cvQueue.pause()
    await this.bpQueue.pause()
    return 'Process Paused '
  }

  async resumeProcessCsv (){
    await this.csvQueue.resume()
    await this.a1cvQueue.resume()
    await this.bpQueue.resume()
    return 'Process Resumed '
  }

  async getQueuesState(){
    return [
      {
        queue_name : "csv processing  queue",
        job_waited :await  this.csvQueue.getWaitingCount() ,
        job_active : await this.csvQueue.getActiveCount() ,
        job_failed : await  this.csvQueue.getFailedCount() 
      },
      {
        queue_name : "a1c queue",
        job_waited :await  this.a1cvQueue.getWaitingCount() ,
        job_active : await this.a1cvQueue.getActiveCount() ,
        job_failed : await  this.a1cvQueue.getFailedCount() 
      },
      {
        queue_name : "a1c queue",
        job_waited :await  this.bpQueue.getWaitingCount() ,
        job_active : await this.bpQueue.getActiveCount() ,
        job_failed : await  this.bpQueue.getFailedCount() 
      }
    ]
  }
}