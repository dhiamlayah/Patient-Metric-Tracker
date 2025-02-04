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
        if (Object.values(row)[0] !== ';;;;') {
          CsvProcessingService.countRows++;
          await this.csvQueue.add(
            'processRow',
            {
              row: Object.values(row)[0],   
              rowIndex: CsvProcessingService.countRows,
            }, // we add rowIndew to help us to identify the row and logging it easly
            { attempts: 2, removeOnComplete: true },
          );
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
