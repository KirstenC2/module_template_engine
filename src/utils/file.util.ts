import * as fs from 'fs';
import * as path from 'path';
import { Logger } from './logger.util';

export class FileUtil {
  static ensureDirectoryExists(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      Logger.info(`创建目录: ${dirPath}`);
    }
  }

  static readFile(filePath: string): string {
    try {
      return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
      throw new Error(`无法读取文件 ${filePath}: ${error.message}`);
    }
  }

  static writeFile(filePath: string, content: string): void {
    try {
      const dir = path.dirname(filePath);
      this.ensureDirectoryExists(dir);
      
      fs.writeFileSync(filePath, content, 'utf8');
      Logger.fileGenerated(filePath);
    } catch (error) {
      throw new Error(`无法写入文件 ${filePath}: ${error.message}`);
    }
  }

  static fileExists(filePath: string): boolean {
    return fs.existsSync(filePath);
  }

  static getFileSize(filePath: string): number {
    try {
      const stats = fs.statSync(filePath);
      return stats.size;
    } catch (error) {
      return 0;
    }
  }
}