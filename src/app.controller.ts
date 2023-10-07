import { Controller, Post, Delete, Param, Body, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('map/:candidateId/goal')
  async getGoalMap(@Param('candidateId') candidateId: string) {
    return await this.appService.getGoalMap(candidateId);
  }

  @Post(':candidateId/create-x')
  async createXShapedPolyanets(@Param('candidateId') candidateId: string) {
    return await this.appService.createXShapedPolyanets(candidateId);
  }

  @Post(':candidateId/create-logo-map')
  async createLogoMap(@Param('candidateId') candidateId: string) {
    return await this.appService.createLogoMap(candidateId);
  }
}
