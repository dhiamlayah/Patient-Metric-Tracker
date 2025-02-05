import { FileInterceptor } from '@nestjs/platform-express';
import { CsvProcessingService } from './csv-processing.service';
import { BadRequestException, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';

@Controller('csv-processing')
export class CsvProcessingController {
      constructor(private readonly csvProcessingService: CsvProcessingService) {}
    
    @Post()
    @UseInterceptors(FileInterceptor('file',
        {   
            fileFilter: (_, file, callback) => {
                if (file.mimetype !== 'text/csv' && !file.originalname.endsWith('.csv')) {
                    return callback(new BadRequestException('Only CSV files are allowed!'), false);
                }
                callback(null, true);
            }
        }

    )) 
    processCsv(@UploadedFile() file: Express.Multer.File){
        return this.csvProcessingService.processCsv(file.path)
    }

    @Post("pause")
    pauseProcessCsv(){
        return this.csvProcessingService.pauseProcessCsv()
    }
    @Post("resume")
    resumeProcessCsv(){
        return this.csvProcessingService.resumeProcessCsv()
    }

    @Post("state")
    getProccessState (){
        return this.csvProcessingService.getQueuesState()
    }

}
