import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Queue } from 'bullmq';
import * as csvParser from 'csv-parser';
import * as fs from 'fs';

@Injectable()
export class CsvProcessingService {
  static countRows = 0;

  constructor(
    @InjectQueue('csvProcessingQueue') private readonly csvQueue: Queue,
  ) {}

  async processCsv(filePath: string) {
    const stream = fs.createReadStream(filePath);
    stream
      .pipe(csvParser())
      .once('data', async (row) => {
        const job = await this.csvQueue.add('processRow', Object.keys(row)[0]);
        CsvProcessingService.countRows++;
      })
      .on('data', async (row) => {
        if (Object.values(row)[0] !== ';;;;') {
          const job = await this.csvQueue.add(
            'processRow',
            Object.values(row)[0],
          );
          CsvProcessingService.countRows++;
        }
      })
      .on('end', () => {
        fs.unlinkSync(filePath);
        console.log('processing the CSV file Completed ');
      })
      .on('error', (error) => {
        console.error('Error processing the CSV file:', error);
        throw new InternalServerErrorException('Error processing the CSV file');
      });
    return 'File uploaded and processing started.';
  }
}
