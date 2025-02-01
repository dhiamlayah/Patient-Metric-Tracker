import { Module } from '@nestjs/common';
import { MetricA1cService } from './metric-a1c.service';
import { MetricA1cController } from './metric-a1c.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetricA1c } from './entities/metric-a1c.entity';
import { MetricA1cRepository } from './metric-a1c-repository';

@Module({
  imports:[TypeOrmModule.forFeature([MetricA1c])],
  controllers: [MetricA1cController],
  providers: [MetricA1cService,MetricA1cRepository],
  exports:[MetricA1cRepository]
})
export class MetricA1cModule {}
