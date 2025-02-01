import { Injectable } from '@nestjs/common';
import { Queue, Worker } from 'bullmq';
import Redis from 'ioredis';
@Injectable()
export class RedisService {
  private readonly redisClient: Redis;

  constructor() {
    this.redisClient = new Redis({
      host: 'localhost',
      port: 6379,
      maxRetriesPerRequest: null, // Setting this to null resolves the error
    });
  }

  getQueue(name: string) {
    return new Queue(name, {
      connection: this.redisClient,
    });
  }

  getWorker(name: string, processor) {
    return new Worker(name, processor, {
      concurrency: 50,
      connection: this.redisClient });
  }
}
