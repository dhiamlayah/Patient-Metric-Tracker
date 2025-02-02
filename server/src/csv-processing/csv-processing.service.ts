import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Queue } from 'bullmq';
import * as csvParser from 'csv-parser';
import * as fs from 'fs';

@Injectable()
export class CsvProcessingService {

  constructor(
    @InjectQueue('csvProcessingQueue') private readonly csvQueue: Queue,
  ) {}

  async processCsv(filePath: string) {
    const stream = fs.createReadStream(filePath);
    stream
      .pipe(csvParser())
      .on('data', async (row) => {
        const job = await this.csvQueue.add('processRow', row);
        console.log(`Job added with ID: ${job.id}`);
      })
      .on('end', () => {
        fs.unlinkSync(filePath);
        console.log('completed');
      })
      .on('error', (error) => {
        console.error('Error processing the CSV file:', error);
        throw new InternalServerErrorException('Error processing the CSV file');
      });
    return 'File uploaded and processing started.';
  }
}
