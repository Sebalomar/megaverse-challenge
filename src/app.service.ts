import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { promisify } from 'util';

@Injectable()
export class AppService {
  private readonly baseUrl = 'https://challenge.crossmint.io/api/';

  constructor() {}

  async createPolyanet(row: number, column: number, candidateId: string) {
    const url = `${this.baseUrl}polyanets`;
    const data = { row, column, candidateId };

    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async createSoloon(
    row: number,
    column: number,
    color: string,
    candidateId: string,
  ) {
    const url = `${this.baseUrl}soloons`;
    const data = {
      row,
      column,
      color,
      candidateId,
    };

    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteSoloon(row: number, column: number, candidateId: string) {
    const url = `${this.baseUrl}soloons`;
    const params = {
      row,
      column,
      candidateId,
    };

    try {
      const response = await axios.delete(url, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async createCometh(
    row: number,
    column: number,
    direction: string,
    candidateId: string,
  ) {
    const url = `${this.baseUrl}comeths`;
    const data = {
      row,
      column,
      direction,
      candidateId,
    };

    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteCometh(row: number, column: number, candidateId: string) {
    const url = `${this.baseUrl}comeths`;
    const params = {
      row,
      column,
      candidateId,
    };

    try {
      const response = await axios.delete(url, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deletePolyanet(row: number, column: number, candidateId: string) {
    const url = `${this.baseUrl}polyanets?row=${row}&column=${column}&candidateId=${candidateId}`;

    try {
      const response = await axios.delete(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getGoalMap(candidateId: string) {
    const url = `${this.baseUrl}map/${candidateId}/goal`;

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  //Phase 1, without the goal map.
  async createXShapedPolyanets(candidateId: string) {
    try {
      for (let row = 2; row < 9; row++) {
        await this.createPolyanet(row, row, candidateId);
        await this.createPolyanet(row, 10 - row, candidateId);
      }
      return { message: 'X-shaped 🪐POLYanets created successfully' };
    } catch (error) {
      throw error;
    }
  }

  // Phase 2, using the goal map.
  async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async createLogoMap(candidateId: string) {
    const response = await this.getGoalMap(candidateId);
    const goalMap = response.goal;

    try {
      for (let row = 0; row < goalMap.length; row++) {
        for (let col = 0; col < goalMap[row].length; col++) {
          const entity = goalMap[row][col];
          switch (entity) {
            case 'SPACE':
              // Do nothing for empty space
              break;
            case 'POLYANET':
              await this.createPolyanet(row, col, candidateId);
              await this.delay(1000);
              break;
            case 'WHITE_SOLOON':
              await this.createSoloon(row, col, 'white', candidateId);
              await this.delay(1000);
              break;
            case 'BLUE_SOLOON':
              await this.createSoloon(row, col, 'blue', candidateId);
              await this.delay(1000);
              break;
            case 'PURPLE_SOLOON':
              await this.createSoloon(row, col, 'purple', candidateId);
              await this.delay(1000);
              break;
            case 'RED_SOLOON':
              await this.createSoloon(row, col, 'red', candidateId);
              await this.delay(1000);
              break;
            case 'LEFT_COMETH':
              await this.createCometh(row, col, 'left', candidateId);
              await this.delay(1000);
              break;
            case 'RIGHT_COMETH':
              await this.createCometh(row, col, 'right', candidateId);
              await this.delay(1000);
              break;
            case 'UP_COMETH':
              await this.createCometh(row, col, 'up', candidateId);
              await this.delay(1000);
              break;
            case 'DOWN_COMETH':
              await this.createCometh(row, col, 'down', candidateId);
              await this.delay(1000);
              break;
            default:
              // Handle any other entity type if needed
              break;
          }
        }
      }

      return {
        message:
          'Megaverse map in the shape of the Crossmint logo created successfully',
      };
    } catch (error) {
      throw error;
    }
  }
}
