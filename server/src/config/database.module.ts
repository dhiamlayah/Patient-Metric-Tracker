import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Patient } from 'src/patient/entities/patient.entity';
import { MetricA1c } from 'src/metric-a1c/entities/metric-a1c.entity';
import { MetricBloodPressure } from 'src/metric_blood_pressure/entities/metric_blood_pressure.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
        imports:[ConfigModule],
        inject:[ConfigService],
        useFactory:(configService:ConfigService)=>(
            {
                type: 'postgres', 
                host: configService.get<string>('env.pgHost'),
                port: configService.get<number>('env.pgPort'),
                username: configService.get<string>('env.pgUser'),
                password: configService.get<string>('env.pgPassword'),
                database: configService.get<string>('env.pgDatabase'),
                entities: [Patient, MetricA1c, MetricBloodPressure],
                synchronize: true,
                logging: false,
                extra: {
                  max: 100 ,
                  min:2,  
                  idleTimeoutMillis: 3000,
                }, 
              }       
        ) 
    }),
  ],
})
export class DatabaseModule {}
